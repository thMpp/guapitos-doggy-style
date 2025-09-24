import { Card } from "@/components/ui/card";
import grooming1 from "@/assets/dog-grooming-1.jpg";
import grooming2 from "@/assets/dog-grooming-2.jpg";
import grooming3 from "@/assets/dog-grooming-3.jpg";

const Gallery = () => {
  const works = [
    {
      id: 1,
      image: grooming1,
      title: "Corte Profesional",
      description: "Poodle con corte premium y lazo decorativo",
      category: "Corte y Peinado"
    },
    {
      id: 2,
      image: grooming2,
      title: "Baño y Arreglo",
      description: "Golden Retriever después del tratamiento completo",
      category: "Baño Premium"
    },
    {
      id: 3,
      image: grooming3,
      title: "Estilo Yorkshire",
      description: "Yorkshire Terrier con peinado especializado",
      category: "Corte Especializado"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Nuestros <span className="bg-gradient-primary bg-clip-text text-transparent">Trabajos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada mascota es única y merece un cuidado especial. Mira algunos de nuestros trabajos más recientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <Card key={work.id} className="group overflow-hidden border-0 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2 bg-card">
              <div className="relative overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 space-y-3">
                <div className="inline-block px-3 py-1 bg-gradient-primary rounded-full text-sm text-primary-foreground">
                  {work.category}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{work.title}</h3>
                <p className="text-muted-foreground">{work.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">¿Te gusta lo que ves?</p>
          <div className="flex justify-center">
            <button 
              onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Agenda tu cita ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;