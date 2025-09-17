import os
import torch
import cv2
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from torchvision import transforms
import timm
import io
import librosa
import tensorflow as tf


# ====== CONFIG ======
MODEL_PATH = "model/efficientnet_deepfake_best.pth"
AUDIO_MODEL_PATH = "model/best_model_1.keras"
N_MFCC = 40
MAX_LEN = 200
SAMPLE_RATE = 16000
IMG_SIZE = 224
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ====== MODEL ======
model = timm.create_model("efficientnet_b0", pretrained=False, num_classes=2)
in_f = model.classifier.in_features
model.classifier = torch.nn.Sequential(torch.nn.Dropout(0.4), torch.nn.Linear(in_f, 2))
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device).eval()

# Audio model (TensorFlow)
try:
    audio_model = tf.keras.models.load_model(AUDIO_MODEL_PATH)
except Exception as e:
    audio_model = None

class_names = ["fake", "real"]

# ====== TRANSFORMS ======
val_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225]),
])

def predict_image(file_bytes):
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    x = val_transform(img).unsqueeze(0).to(device)
    with torch.no_grad():
        logits = model(x)
        p = torch.softmax(logits, dim=1)[0].cpu().numpy()
    cls_idx = int(np.argmax(p))
    return class_names[cls_idx], float(p[cls_idx])


def extract_mfcc_from_audio_path(file_path):
    try:
        y, sr = librosa.load(file_path, sr=SAMPLE_RATE)
    except Exception:
        return None

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=N_MFCC, n_fft=512, hop_length=256).T
    if mfcc.shape[0] < MAX_LEN:
        pad_width = MAX_LEN - mfcc.shape[0]
        mfcc = np.pad(mfcc, ((0, pad_width), (0, 0)), mode="constant")
    else:
        mfcc = mfcc[:MAX_LEN, :]
    return mfcc


def predict_audio(file_storage):
    if audio_model is None:
        return "error", 0.0

    temp_path = "temp_audio.wav"
    file_storage.save(temp_path)
    try:
        feat = extract_mfcc_from_audio_path(temp_path)
        if feat is None:
            return "error", 0.0
        feat = np.expand_dims(feat, axis=(0, -1))  # (1, MAX_LEN, N_MFCC, 1)
        preds = audio_model.predict(feat, verbose=0)
        cls_idx = int(np.argmax(preds[0]))
        conf = float(np.max(preds[0]))
        label = "real" if cls_idx == 0 else "fake"
        return label, conf
    finally:
        try:
            os.remove(temp_path)
        except OSError:
            pass

def center_square_crop_resize(pil_img, size):
    w, h = pil_img.size
    s = min(w, h)
    left = (w - s) // 2
    top  = (h - s) // 2
    pil_img = pil_img.crop((left, top, left+s, top+s))
    pil_img = pil_img.resize((size, size))
    return pil_img

def predict_video(video_path, frames_to_sample=30):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return "error", 0.0
    
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        cap.release()
        return "error", 0.0
    
    idxs = np.linspace(0, max(0, total-1), frames_to_sample, dtype=int)
    probs = []

    with torch.no_grad():
        for idx in idxs:
            cap.set(cv2.CAP_PROP_POS_FRAMES, int(idx))
            ok, frame = cap.read()
            if not ok:
                continue
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            img = center_square_crop_resize(img, IMG_SIZE)
            x = val_transform(img).unsqueeze(0).to(device)
            logits = model(x)
            p_real = torch.softmax(logits, dim=1)[0, class_names.index("real")].item()
            probs.append(p_real)

    cap.release()

    if len(probs) == 0:
        return "error", 0.0
    
    avg_real = float(np.mean(probs))
    label = "real" if avg_real >= 0.5 else "fake"
    conf  = avg_real if label == "real" else (1.0 - avg_real)
    return label, conf


# ====== FLASK APP ======
app = Flask(__name__)
CORS(app)

@app.route("/predict/image", methods=["POST"])
def predict_image_api():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files["file"]
    label, conf = predict_image(file.read())
    return jsonify({"label": label, "confidence": conf})

@app.route("/predict/video", methods=["POST"])
def predict_video_api():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    video_path = "temp_video.mp4"
    file.save(video_path)

    label, conf = predict_video(video_path, frames_to_sample=30)
    os.remove(video_path)

    if label == "error":
        return jsonify({"error": "Could not process video"}), 500

    return jsonify({"label": label, "confidence": conf})


@app.route("/predict/audio", methods=["POST"])
def predict_audio_api():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files["file"]
    label, conf = predict_audio(file)
    if label == "error":
        return jsonify({"error": "Could not process audio"}), 500
    return jsonify({"label": label, "confidence": conf})


@app.route("/")
def home():
    return "✅ Deepfake Detection API Running!"

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5002"))
    app.run(host="0.0.0.0", port=port)
