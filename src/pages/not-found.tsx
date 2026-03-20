import { Link } from "wouter";
import { CyberButton } from "@/components/ui/cyber-button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full relative">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-destructive/20 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 p-8 rounded-2xl border border-destructive/30 bg-card/80 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-6 text-destructive flex items-center justify-center rounded-full bg-destructive/10 border border-destructive/30">
            <AlertCircle size={32} />
          </div>
          
          <h1 className="text-6xl font-display font-black text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Zona Muerta</h2>
          <p className="text-muted-foreground mb-8">
            Has navegado fuera del radar. Esta página no existe en nuestra base de datos.
          </p>
          
          <Link href="/">
            <CyberButton variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              Regresar a la Base
            </CyberButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
