import { Button } from "@/components/ui/button";
import Logo from "@/assets/pruebalogo.png";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="min-h-screen bg-gradient-hero flex items-start lg:items-center pt-10 lg:pt-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Tu mascota se ve 
                <span className="bg-gradient-to-r from-[#ec82ae] to-[#7ce0f1] bg-clip-text text-transparent"> guapita</span> con nosotros
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Peluquería canina profesional donde tu mejor amigo recibe el cuidado y amor que merece. 
                Especialistas en todas las razas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity text-lg px-8 py-6"
                onClick={() => scrollToSection('agendar')}
              >
                Agendar Cita
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={() => scrollToSection('galeria')}
              >
                Ver Trabajos
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Profesionales certificados</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Productos premium</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src={Logo} 
                alt="Peluquería canina profesional" 
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;