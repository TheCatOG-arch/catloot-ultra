import { useState } from "react";
import { GameType, configLinks } from "@/lib/config";
import { useRegisterTicket } from "@/hooks/use-raffle";
import { CyberCard } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { ParticipantsTable } from "./ParticipantsTable";
import { ErrorModal } from "./ErrorModal";
import { CheckCircle2, Lock, Plus, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TabContentProps {
  game: GameType;
  links: string[];
}

export function TabContent({ game, links }: TabContentProps) {
  const [playerId, setPlayerId] = useState("");
  const [verified1, setVerified1] = useState(false);
  const [verified2, setVerified2] = useState(false);
  const [showExtraTicket, setShowExtraTicket] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { toast } = useToast();
  const registerMutation = useRegisterTicket();

  const handleVerify = (link: string, step: 1 | 2) => {
    window.open(link, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      if (step === 1) setVerified1(true);
      if (step === 2) setVerified2(true);
    }, 1000);
  };

  const handleRegister = () => {
    if (!playerId.trim() || !verified1 || !verified2) return;

    registerMutation.mutate(
      { id: playerId.trim(), juego: game },
      {
        onSuccess: (data) => {
          if (data.status === "error") {
            setPlayerId("");
            setErrorModalOpen(true);
          } else {
            toast({
              title: "¡Ticket Registrado!",
              description: `Has registrado exitosamente tu ID. Tienes ${data.tickets}/7 tickets.`,
            });
            setShowExtraTicket(true);
          }
        },
        onError: () => {
          toast({
            title: "Error de conexión",
            description: "No se pudo registrar el ticket. Verifica tu conexión.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleExtraTicket = () => {
    window.open(configLinks.adsterraDirect, "_blank", "noopener,noreferrer");
    setShowExtraTicket(false);
    setVerified1(false);
    setVerified2(false);
  };

  const isFormValid = playerId.trim().length > 0 && verified1 && verified2;
  const cardGlow = game === "roblox" ? "cyan" : "magenta";

  return (
    <div className="space-y-8">
      <CyberCard glowColor={cardGlow} className="p-1">
        <div className="p-6 sm:p-8 bg-card rounded-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold mb-2">
              Registra tu Participación
            </h3>
            <p className="text-muted-foreground">
              Sigue los pasos para obtener tu ticket oficial.
            </p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Step 1: ID Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs border border-primary/50">
                  1
                </span>
                Tu ID de Jugador
              </label>
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Ingresa tu ID oficial"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                disabled={showExtraTicket || registerMutation.isPending}
              />
            </div>

            {/* Step 2: Verification Buttons */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs border border-primary/50">
                  2
                </span>
                Filtro Anti-Bot (Obligatorio)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CyberButton
                  variant={verified1 ? "outline" : "secondary"}
                  onClick={() => handleVerify(links[0], 1)}
                  disabled={verified1 || showExtraTicket || registerMutation.isPending}
                  className={verified1 ? "border-primary text-primary bg-primary/5" : ""}
                >
                  {verified1 ? <CheckCircle2 size={18} /> : <Lock size={18} />}
                  {verified1 ? "Verificación 1 Lista" : "Verificación de Seguridad 1"}
                </CyberButton>

                <CyberButton
                  variant={verified2 ? "outline" : "secondary"}
                  onClick={() => handleVerify(links[1], 2)}
                  disabled={verified2 || showExtraTicket || registerMutation.isPending}
                  className={verified2 ? "border-primary text-primary bg-primary/5" : ""}
                >
                  {verified2 ? <CheckCircle2 size={18} /> : <Lock size={18} />}
                  {verified2 ? "Verificación 2 Lista" : "Verificación de Seguridad 2"}
                </CyberButton>
              </div>
            </div>

            {/* Step 3: Register / Extra Ticket — always in DOM, CSS-toggled */}
            <div className="pt-8 relative min-h-[80px]">
              {/* Register button — visible when showExtraTicket is false */}
              <div
                style={{
                  opacity: showExtraTicket ? 0 : 1,
                  pointerEvents: showExtraTicket ? "none" : "auto",
                  transition: "opacity 0.25s ease",
                  position: showExtraTicket ? "absolute" : "relative",
                  inset: 0,
                }}
              >
                <CyberButton
                  variant="primary"
                  className="w-full h-14 text-lg"
                  onClick={handleRegister}
                  disabled={!isFormValid}
                  isLoading={registerMutation.isPending}
                >
                  <Ticket size={20} />
                  REGISTRAR TICKET
                </CyberButton>
                {!isFormValid && !showExtraTicket && (
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Completa tu ID y las 2 verificaciones para habilitar el botón.
                  </p>
                )}
              </div>

              {/* Extra ticket block — visible when showExtraTicket is true */}
              <div
                style={{
                  opacity: showExtraTicket ? 1 : 0,
                  pointerEvents: showExtraTicket ? "auto" : "none",
                  transition: "opacity 0.25s ease",
                  position: showExtraTicket ? "relative" : "absolute",
                  inset: 0,
                }}
              >
                <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent border border-primary/30">
                  <div className="text-center">
                    <p className="font-bold text-lg text-primary mb-1">
                      ¡Ticket Registrado con Éxito!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Puedes seguir sumando hasta 7 tickets en total.
                    </p>
                  </div>
                  <CyberButton
                    variant="primary"
                    className="w-full sm:w-auto h-14 text-lg"
                    onClick={handleExtraTicket}
                  >
                    <Plus size={20} />
                    +1 Ticket Extra (Ver Anuncio)
                  </CyberButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CyberCard>

      <ParticipantsTable game={game} />

      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message="¡Máximo nivel de suerte alcanzado! Ya posees 7/7 tickets para este sorteo. Vuelve la próxima semana."
      />
    </div>
  );
}
