import { useState } from "react";
import grooming1 from "@/assets/dog-grooming-1.jpg";
import grooming2 from "@/assets/dog-grooming-2.jpg";
import grooming3 from "@/assets/dog-grooming-3.jpg";
import grooming4 from "@/assets/perrito 1.png";
import grooming5 from "@/assets/perrito 2.png";
import grooming6 from "@/assets/perrito 3.png";
import grooming7 from "@/assets/perrito 4.png";
import grooming8 from "@/assets/perrito 5.png";
import grooming9 from "@/assets/perrito 6.jpg";
import { Card } from "@/components/ui/card";

const Gallery = () => {
  const works = [
    {
      id: 1,
      image: grooming1,
      title: "Corte profesional de raza",
      description: "Peluquería con amor, sin anestesia",
    },
    {
      id: 2,
      image: grooming2,
      title: "Nuestros servicios",
      description: "Corte, limpieza de oidos, baño sanitario, corte de uñas",
    },
    {
      id: 3,
      image: grooming3,
      title: "Looks con estilo",
      description: "Corte moderno y elegante, listo para destacar.",
    },
    {
  id: 4,
  image: grooming4,
  title: "Corte clásico con detalle navideño",
  description: "Un look prolijo y elegante, perfecto para lucirse en cualquier ocasión.",
},
{
  id: 5,
  image: grooming5,
  title: "Corte liso con moño decorativo",
  description: "Estilo suave y esponjoso, acompañado de un accesorio adorable.",
},
{
  id: 6,
  image: grooming6,
  title: "Corte corto con moño verde",
  description: "Conserva comodidad y frescura sin perder un estilo encantador.",
},
{
  id: 7,
  image: grooming7,
  title: "Estilo fantasía rosa",
  description: "Coloración segura y vibrante para un look alegre y llamativo.",
},
{
  id: 8,
  image: grooming8,
  title: "Corte punk con toque azul",
  description: "Un estilo fresco y moderno, ideal para mantenerse activo y cómodo.",
},
{
  id: 9,
  image: grooming9,
  title: "Diseño fantasía rosado elegante",
  description: "Orejitas coloreadas y moño a juego para un look único y lleno de personalidad.",
},
  ];

  const [index, setIndex] = useState(0);

  const VISIBLE_DESKTOP = 4 // cuántas cards se ven a la vez
  const maxIndex = Math.max(0, works.length - VISIBLE_DESKTOP);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };
  const scrollContainer = (dir: "left" | "right") => {
  const container = document.getElementById("carousel-desktop");
  if (!container) return;

  const cardWidth = 300 + 24; // 300px card + 24px gap (6 * 4)
  const scrollAmount = cardWidth;

  if (dir === "left") container.scrollLeft -= scrollAmount;
  else container.scrollLeft += scrollAmount;
  };


  return (
    <section id="galeria" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">

        {/* Título */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] bg-clip-text text-transparent">
              Trabajos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada mascota es única y merece un cuidado especial. Mira algunos de nuestros trabajos más recientes.
          </p>
        </div>

        {/* Carrusel móvil: scroll horizontal */}
        <div className="lg:hidden overflow-x-auto flex gap-6 pb-4 scroll-snap-x snap-mandatory">
          {works.map((work) => (
            <Card
              key={work.id}
              className="min-w-[80%] mx-auto snap-start overflow-hidden border-0 shadow-card bg-card"
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-[#ec82ae] to-[#10e5f8] bg-clip-text text-transparent">
                  {work.title}
                </h3>
                <p className="text-muted-foreground">{work.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Carrusel desktop con flechas */}
        <div className="hidden lg:block relative">
        <button
          onClick={() => scrollContainer("left")}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full hover:bg-gray-100 z-10"
        >
          ❮
        </button>

        <div
          id="carousel-desktop"
          className="overflow-hidden scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-6">
            {works.map((work) => (
              <Card
                key={work.id}
                className="flex-none w-[300px] overflow-hidden border-0 shadow-card bg-card"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-[#ec82ae] to-[#10e5f8] bg-clip-text text-transparent">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground">{work.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollContainer("right")}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full hover:bg-gray-100 z-10"
        >
          ❯
        </button>
      </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Listo para dejar a tu mascota Guapita?
          </p>
          <div className="flex justify-center">
            <button
              onClick={() =>
                document.getElementById("agendar")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
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
