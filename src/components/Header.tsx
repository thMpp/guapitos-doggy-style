import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ paddingTop: "env(safe-area-inset-top)" }} // respeta notch en iOS/Android
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Logo + marca */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"                // ajusta si usas otro path
            alt="Guapitos"
            className="h-10 w-10 rounded-full object-contain sm:h-12 sm:w-12"
            loading="eager"
          />
          <span className="text-xl font-extrabold tracking-tight sm:text-2xl bg-gradient-to-r from-[#ec82ae] via-[#b9a8d9] to-[#92e6f6] bg-clip-text text-transparent">
            GUAPITOS
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-6 sm:flex">
          <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">Inicio</Link>
          <Link to="/galeria" className="text-sm text-slate-600 hover:text-slate-900">Galería</Link>
          <Link to="/conciencia" className="text-sm text-slate-600 hover:text-slate-900">Conciencia Animal</Link>
          <Link
            to="/Formulario"
            className="rounded-xl bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Reservar cita
          </Link>
        </nav>

        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow active:scale-95 sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Menú móvil off-canvas */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] translate-x-0 bg-white shadow-xl transition-transform">
            <div className="flex items-center justify-between px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
              <span className="py-4 text-lg font-bold">Menú</span>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <Link onClick={() => setOpen(false)} to="/" className="rounded-lg px-3 py-3 text-slate-700 hover:bg-slate-50">Inicio</Link>
              <Link onClick={() => setOpen(false)} to="/galeria" className="rounded-lg px-3 py-3 text-slate-700 hover:bg-slate-50">Galería</Link>
              <Link onClick={() => setOpen(false)} to="/conciencia" className="rounded-lg px-3 py-3 text-slate-700 hover:bg-slate-50">Conciencia Animal</Link>
              <Link
                onClick={() => setOpen(false)}
                to="/Formulario"
                className="mt-2 rounded-xl bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] px-3 py-3 text-center font-semibold text-white shadow-sm hover:opacity-90"
              >
                Reservar cita
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
