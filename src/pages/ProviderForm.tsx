import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ProviderForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    telefono: "",
    email: "",
    direccion: ""
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nombre || !formData.nit || !formData.email) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Por favor complete todos los campos requeridos.",
      });
      return;
    }

    // Success simulation
    toast({
      title: "Proveedor registrado",
      description: `${formData.nombre} se ha registrado exitosamente.`,
    });
    
    // Reset form
    setFormData({
      nombre: "",
      nit: "",
      telefono: "",
      email: "",
      direccion: ""
    });
  };

  return (
    <Layout userInitial="G">
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md bg-petmanager-surface shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-foreground">
              Agregar proveedor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange("nombre")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nit">NIT</Label>
                <Input
                  id="nit"
                  type="text"
                  value={formData.nit}
                  onChange={handleInputChange("nit")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfonos de contacto</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleInputChange("telefono")}
                  className="bg-muted/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="bg-muted/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange("direccion")}
                  className="bg-muted/30 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  variant="petmanager"
                  className="w-full"
                >
                  Registrar
                </Button>
                
                <Button
                  type="button"
                  variant="cancel"
                  className="w-full"
                  asChild
                >
                  <Link to="/" className="inline-flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Regresar
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}