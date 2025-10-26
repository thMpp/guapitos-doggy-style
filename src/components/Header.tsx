import logo_icon from "@/assets/logo3.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const ir_login = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-20 h-20 flex items-center justify-center">
            <img src={logo_icon} alt="Logo Guapitos" className="w-18 h-12" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ec82ae] to-[#7ce0f1] bg-clip-text text-transparent">
            GUAPITOS
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

          <Button
            onClick={() => scrollToSection('agendar')}
            className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity"
          >
            Reservar cita
          </Button> {/*Boton bonito*/}

          {/* al lado derecho de reservar pq reservar debe llamar más la atención que el login */}
          <button
            onClick={ir_login}
            className="text-foreground hover:text-primary transition-colors"
          >
            Log In
          </button>

        </nav>

      </div>
    </header>
  );
};

export default Header;