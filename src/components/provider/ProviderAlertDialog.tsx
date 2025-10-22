import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import providerAlertsImg from "@/assets/provider-alerts.png";

interface ProviderAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 
    | "success"
    | "nit-exists"
    | "invalid-name"
    | "invalid-email"
    | "invalid-phone"
    | "invalid-nit"
    | "invalid-address";
}

const alertPositions = {
  success: { top: "6%", left: "4%", width: "44%" },
  "nit-exists": { top: "6%", right: "4%", width: "44%" },
  "invalid-name": { top: "36%", left: "4%", width: "44%" },
  "invalid-email": { top: "36%", right: "4%", width: "44%" },
  "invalid-phone": { top: "66%", left: "4%", width: "44%" },
  "invalid-nit": { top: "66%", right: "4%", width: "44%" },
  "invalid-address": { bottom: "4%", left: "4%", width: "44%" }
};

export function ProviderAlertDialog({ isOpen, onClose, type }: ProviderAlertDialogProps) {
  const position = alertPositions[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
        <div className="relative w-full" style={{ aspectRatio: "670/513" }}>
          <img 
            src={providerAlertsImg} 
            alt="Provider Alerts" 
            className="w-full h-full object-contain"
          />
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute hover:bg-transparent"
            style={{
              ...position,
              height: "24%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span className="sr-only">Regresar</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
