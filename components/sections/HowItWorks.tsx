"use client";

import { motion } from "framer-motion";
import { UserPlus, Sparkles, MousePointerClick } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: UserPlus,
    title: "Crie seu Perfil",
    description: "Preencha uma vez e candidate-se em qualquer vaga com um clique. Sem formulários repetitivos.",
    color: "var(--primary-500)",
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
  },
  {
    icon: Sparkles,
    title: "Encontre Vagas Perfeitas",
    description: "Nossa IA analisa seu perfil e sugere as melhores oportunidades para você.",
    color: "var(--secondary-500)",
    gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)",
  },
  {
    icon: MousePointerClick,
    title: "Candidate-se em 1 Clique",
    description: "Sem burocracia. Um clique e pronto. Acompanhe tudo em tempo real no seu dashboard.",
    color: "var(--accent-hot)",
    gradient: "linear-gradient(135deg, #F97316, #FACC15)",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[var(--primary-700)] opacity-10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [-50, 0, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[var(--text-primary)]">Como</span>{" "}
              <span className="gradient-text-primary">Funciona</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Três passos simples para encontrar seu próximo emprego dos sonhos
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-hot)] opacity-20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  {/* Step Card */}
                  <motion.div
                    className="glass rounded-2xl p-8 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all h-full relative overflow-hidden group"
                    whileHover={{ y: -10 }}
                  >
                    {/* Background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ background: step.gradient }}
                    />

                    {/* Step Number */}
                    <div className="absolute top-4 right-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
                        style={{
                          background: step.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: step.gradient }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="w-8 h-8 text-white" />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                        style={{ background: step.color }}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                      <div
                        className="w-full h-full rounded-tl-full"
                        style={{ background: step.gradient }}
                      />
                    </div>
                  </motion.div>

                  {/* Arrow connector (mobile) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="lg:hidden flex justify-center my-6"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-0.5 h-12 bg-gradient-to-b from-[var(--glass-border)] to-transparent" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <motion.button
              className="px-8 py-4 rounded-2xl bg-gradient-cta text-white font-semibold text-lg glow-cta hover:shadow-[0_0_50px_var(--accent-glow)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Começar Agora — É Grátis
            </motion.button>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              Sem cartão de crédito. Sem pegadinhas.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
