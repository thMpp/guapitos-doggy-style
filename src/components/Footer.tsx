const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
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
              <p>📍 Dirección por definir</p>
              <p>📞 +56 9 XXXX XXXX</p>
              <p>✉️ info@guapitos.cl</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Horarios</h4>
            <div className="space-y-2 text-background/80">
              <p>Lunes - Viernes: 9:00 - 18:00</p>
              <p>Sábados: 9:00 - 15:00</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2024 Guapitos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;