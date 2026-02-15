"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Planos para <span className="gradient-text-primary">empresas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Escolha o plano ideal para o tamanho da sua equipe
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 p-2 bg-gray-100 rounded-full">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isAnnual
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isAnnual
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Anual
                <span className="ml-2 text-xs text-green-600 font-bold">
                  -20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isPro = plan.popular;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                    isPro
                      ? "border-green-500 shadow-xl shadow-green-100"
                      : "border-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  {/* Popular badge */}
                  {isPro && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        Mais Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      isPro
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        isPro ? "text-green-600" : "text-gray-600"
                      }`}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price === "Grátis" || plan.price === "Sob consulta" ? (
                      <div className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-gray-600">R$</span>
                        <span className="text-4xl font-bold text-gray-900">
                          {isAnnual
                            ? Math.round(Number(plan.price) * 0.8)
                            : plan.price}
                        </span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href="/cadastro" className="block w-full mb-8">
                    <Button
                      variant={isPro ? "default" : "secondary"}
                      size="lg"
                      className={`w-full ${
                        isPro
                          ? "bg-gradient-primary hover:opacity-90 text-white shadow-lg"
                          : ""
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isPro ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              isPro ? "text-green-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
