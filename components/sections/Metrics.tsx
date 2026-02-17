"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      className="block text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white"
    >
      {prefix}
      {count.toLocaleString("pt-BR")}
      {suffix}
    </motion.span>
  );
}

const metrics = [
  {
    value: 12500,
    suffix: "+",
    label: "Vagas Ativas",
  },
  {
    value: 85000,
    suffix: "+",
    label: "Candidatos",
  },
  {
    value: 3200,
    suffix: "+",
    label: "Empresas",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfação",
  },
];

export function Metrics() {
  return (
    <section className="py-16 sm:py-20 bg-[#15803D] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`text-center ${
                index !== metrics.length - 1
                  ? "lg:border-r border-white/20"
                  : ""
              } px-4`}
            >
              <AnimatedNumber
                value={metric.value}
                suffix={metric.suffix}
              />
              <p className="text-lg text-white/70 mt-2 font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
