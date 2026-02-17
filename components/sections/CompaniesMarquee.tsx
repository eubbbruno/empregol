"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const companies = [
  { name: "TechBrasil", color: "#7C3AED" },
  { name: "InovaSoft", color: "#06B6D4" },
  { name: "DataFlow", color: "#F97316" },
  { name: "CloudTech", color: "#10B981" },
  { name: "StartupXYZ", color: "#8B5CF6" },
  { name: "DevHub", color: "#22D3EE" },
  { name: "CodeLab", color: "#F59E0B" },
  { name: "AppMakers", color: "#A855F7" },
  { name: "WebSolutions", color: "#34D399" },
  { name: "DigitalCo", color: "#FB923C" },
  { name: "TechFlow", color: "#C4B5FD" },
  { name: "InnovaHub", color: "#FDE047" },
];

function CompanyLogo({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 mx-8">
      <div className="bg-white rounded-2xl px-8 py-6 border-2 border-gray-200 hover:border-purple-300 transition-all group shadow-sm hover:shadow-md">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-md"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0)}
          </div>
          <span className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CompaniesMarquee() {
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Empresas que <span className="gradient-text-primary">confiam</span> em nós
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conectamos você com as melhores empresas do Brasil
            </p>
          </motion.div>

          {/* Marquee */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <motion.div
                className="flex"
                animate={{
                  x: [0, -50 * companies.length * 8],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedCompanies.map((company, index) => (
                  <CompanyLogo
                    key={`${company.name}-${index}`}
                    name={company.name}
                    color={company.color}
                  />
                ))}
              </motion.div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>

          {/* Stats - Marketing metrics, update with real numbers when available */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 mb-2">3.200+</p>
              <p className="text-gray-600">Empresas parceiras</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 mb-2">12.500+</p>
              <p className="text-gray-600">Vagas publicadas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 mb-2">85.000+</p>
              <p className="text-gray-600">Profissionais cadastrados</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
