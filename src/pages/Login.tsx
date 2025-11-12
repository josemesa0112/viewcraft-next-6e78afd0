import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: Navegar directamente al Dashboard
    navigate("/");
  };

  const handleRegister = () => {
    // Simulación: Navegar al Dashboard también
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      {/* Header */}
      <div className="w-full bg-petmanager-primary-light py-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">PetManager</h1>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-normal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-normal">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-gray-300"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-petmanager-primary-light hover:bg-petmanager-primary-light/90 text-gray-800 font-medium mt-6"
            >
              Ingresar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 mb-3">¿No te has registrado?</p>
            <Button
              type="button"
              onClick={handleRegister}
              className="w-full bg-[#A8D5E2] hover:bg-[#A8D5E2]/90 text-gray-800 font-medium"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
