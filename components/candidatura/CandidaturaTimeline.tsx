"use client";

import { motion } from "framer-motion";
import { Check, Clock, Calendar, FileCheck, Briefcase } from "lucide-react";

interface TimelineStep {
  status: "enviada" | "em_analise" | "entrevista" | "aprovada" | "recusada";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  date?: string;
}

interface CandidaturaTimelineProps {
  currentStatus: string;
  createdAt: string;
  updatedAt?: string;
}

const STEPS: TimelineStep[] = [
  { status: "enviada", label: "Enviada", icon: Clock },
  { status: "em_analise", label: "Em Análise", icon: FileCheck },
  { status: "entrevista", label: "Entrevista", icon: Calendar },
  { status: "aprovada", label: "Aprovado", icon: Check },
];

export function CandidaturaTimeline({
  currentStatus,
  createdAt,
  updatedAt,
}: CandidaturaTimelineProps) {
  // Se foi recusada, mostrar apenas até o ponto da recusa
  if (currentStatus === "recusada") {
    const currentIndex = STEPS.findIndex((s) => s.status === "enviada");
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Status da Candidatura</h3>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-lg font-semibold text-red-600 mb-1">Candidatura Recusada</p>
            <p className="text-sm text-gray-500">
              {updatedAt
                ? new Date(updatedAt).toLocaleDateString("pt-BR")
                : new Date(createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-6">Status da Candidatura</h3>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(currentIndex / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-green-500"
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentIndex;
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center flex-1"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 relative z-10 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 text-white shadow-lg shadow-green-200"
                      : isActive
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-200 animate-pulse"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Label */}
                <p
                  className={`text-sm font-medium mb-1 transition-colors ${
                    isCompleted || isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                {/* Date */}
                {isCompleted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-xs text-gray-500"
                  >
                    {index === 0
                      ? new Date(createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })
                      : isActive && updatedAt
                      ? new Date(updatedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })
                      : ""}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Steps Info */}
      {currentStatus !== "aprovada" && currentStatus !== "recusada" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl"
        >
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Próximo passo:</span>{" "}
            {currentStatus === "enviada" && "A empresa está analisando seu perfil"}
            {currentStatus === "em_analise" && "Aguardando convite para entrevista"}
            {currentStatus === "entrevista" && "Aguardando resultado da entrevista"}
          </p>
        </motion.div>
      )}

      {/* Success Message */}
      {currentStatus === "aprovada" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-green-50 rounded-xl"
        >
          <p className="text-sm text-green-900 font-semibold">
            🎉 Parabéns! Você foi aprovado para esta vaga!
          </p>
        </motion.div>
      )}
    </div>
  );
}
