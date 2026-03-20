import { useEffect } from "react";
import { AlertOctagon, X } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <div
      aria-hidden={!isOpen}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
      className="fixed inset-0 z-50"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 p-4"
        style={{
          transform: `translate(-50%, calc(-50% + ${isOpen ? "0px" : "20px"}))`,
          transition: "transform 0.25s ease",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-destructive bg-card p-6 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive border border-destructive/30">
              <AlertOctagon size={32} />
            </div>

            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Límite Alcanzado
            </h3>

            <p className="text-muted-foreground mb-8">
              {message}
            </p>

            <CyberButton
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onClose}
            >
              Entendido
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
}
