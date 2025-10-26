import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "dueña" && password == "guapitos123") {
            navigate("/");
        } else {
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    };

    return (
    <>
    <section id="login" className="py-20 bg-background"></section>

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#ec82ae] to-[#7ce0f1]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ec82ae] to-[#b1fbfc] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  </>
);

};

export default Login;