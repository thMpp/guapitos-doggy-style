import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Usa tu logo real: logo3.png o logo.png según tu proyecto
import logo_icon from "@/assets/logo3.png";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Galería", href: "#galeria" },
  { name: "Conciencia Animal", href: "#conciencia" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const goLogin = () => {
    navigate("/login");
    setOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Marca */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo_icon}
            alt="Guapitos"
            className="h-10 w-10 rounded-full object-contain sm:h-12 sm:w-12"
          />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#ec82ae] via-[#b48fd3] to-[#7ce0f1] bg-clip-text text-transparent">
            GUAPITOS
          </span>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}

          {/* CTA Reservar con tu gradiente */}
          <Button
            onClick={() => scrollToSection("#reservar")}
            className="ml-2 bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 text-primary-foreground"
          >
            Reservar cita
          </Button>

          {/* Iniciar sesión (conservado) */}
          <button
            onClick={goLogin}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Iniciar Sesión
          </button>
        </nav>

        {/* Menú móvil con Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          {/* Panel derecho móvil */}
          <SheetContent
            side="right"
            className="w-[280px] bg-white p-0"
            aria-label="Menú"
          >
            <div className="border-b px-4 py-3 flex items-center gap-2">
              <img
                src={logo_icon}
                alt="Guapitos"
                className="h-8 w-8 rounded-full object-contain"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-[#ec82ae] via-[#b48fd3] to-[#7ce0f1] bg-clip-text text-transparent">
                GUAPITOS
              </span>
            </div>

            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}

              <Button
                onClick={() => scrollToSection("#reservar")}
                className="mt-2 w-full bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 text-primary-foreground"
              >
                Reservar cita
              </Button>

              <Button
                onClick={goLogin}
                variant="outline"
                className="w-full"
              >
                Iniciar Sesión
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
