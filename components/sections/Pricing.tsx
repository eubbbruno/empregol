"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    icon: Building2,
    price: "Grátis",
    period: "para sempre",
    description: "Perfeito para começar a contratar",
    features: [
      "3 vagas ativas por mês",
      "Até 50 candidatos por vaga",
      "Filtros básicos",
      "Suporte por email",
      "Dashboard básico",
    ],
    cta: "Começar Grátis",
    popular: false,
    gradient: "linear-gradient(135deg, #52525B, #71717A)",
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: "97",
    period: "por mês",
    description: "Para empresas que contratam ativamente",
    features: [
      "Vagas ilimitadas",
      "Candidatos ilimitados",
      "Filtros avançados com IA",
      "Analytics e relatórios",
      "Destaque nas buscas",
      "Suporte prioritário",
      "API de integração",
      "Marca personalizada",
    ],
    cta: "Começar Teste Grátis",
    popular: true,
    gradient: "linear-gradient(135deg, #6D28D9, #A855F7)",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Sob consulta",
    period: "personalizado",
    description: "Para grandes empresas e recrutadores",
    features: [
      "Tudo do Pro +",
      "ATS integrado",
      "Múltiplos usuários",
      "White label completo",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Treinamento da equipe",
      "Integrações customizadas",
    ],
    cta: "Falar com Vendas",
    popular: false,
    gradient: "linear-gradient(135deg, #F97316, #FACC15)",
  },
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[var(--primary-700)] opacity-10 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
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
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="glass rounded-full px-6 py-2 border border-[var(--glass-border)]">
                <span className="text-sm text-[var(--text-secondary)]">
                  💼 Para Empresas
                </span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[var(--text-primary)]">Invista no</span>{" "}
              <span className="gradient-text-primary">Seu Futuro</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Planos flexíveis para empresas de todos os tamanhos
            </p>

            {/* Billing Toggle */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 glass rounded-full p-1 border border-[var(--glass-border)]"
            >
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-primary text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  billingPeriod === "annual"
                    ? "bg-gradient-primary text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-gradient-cta text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  -20%
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-cta text-white text-xs font-bold px-4 py-1.5 rounded-full glow-cta">
                      Mais Popular
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className={`glass rounded-3xl p-8 border transition-all h-full relative overflow-hidden ${
                    plan.popular
                      ? "border-[var(--primary-500)] shadow-[0_0_50px_var(--primary-glow)]"
                      : "border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
                  }`}
                  whileHover={{ y: plan.popular ? 0 : -10 }}
                >
                  {/* Background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ background: plan.gradient }}
                  />

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: plan.gradient }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    {typeof plan.price === "string" && plan.price !== "Sob consulta" ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold gradient-text-primary">
                          {plan.price}
                        </span>
                      </div>
                    ) : plan.price === "Sob consulta" ? (
                      <div className="text-3xl font-bold gradient-text-cta">
                        {plan.price}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl text-[var(--text-secondary)]">R$</span>
                        <span className="text-5xl font-bold gradient-text-primary">
                          {billingPeriod === "annual"
                            ? Math.floor(Number(plan.price) * 0.8)
                            : plan.price}
                        </span>
                      </div>
                    )}
                    <p className="text-[var(--text-muted)] text-sm mt-1">
                      {plan.period}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[var(--success-500)] flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)] text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? "default" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Note */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-[var(--text-secondary)] mb-4">
              Todos os planos incluem 14 dias de teste grátis. Sem cartão de crédito.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success-500)]" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success-500)]" />
                <span>Suporte em português</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success-500)]" />
                <span>Dados seguros (LGPD)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
