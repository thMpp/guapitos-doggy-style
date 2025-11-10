import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo_icon from "@/assets/logo3.png";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const ir_login = () => {
    navigate("/login");
    setOpen(false);
  };

  // Evita scroll de fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo + marca */}
        <div className="flex items-center gap-2">
          <img
            src={logo_icon}
            alt="Logo Guapitos"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ec82ae] via-[#b48fd3] to-[#7ce0f1] bg-clip-text text-transparent">
            GUAPITOS
          </span>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-foreground hover:text-primary transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("galeria")}
            className="text-foreground hover:text-primary transition-colors"
          >
            Galería
          </button>
          <button
            onClick={() => scrollToSection("conciencia")}
            className="text-foreground hover:text-primary transition-colors"
          >
            Conciencia Animal
          </button>

          <Button
            onClick={() => scrollToSection("agendar")}
            className="bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity"
          >
            Reservar cita
          </Button>

          <button
            onClick={ir_login}
            className="text-foreground hover:text-primary transition-colors"
          >
            Iniciar Sesión
          </button>
        </nav>

        {/* Botón hamburger (móvil) */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* ícono simple */}
          <span className="block h-0.5 w-6 bg-foreground mb-1.5"></span>
          <span className="block h-0.5 w-6 bg-foreground mb-1.5"></span>
          <span className="block h-0.5 w-6 bg-foreground"></span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-border ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-foreground py-2 text-base text-left hover:text-primary"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("galeria")}
            className="text-foreground py-2 text-base text-left hover:text-primary"
          >
            Galería
          </button>
          <button
            onClick={() => scrollToSection("conciencia")}
            className="text-foreground py-2 text-base text-left hover:text-primary"
          >
            Conciencia Animal
          </button>

          <Button
            onClick={() => scrollToSection("agendar")}
            className="mt-2 bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-opacity"
          >
            Reservar cita
          </Button>

          <button
            onClick={ir_login}
            className="text-foreground py-2 text-base text-left hover:text-primary"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
