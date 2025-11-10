import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo3.png";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="bg-gradient-hero md:min-h-screen flex items-center py-10 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* grid: 1 col en móvil, 2 cols en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Tamaños fluidos */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Tu mascota se ve
                <span className="bg-gradient-to-r from-[#ec82ae] via-[#b48fd3] to-[#7ce0f1] bg-clip-text text-transparent">
                  {" "}
                  guapita
                </span>{" "}
                con nosotros
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-prose">
                Peluquería canina profesional donde tu mejor amigo recibe el
                cuidado y amor que merece. Especialistas en todas las razas.
              </p>
            </div>

            {/* Botones: columna en móvil, fila en ≥sm */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-5"
                onClick={() => scrollToSection("agendar")}
              >
                Agendar Cita
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 py-5"
                onClick={() => scrollToSection("galeria")}
              >
                Ver Trabajos
              </Button>
            </div>

            {/* Bullets: permiten wrap en pantallas pequeñas */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Profesionales certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span>Productos premium</span>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="order-first lg:order-none relative">
            <div className="relative z-10">
              <img
                src={Logo}
                alt="Peluquería canina profesional"
                className="w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto aspect-[16/10] object-cover rounded-2xl shadow-xl"
              />
            </div>
            {/* halo de color detrás */}
            <div className="pointer-events-none absolute inset-0 translate-x-2 -translate-y-2 lg:translate-x-4 lg:-translate-y-4 bg-gradient-primary rounded-2xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
