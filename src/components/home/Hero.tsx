import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Cyberpunk Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
            Financiado por Publicidad 100% Legal
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-gradient-cyber">CatLoot:</span><br />
            <span className="text-foreground text-3xl md:text-5xl lg:text-6xl mt-2 block">El Ecosistema Gamer</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
            Transformamos el tiempo de visualización de anuncios en <span className="text-primary font-bold">premios reales</span>. 
            Los patrocinadores pagan por tu atención, y nosotros usamos ese presupuesto para financiar 
            <span className="text-secondary font-bold"> Diamantes, Robux y Pavos</span> para nuestra comunidad. 
            Es un modelo 100% transparente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
