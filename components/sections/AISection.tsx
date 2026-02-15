"use client";

import { motion } from "framer-motion";
import { Brain, FileText, TrendingUp, Sparkles, Zap, Target } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const aiFeatures = [
  {
    icon: Target,
    title: "Sugestão de Vagas",
    description: "Algoritmo inteligente analisa seu perfil e encontra as oportunidades perfeitas para você.",
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
    stats: "98% de precisão",
  },
  {
    icon: FileText,
    title: "Otimização de Currículo",
    description: "IA revisa seu currículo e sugere melhorias para aumentar suas chances de aprovação.",
    gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)",
    stats: "+40% de visualizações",
  },
  {
    icon: TrendingUp,
    title: "Ranking de Candidatos",
    description: "Para empresas: sistema inteligente ranqueia candidatos por compatibilidade com a vaga.",
    gradient: "linear-gradient(135deg, #F97316, #FACC15)",
    stats: "Economia de 70% do tempo",
  },
];

export function AISection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Strong purple glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--primary-700)] opacity-20 blur-[150px]"
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

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--primary-500) 1px, transparent 1px),
                             linear-gradient(90deg, var(--primary-500) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating orbs */}
        {Array.from({ length: 8 }, (_, i) => {
          const left = ((i * 43 + 15) % 100);
          const top = ((i * 61 + 9) % 100);
          const delay = (i * 0.4) % 3;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[var(--primary-500)]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4,
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
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-20">
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-2 border border-[var(--primary-500)] mb-6"
              animate={{
                boxShadow: [
                  "0 0 20px var(--primary-glow)",
                  "0 0 40px var(--primary-glow)",
                  "0 0 20px var(--primary-glow)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[var(--primary-500)]" />
              </motion.div>
              <span className="text-sm font-semibold gradient-text-primary">
                Powered by AI
              </span>
            </motion.div>

            {/* Animated Heading */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-primary">Inteligência Artificial</span>
              <br />
              <span className="text-[var(--text-primary)]">Trabalhando por Você</span>
            </h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
            >
              Nossa IA de última geração analisa milhões de dados para conectar você às melhores oportunidades
            </motion.p>
          </motion.div>

          {/* AI Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass rounded-3xl p-8 border border-[var(--glass-border)] hover:border-[var(--primary-500)] transition-all h-full">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background: feature.gradient }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: feature.gradient }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ background: feature.gradient }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[var(--glass-border)]">
                    <Zap className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {feature.stats}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: "0 0 60px var(--primary-glow)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Visual */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <div className="glass rounded-3xl p-12 border border-[var(--primary-500)] overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  background: "linear-gradient(135deg, var(--primary-700), var(--secondary-500))",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  className="inline-flex items-center gap-3 mb-6"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Brain className="w-12 h-12 text-[var(--primary-500)]" />
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[var(--primary-500)]"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold gradient-text-primary mb-4">
                  Processando milhões de dados em tempo real
                </h3>
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Nossa IA aprende continuamente com cada interação, tornando-se mais precisa a cada dia
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
