"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Building2, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => setInView(true)}
      className="text-4xl sm:text-5xl font-bold text-gray-900"
    >
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </motion.span>
  );
}

const metrics = [
  {
    icon: Briefcase,
    value: 12500,
    suffix: "+",
    label: "Vagas Ativas",
    description: "Novas oportunidades todos os dias",
    color: "purple",
  },
  {
    icon: Users,
    value: 85000,
    suffix: "+",
    label: "Candidatos",
    description: "Profissionais cadastrados",
    color: "orange",
  },
  {
    icon: Building2,
    value: 3200,
    suffix: "+",
    label: "Empresas",
    description: "Parceiras verificadas",
    color: "cyan",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Satisfação",
    description: "Avaliação dos usuários",
    color: "green",
  },
];

const colorClasses = {
  purple: {
    border: "border-purple-500",
    icon: "text-purple-600",
    bg: "bg-purple-50",
  },
  orange: {
    border: "border-orange-500",
    icon: "text-orange-600",
    bg: "bg-orange-50",
  },
  cyan: {
    border: "border-cyan-500",
    icon: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  green: {
    border: "border-green-500",
    icon: "text-green-600",
    bg: "bg-green-50",
  },
};

export function Metrics() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Números que <span className="gradient-text-primary">impressionam</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A maior plataforma de empregos do Brasil, conectando talentos e
              oportunidades
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const colors = colorClasses[metric.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className={`bg-white rounded-2xl p-8 border-t-4 ${colors.border} shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>

                  {/* Number */}
                  <div className="mb-2">
                    <AnimatedNumber
                      value={metric.value}
                      suffix={metric.suffix}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
