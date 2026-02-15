"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, blurFadeIn } from "@/lib/animations";

const badges = [
  { icon: CheckCircle2, text: "100% grátis para candidatos" },
  { icon: CheckCircle2, text: "+5.000 vagas ativas" },
  { icon: CheckCircle2, text: "Empresas verificadas" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[var(--secondary-500)] opacity-15 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-hot)] opacity-10 blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--glass-border) 1px, transparent 1px),
                             linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 20 }, (_, i) => {
          // Posições determinísticas para evitar hydration mismatch
          const left = ((i * 37 + 13) % 100);
          const top = ((i * 53 + 7) % 100);
          const duration = 3 + ((i * 17) % 20) / 10; // 3.0 a 5.0 segundos
          const delay = (i * 0.3) % 4; // 0 a 4 segundos
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-500)] rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8 inline-block">
            <div className="glass rounded-full px-6 py-2 border border-[var(--glass-border)]">
              <span className="text-sm text-[var(--text-secondary)]">
                ✨ Plataforma #1 de Empregos no Brasil
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={blurFadeIn}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text-primary">Seu Próximo Gol</span>
            <br />
            <span className="text-[var(--text-primary)]">
              Profissional Começa Aqui
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto"
          >
            Conectamos talentos brasileiros às melhores oportunidades.{" "}
            <span className="text-[var(--text-primary)] font-semibold">
              Sem burocracia, sem enrolação.
            </span>
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="mb-10">
            <div className="glass rounded-2xl p-2 border border-[var(--glass-border)] max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Job Search Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--glass-bg-hover)] transition-colors">
                  <Search className="w-5 h-5 text-[var(--primary-500)]" />
                  <input
                    type="text"
                    placeholder="Cargo ou palavra-chave"
                    className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                  />
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-[var(--glass-border)]" />

                {/* Location Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--glass-bg-hover)] transition-colors">
                  <MapPin className="w-5 h-5 text-[var(--secondary-500)]" />
                  <input
                    type="text"
                    placeholder="Cidade ou remoto"
                    className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                  />
                </div>

                {/* Search Button */}
                <Button size="lg" className="md:w-auto w-full">
                  Buscar Vagas
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-2 text-[var(--text-secondary)]"
              >
                <badge.icon className="w-5 h-5 text-[var(--success-500)]" />
                <span className="text-sm font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-[var(--glass-border)] mx-auto flex items-start justify-center p-2"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-500)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
