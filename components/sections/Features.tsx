"use client";

import { motion } from "framer-motion";
import {
  User,
  Brain,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const features = [
  {
    icon: User,
    title: "Perfil Inteligente",
    description: "Preencha uma vez, candidate-se em qualquer vaga. Seu perfil se adapta automaticamente.",
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
    size: "large",
  },
  {
    icon: Brain,
    title: "Match com IA",
    description: "Algoritmo inteligente encontra as vagas perfeitas para você.",
    gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)",
    size: "medium",
  },
  {
    icon: Bell,
    title: "Alertas Personalizados",
    description: "Receba notificações de vagas que combinam com seu perfil.",
    gradient: "linear-gradient(135deg, #F97316, #FACC15)",
    size: "medium",
  },
  {
    icon: BarChart3,
    title: "Tracker de Candidaturas",
    description: "Acompanhe o status de todas as suas candidaturas em tempo real.",
    gradient: "linear-gradient(135deg, #10B981, #34D399)",
    size: "medium",
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description: "Seus dados são protegidos. Empresas só veem o que você permite.",
    gradient: "linear-gradient(135deg, #8B5CF6, #C4B5FD)",
    size: "medium",
  },
  {
    icon: Zap,
    title: "Candidatura Rápida",
    description: "Um clique e pronto. Sem formulários intermináveis.",
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
    size: "large",
  },
  {
    icon: Target,
    title: "Score de Compatibilidade",
    description: "Veja o quanto você combina com cada vaga antes de se candidatar.",
    gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
    size: "medium",
  },
  {
    icon: TrendingUp,
    title: "Insights de Carreira",
    description: "Receba dicas personalizadas para melhorar seu perfil e chances.",
    gradient: "linear-gradient(135deg, #A855F7, #EC4899)",
    size: "medium",
  },
];

export function Features() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[var(--secondary-500)] opacity-10 blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
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
            <div className="inline-block mb-4">
              <div className="glass rounded-full px-6 py-2 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  ✨ Para Candidatos
                </span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-primary">Recursos</span>{" "}
              <span className="text-[var(--text-primary)]">Poderosos</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Tudo que você precisa para encontrar seu próximo emprego, em um só lugar
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`
                  ${feature.size === "large" ? "lg:col-span-2 lg:row-span-2" : ""}
                  ${feature.size === "medium" ? "lg:col-span-1" : ""}
                `}
              >
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="glass rounded-2xl p-8 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all h-full relative overflow-hidden group cursor-pointer"
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ background: feature.gradient }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`relative rounded-2xl flex items-center justify-center mb-6 ${
                      feature.size === "large" ? "w-20 h-20" : "w-16 h-16"
                    }`}
                    style={{ background: feature.gradient }}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon
                      className={`text-white ${
                        feature.size === "large" ? "w-10 h-10" : "w-8 h-8"
                      }`}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ background: feature.gradient }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3
                    className={`font-bold text-[var(--text-primary)] mb-3 ${
                      feature.size === "large" ? "text-3xl" : "text-xl"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-[var(--text-secondary)] leading-relaxed ${
                      feature.size === "large" ? "text-lg" : "text-base"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* Large cards get extra content */}
                  {feature.size === "large" && (
                    <motion.div
                      className="mt-6 pt-6 border-t border-[var(--glass-border)]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <div className="w-2 h-2 rounded-full bg-[var(--success-500)] animate-pulse" />
                        <span>Disponível agora</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                    <div
                      className="w-full h-full rounded-tl-full"
                      style={{ background: feature.gradient }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <p className="text-[var(--text-secondary)] mb-4">
              E muito mais recursos sendo desenvolvidos...
            </p>
            <motion.button
              className="px-8 py-4 rounded-2xl glass border border-[var(--glass-border)] hover:border-[var(--primary-500)] text-[var(--text-primary)] font-semibold transition-all"
              whileHover={{ scale: 1.05, borderColor: "var(--primary-500)" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Todos os Recursos
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
