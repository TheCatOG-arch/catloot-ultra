import { configLinks } from "@/lib/config";
import { CyberButton } from "@/components/ui/cyber-button";
import { Youtube, CalendarClock, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 pb-10 pt-20 border-t border-border bg-card/30 overflow-hidden">
      {/* Background glow element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        
        <div className="flex items-center gap-3 text-secondary mb-6 font-display">
          <CalendarClock size={24} className="animate-pulse" />
          <h4 className="text-xl font-bold tracking-widest uppercase">Horario de Sorteos</h4>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Jueves: Free Fire", "Viernes: Roblox", "Sábado: Fortnite"].map((day, i) => (
            <div key={i} className="px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-foreground font-semibold backdrop-blur-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="max-w-md w-full mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0000] to-[#8B0000] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <CyberButton 
            onClick={() => window.open(configLinks.youtubeLive, '_blank', 'noopener,noreferrer')}
            className="w-full relative h-16 text-xl bg-[#1a0000] hover:bg-[#330000] border-[#FF0000]/50 text-white"
          >
            <Youtube size={28} className="text-[#FF0000]" />
            IR AL CANAL CATLOOT LIVE
          </CyberButton>
        </div>

        <div className="flex items-center gap-2 text-primary font-medium max-w-lg mb-8 bg-primary/5 p-4 rounded-xl border border-primary/10">
          <Zap size={24} className="shrink-0" />
          <p className="text-sm">¡A más participantes registrados, más cantidad de ganadores tendremos cada semana!</p>
        </div>

        <p className="text-muted-foreground text-sm opacity-60">
          © {new Date().getFullYear()} TheCatOG. Financiado de forma legal y transparente mediante publicidad.
        </p>
      </div>
    </footer>
  );
}
