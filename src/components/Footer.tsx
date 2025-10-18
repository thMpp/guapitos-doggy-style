import ig_icon from "@/assets/ig.webp";
import wsp_icon from "@/assets/wsp.webp";
import logo_icon from "@/assets/logo3.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src={logo_icon} alt="Logo Guapitos" className="w-18 h-12" />
              </div>
              <h3 className="text-2xl font-bold">Guapitos</h3>
            </div>
            <p className="text-background/80">
              Tu peluquería canina de confianza. Cuidamos a tu mascota con amor y profesionalismo.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Contacto</h4>
            <div className="space-y-2 text-background/80">
              <p>📍 Capitán Avalos 0331</p>
              <p style={{ display: "flex", alignItems: "center" }}><img src={wsp_icon} alt="Instagram" style={{ width: "20px", height: "20px", marginRight: "8px" }} />@+56 9 6614 5008</p>
              <p style={{ display: "flex", alignItems: "center" }}><img src={ig_icon} alt="Instagram" style={{ width: "20px", height: "20px", marginRight: "8px" }} />@Gua_pitos</p>

            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Horarios</h4>
            <div className="space-y-2 text-background/80">
              <p>Lunes - Sábados: 9:00 - 16:00</p>
              <p>Domingos y festivos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2025 Guapitos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;