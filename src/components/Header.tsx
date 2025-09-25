import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">G</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Guapitos
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('inicio')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollToSection('galeria')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Galería
          </button>
          <button 
            onClick={() => scrollToSection('conciencia')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Conciencia Animal
          </button>
          <button 
            onClick={() => scrollToSection('agendar')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Agendar
          </button>
          <Button 
            onClick={() => scrollToSection('agendar')}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Reservar Cita
          </Button>
        </nav>

        <Button 
          className="md:hidden bg-gradient-primary hover:opacity-90"
          size="sm"
          onClick={() => scrollToSection('agendar')}
        >
          Reservar
        </Button>
      </div>
    </header>
  );
};

export default Header;