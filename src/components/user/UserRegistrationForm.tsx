import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface UserRegistrationFormProps {
  onCancel: () => void;
}

export function UserRegistrationForm({ onCancel }: UserRegistrationFormProps) {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    documento: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    // Validación simple
    if (!formData.nombreCompleto || !formData.email || !formData.documento || 
        !formData.contrasena || !formData.confirmarContrasena) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    // Simulación de registro exitoso
    toast({
      title: "Usuario registrado",
      description: `${formData.nombreCompleto} ha sido registrado exitosamente`,
    });

    // Limpiar formulario
    setFormData({
      nombreCompleto: "",
      email: "",
      documento: "",
      contrasena: "",
      confirmarContrasena: "",
    });

    // Regresar después de un momento
    setTimeout(() => {
      onCancel();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Registro de usuario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pb-8">
          <div className="space-y-2">
            <Label htmlFor="nombreCompleto" className="text-sm font-medium text-foreground">
              Nombre Completo
            </Label>
            <Input
              id="nombreCompleto"
              type="text"
              value={formData.nombreCompleto}
              onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento" className="text-sm font-medium text-foreground">
              Documento
            </Label>
            <Input
              id="documento"
              type="text"
              value={formData.documento}
              onChange={(e) => handleInputChange("documento", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contrasena" className="text-sm font-medium text-foreground">
              Contraseña
            </Label>
            <Input
              id="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={(e) => handleInputChange("contrasena", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarContrasena" className="text-sm font-medium text-foreground">
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmarContrasena"
              type="password"
              value={formData.confirmarContrasena}
              onChange={(e) => handleInputChange("confirmarContrasena", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleRegister}
              className="w-full py-6 text-base font-semibold rounded-lg"
              style={{
                backgroundColor: '#A8D08D',
                color: '#000000'
              }}
            >
              Registrar
            </Button>

            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full py-6 text-base font-semibold rounded-lg border-2"
              style={{
                backgroundColor: '#F4CCCC',
                borderColor: '#E5A1A1',
                color: '#000000'
              }}
            >
              Regresar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
