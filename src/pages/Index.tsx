import Header from "@/components/Header";
import Hero from "@/components/Inicio";
import Gallery from "@/components/Galeria";
import AnimalConsciousness from "@/components/Conciencia_Animal";
import BookingForm from "@/components/Formulario";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <AnimalConsciousness />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
