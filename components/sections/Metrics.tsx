"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Building2, ThumbsUp, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const metrics = [
  {
    icon: Users,
    value: 12500,
    suffix: "+",
    label: "Profissionais",
    description: "Cadastrados na plataforma",
    color: "var(--primary-500)",
    glow: "var(--primary-glow)",
  },
  {
    icon: Building2,
    value: 3200,
    suffix: "+",
    label: "Empresas",
    description: "Contratando ativamente",
    color: "var(--secondary-500)",
    glow: "var(--secondary-glow)",
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: "%",
    label: "Satisfação",
    description: "De candidatos aprovados",
    color: "var(--success-500)",
    glow: "var(--success-glow)",
  },
  {
    icon: Clock,
    value: 48,
    suffix: "h",
    label: "Tempo Médio",
    description: "Para primeiro match",
    color: "var(--accent-hot)",
    glow: "var(--accent-glow)",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest).toLocaleString("pt-BR")}${suffix}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Metrics() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent opacity-30" />
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
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-primary">Números</span>{" "}
              <span className="text-[var(--text-primary)]">que Impressionam</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Milhares de profissionais já encontraram suas oportunidades perfeitas
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-8 border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] transition-all h-full">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative"
                    style={{
                      background: `linear-gradient(135deg, ${metric.color}, ${metric.color}dd)`,
                    }}
                  >
                    <metric.icon className="w-7 h-7 text-white" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: metric.color,
                      }}
                    />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span
                      className="text-5xl font-bold block"
                      style={{
                        background: `linear-gradient(135deg, ${metric.color}, ${metric.color}dd)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)]">
                    {metric.description}
                  </p>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${metric.glow}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 border border-[var(--glass-border)]">
              <div className="w-2 h-2 rounded-full bg-[var(--success-500)] animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--success-500)] font-semibold">+150</span> novas vagas publicadas hoje
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
