import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Landing or index specific content could be here */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Welcome to PrismaCheck</h1>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;