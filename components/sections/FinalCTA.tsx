"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[var(--accent-hot)] opacity-15 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 30 }, (_, i) => {
          // Posições determinísticas para evitar hydration mismatch
          const left = ((i * 41 + 17) % 100);
          const top = ((i * 59 + 11) % 100);
          const duration = 3 + ((i * 19) % 20) / 10; // 3.0 a 5.0 segundos
          const delay = (i * 0.25) % 5; // 0 a 5 segundos
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--primary-500)] rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
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

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA Card */}
          <motion.div
            variants={fadeInUp}
            className="relative glass rounded-3xl p-12 md:p-16 border border-[var(--glass-border)] overflow-hidden"
          >
            {/* Background gradient overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-700), var(--accent-hot))",
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-cta mb-8 glow-cta"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="text-[var(--text-primary)]">Pronto para</span>
                <br />
                <span className="gradient-text-cta">Marcar seu Gol?</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto"
              >
                Junte-se a milhares de profissionais que já encontraram suas
                oportunidades perfeitas. Comece grátis hoje mesmo.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="default" size="xl" className="min-w-[200px]">
                  Sou Candidato
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="xl" className="min-w-[200px]">
                  Sou Empresa
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 pt-8 border-t border-[var(--glass-border)]"
              >
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--success-500)]" />
                    <span>100% Grátis para começar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--success-500)]" />
                    <span>Sem cartão de crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--success-500)]" />
                    <span>Configuração em 2 minutos</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
              <div className="w-full h-full rounded-br-full bg-gradient-primary" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
              <div className="w-full h-full rounded-tl-full bg-gradient-cta" />
            </div>
          </motion.div>

          {/* Stats below */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: "12.5K+", label: "Profissionais" },
              { value: "3.2K+", label: "Empresas" },
              { value: "5K+", label: "Vagas Ativas" },
              { value: "98%", label: "Satisfação" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
