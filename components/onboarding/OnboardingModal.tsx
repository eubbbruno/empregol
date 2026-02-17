"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  User,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Target,
  Briefcase,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingModalProps {
  userType: "candidato" | "empresa";
  onComplete: () => void;
  onSkip: () => void;
}

const candidatoSteps = [
  {
    title: "Bem-vindo ao EmpreGol! 🎯",
    description:
      "Vamos te ajudar a encontrar sua próxima oportunidade em poucos passos.",
    icon: Sparkles,
    color: "green",
  },
  {
    title: "Complete seu Perfil",
    description:
      "Quanto mais completo seu perfil, melhores serão as recomendações de vagas.",
    icon: User,
    color: "blue",
    checklist: [
      "Adicione uma foto profissional",
      "Preencha seu título e experiência",
      "Liste suas principais skills",
      "Adicione links do LinkedIn e GitHub",
    ],
  },
  {
    title: "Explore Vagas",
    description:
      "Use os filtros para encontrar vagas que combinam com você. Salve as favoritas para ver depois.",
    icon: Search,
    color: "purple",
  },
  {
    title: "Candidate-se em 1 Clique",
    description:
      "Encontrou a vaga ideal? Candidate-se com um clique. Acompanhe o status pelo dashboard.",
    icon: CheckCircle2,
    color: "green",
  },
];

const empresaSteps = [
  {
    title: "Bem-vindo ao EmpreGol! 🏢",
    description:
      "Vamos te ajudar a encontrar os melhores talentos em poucos passos.",
    icon: Sparkles,
    color: "blue",
  },
  {
    title: "Complete o Perfil da Empresa",
    description:
      "Um perfil completo atrai candidatos mais qualificados e aumenta a confiança.",
    icon: Building2,
    color: "cyan",
    checklist: [
      "Adicione o logo da empresa",
      "Descreva sua cultura e valores",
      "Informe setor e tamanho",
      "Adicione o website",
    ],
  },
  {
    title: "Publique sua Primeira Vaga",
    description:
      "Crie vagas detalhadas com requisitos claros para atrair os candidatos certos.",
    icon: Target,
    color: "orange",
  },
  {
    title: "Gerencie Candidatos",
    description:
      "Veja todas as candidaturas, mude status e agende entrevistas diretamente pela plataforma.",
    icon: Briefcase,
    color: "blue",
  },
];

export function OnboardingModal({
  userType,
  onComplete,
  onSkip,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = userType === "candidato" ? candidatoSteps : empresaSteps;
  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;
  const themeColor = userType === "candidato" ? "green" : "blue";

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const colorClasses = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      dot: "bg-green-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      dot: "bg-blue-600",
    },
  };

  const colors = colorClasses[themeColor];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onSkip}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onSkip}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Icon */}
            <motion.div
              key={currentStep}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}
            >
              <Icon className={`w-10 h-10 ${colors.text}`} />
            </motion.div>

            {/* Title & Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                  {step.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Checklist (if exists) */}
            {step.checklist && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6 mb-8"
              >
                <div className="space-y-3">
                  {step.checklist.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-6 h-6 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? `w-8 ${colors.dot}`
                      : index < currentStep
                      ? `w-2 ${colors.dot}`
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              {currentStep > 0 ? (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </Button>
              ) : (
                <Button
                  onClick={onSkip}
                  variant="ghost"
                  size="lg"
                  className="flex-1 text-gray-600"
                >
                  Pular
                </Button>
              )}

              <Button
                onClick={handleNext}
                size="lg"
                className={`flex-1 ${colors.button} text-white shadow-lg`}
              >
                {isLastStep ? "Começar a Usar!" : "Próximo"}
                {!isLastStep && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
