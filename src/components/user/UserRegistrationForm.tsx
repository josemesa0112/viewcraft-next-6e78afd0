import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ValidationModal } from "@/components/provider/ValidationModal";

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

  const [validationMessage, setValidationMessage] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    // Validar nombre (solo letras, espacios y signos diacríticos)
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!formData.nombreCompleto.trim()) {
      setValidationMessage("Por favor ingrese el nombre completo");
      setShowValidationModal(true);
      return;
    }
    if (!nameRegex.test(formData.nombreCompleto)) {
      setValidationMessage("El campo de nombre solo permite letras, espacios y signos diacríticos");
      setShowValidationModal(true);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setValidationMessage("Por favor ingrese el email");
      setShowValidationModal(true);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setValidationMessage("Ingrese un email válido");
      setShowValidationModal(true);
      return;
    }

    // Validar documento
    const documentRegex = /^\d{7,10}$/;
    if (!formData.documento.trim()) {
      setValidationMessage("Por favor ingrese el documento");
      setShowValidationModal(true);
      return;
    }
    if (!documentRegex.test(formData.documento)) {
      setValidationMessage("Ingrese un documento válido (7-10 dígitos)");
      setShowValidationModal(true);
      return;
    }

    // Validar contraseña
    if (!formData.contrasena.trim()) {
      setValidationMessage("Por favor ingrese una contraseña");
      setShowValidationModal(true);
      return;
    }
    
    // Validar requisitos de contraseña
    const hasUpperCase = /[A-Z]/.test(formData.contrasena);
    const hasLowerCase = /[a-z]/.test(formData.contrasena);
    const hasNumber = /[0-9]/.test(formData.contrasena);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.contrasena);
    
    if (formData.contrasena.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setValidationMessage("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.");
      setShowValidationModal(true);
      return;
    }

    // Validar confirmación de contraseña
    if (!formData.confirmarContrasena.trim()) {
      setValidationMessage("Por favor confirme su contraseña");
      setShowValidationModal(true);
      return;
    }
    if (formData.contrasena !== formData.confirmarContrasena) {
      setValidationMessage("Las contraseñas no coinciden. Por favor verifique que ambas contraseñas sean iguales");
      setShowValidationModal(true);
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
    <>

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Registro de usuario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-8 pb-8">
          <div className="space-y-2">
            <Label htmlFor="nombreCompleto" className="text-sm font-medium text-card-foreground">
              Nombre Completo
            </Label>
            <Input
              id="nombreCompleto"
              type="text"
              value={formData.nombreCompleto}
              onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
              className="bg-card border-input text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-card border-input text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento" className="text-sm font-medium text-card-foreground">
              Documento
            </Label>
            <Input
              id="documento"
              type="text"
              value={formData.documento}
              onChange={(e) => handleInputChange("documento", e.target.value)}
              className="bg-card border-input text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contrasena" className="text-sm font-medium text-card-foreground">
              Contraseña
            </Label>
            <Input
              id="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={(e) => handleInputChange("contrasena", e.target.value)}
              className="bg-card border-input text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarContrasena" className="text-sm font-medium text-card-foreground">
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmarContrasena"
              type="password"
              value={formData.confirmarContrasena}
              onChange={(e) => handleInputChange("confirmarContrasena", e.target.value)}
              className="bg-card border-input text-card-foreground"
            />
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleRegister}
              className="w-full py-6 text-base font-semibold rounded-lg bg-[hsl(100,40%,70%)] hover:bg-[hsl(100,40%,65%)] text-foreground"
            >
              Registrar
            </Button>

            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full py-6 text-base font-semibold rounded-lg border-2 bg-[hsl(0,60%,85%)] hover:bg-[hsl(0,60%,80%)] border-[hsl(0,50%,70%)] text-foreground"
            >
              Regresar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <ValidationModal
      isOpen={showValidationModal}
      onClose={() => setShowValidationModal(false)}
      message={validationMessage}
      isSuccess={false}
    />
    </>
  );
}
