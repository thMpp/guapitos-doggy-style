import { useState } from "react";
import logo_icon from "@/assets/logo3.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const ir_inicio = () => {
    navigate("/");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "dueña" && password === "guapitos123") {
      navigate("/PanelAdmin");
    } else {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">

      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>


      {/* Tarjeta del login */}
      <div className="relative bg-card/95 backdrop-blur-sm p-10 rounded-2xl shadow-elegant border border-border w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <button
            type="button"
            onClick={ir_inicio}
            className="cursor-pointer mb-4 flex flex-col items-center transition-transform hover:scale-105"
            aria-label="Volver al inicio"
          >
            <img
              src={logo_icon}
              alt="Logo Guapitos"
              className="w-[200px] h-[200px] object-cover"
            />
          </button>

          <h2 className="text-3xl font-bold text-center bbg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] bg-clip-text">
            Panel de Administración
          </h2>
          <p className="text-muted-foreground text-center mt-2 text-sm">
            Acceso exclusivo para administradores de Guapitos
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">Usuario</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Contraseña</Label>
            <div className="relative">
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02] pr-10"
                placeholder="Ingresa tu contraseña"
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-glow hover:scale-[1.02] text-primary-foreground font-semibold"
            size="lg"
          >
            Iniciar Sesión
          </Button>

          <Button
            type="button"
            onClick={ir_inicio}
            className="w-full bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-glow hover:scale-[1.02] text-primary-foreground font-semibold"
            size="lg"
          >
            Volver al inicio
          </Button>
        </form>

      </div>
    </div>
  );
};

export default Login;
