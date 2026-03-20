import { useParticipants } from "@/hooks/use-raffle";
import { GameType, configLinks } from "@/lib/config";
import { CyberCard } from "@/components/ui/cyber-card";
import { Loader2, Users, AlertCircle } from "lucide-react";

export function ParticipantsTable({ game }: { game: GameType }) {
  const { data: participants, isLoading, isError } = useParticipants(game);

  const isPlaceholder = configLinks.apiUrl === "URL_DE_TU_GOOGLE_APPS_SCRIPT_AQUI";

  return (
    <CyberCard glowColor="cyan" className="mt-12 bg-background/50 border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-primary" />
          <h3 className="text-xl font-display font-bold">Participantes Activos</h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-primary/80">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Actualización en vivo
        </div>
      </div>

      {isPlaceholder && (
        <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-start gap-3">
          <AlertCircle className="text-secondary shrink-0 mt-0.5" size={18} />
          <div className="text-sm">
            <p className="font-bold text-secondary">Modo Demo Activado</p>
            <p className="text-muted-foreground">
              Conecta tu backend (Google Apps Script) en config.ts para ver datos
              reales. Mostrando datos de prueba.
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="animate-spin mb-4 text-primary" size={32} />
          <p>Cargando participantes...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-destructive">
          <p>Error al cargar la tabla de participantes.</p>
        </div>
      ) : !participants || participants.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
          <p>Aún no hay participantes en este sorteo. ¡Sé el primero!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-sm uppercase tracking-wider font-display">
                <th className="p-4 font-medium border-b border-border/50">ID del Jugador</th>
                <th className="p-4 font-medium border-b border-border/50 text-right">
                  Tickets (X/7)
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                  style={{ animation: `fadeInRow 0.3s ease ${i * 0.04}s both` }}
                >
                  <td className="p-4 font-mono text-foreground">{p.id}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                      {p.tickets}
                      <span className="text-primary/50 font-normal">/7</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CyberCard>
  );
}
