import { Dialog, DialogContent } from "@/components/ui/dialog";
import alertInvalidName from "@/assets/alert-invalid-name.png";
import alertInvalidEmail from "@/assets/alert-invalid-email.png";
import alertInvalidNit from "@/assets/alert-invalid-nit.png";

interface UserAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 
    | "invalid-name"
    | "invalid-email"
    | "invalid-document";
}

const alertImages = {
  "invalid-name": alertInvalidName,
  "invalid-email": alertInvalidEmail,
  "invalid-document": alertInvalidNit, // Reutilizamos la imagen de NIT para documento
};

const alertMessages = {
  "invalid-name": "El campo de nombre solo permite letras, espacios y signos diacríticos",
  "invalid-email": "Ingrese un email válido",
  "invalid-document": "Ingrese un documento válido"
};

export function UserAlertDialog({ isOpen, onClose, type }: UserAlertDialogProps) {
  const alertImage = alertImages[type];
  const altText = alertMessages[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-0 shadow-none">
        <div className="relative w-full flex items-center justify-center">
          <img 
            src={alertImage} 
            alt={altText}
            className="w-full h-auto max-h-[85vh] object-contain"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
          <button
            onClick={onClose}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[35%] h-[8%] cursor-pointer bg-transparent border-0 hover:opacity-80 transition-opacity"
            aria-label="Regresar"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
