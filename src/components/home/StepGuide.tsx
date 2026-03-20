import { motion } from "framer-motion";
import { Gamepad2, ShieldCheck, UserPlus, Sparkles, Youtube } from "lucide-react";
import { CyberCard } from "@/components/ui/cyber-card";

const steps = [
  {
    icon: Gamepad2,
    title: "1. Elige tu Batalla",
    desc: "Selecciona Free Fire, Roblox o Fortnite",
    color: "cyan"
  },
  {
    icon: ShieldCheck,
    title: "2. Verificación",
    desc: "Completa 2 filtros de seguridad (anuncios)",
    color: "magenta"
  },
  {
    icon: UserPlus,
    title: "3. Registra tu ID",
    desc: "Ingresa tu identificador oficial de jugador",
    color: "cyan"
  },
  {
    icon: Sparkles,
    title: "4. Multiplica tu Suerte",
    desc: "Visualiza anuncios extra para hasta 7 tickets",
    color: "magenta"
  },
  {
    icon: Youtube,
    title: "5. Reclama en Vivo",
    desc: "Únete a nuestros directos semanales en YouTube",
    color: "cyan"
  }
] as const;

export function StepGuide() {
  return (
    <section className="py-12 bg-background relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground font-display">
          ¿Cómo <span className="text-primary">Funciona?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <CyberCard 
                glowColor={step.color} 
                animate={false}
                className="h-full flex flex-col items-center text-center hover:-translate-y-2"
              >
                <div className={`p-4 rounded-full mb-4 ${
                  step.color === "cyan" 
                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,255,255,0.3)]" 
                    : "bg-secondary/10 text-secondary shadow-[0_0_15px_rgba(188,19,254,0.3)]"
                }`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
