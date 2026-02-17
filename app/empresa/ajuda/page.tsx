"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "Como publico uma vaga?",
    answer:
      "Clique em 'Publicar Vaga' no menu lateral ou no botão destacado do dashboard. Preencha todos os campos do formulário (título, descrição, requisitos, benefícios, tipo de contrato, salário, etc.) e clique em 'Publicar Vaga'. A vaga ficará ativa imediatamente.",
  },
  {
    question: "Como vejo os candidatos que se candidataram?",
    answer:
      "Acesse 'Candidatos' no menu lateral. Você verá todos os candidatos que se candidataram às suas vagas, com informações de perfil, vaga aplicada e status atual. Você pode filtrar por vaga específica ou buscar por nome.",
  },
  {
    question: "Como mudo o status de uma candidatura?",
    answer:
      "Na página 'Candidatos', cada candidatura tem um dropdown de status. Clique nele e selecione o novo status (Em Análise, Entrevista, Aprovado ou Recusado). O candidato será notificado automaticamente da mudança.",
  },
  {
    question: "Posso pausar uma vaga?",
    answer:
      "Sim! Na página 'Minhas Vagas', clique no menu de ações (três pontos) da vaga e selecione 'Pausar vaga'. A vaga não aparecerá mais nas buscas, mas você pode reativá-la a qualquer momento.",
  },
  {
    question: "Como edito uma vaga já publicada?",
    answer:
      "Atualmente, para editar uma vaga você precisa pausá-la, criar uma nova versão com as informações atualizadas e encerrar a antiga. Em breve teremos a funcionalidade de edição direta.",
  },
  {
    question: "Qual a diferença entre os planos?",
    answer:
      "O plano Starter permite 5 vagas ativas simultaneamente, ideal para pequenas empresas. O plano Growth permite 20 vagas e inclui recursos de analytics. O plano Enterprise é ilimitado e inclui suporte prioritário e API. Veja mais detalhes na página de Planos.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "Todos os planos têm 14 dias de teste grátis, sem necessidade de cartão de crédito. Você pode publicar vagas e receber candidaturas normalmente durante o período de teste.",
  },
  {
    question: "Posso ver o perfil completo dos candidatos?",
    answer:
      "Sim! Ao clicar em um candidato na lista, você verá todas as informações do perfil dele, incluindo experiência, skills, links profissionais e histórico de candidaturas.",
  },
];

export default function EmpresaAjudaPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Central de Ajuda</h1>
        </div>
        <p className="text-gray-600">
          Encontre respostas para as perguntas mais comuns
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <Accordion.Root type="single" collapsible className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors group">
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Precisa de ajuda personalizada?
        </h3>
        <p className="text-gray-700 mb-4">
          Nossa equipe está pronta para ajudar sua empresa a encontrar os melhores talentos!
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:empresas@empregol.com.br"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            empresas@empregol.com.br
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            WhatsApp: (11) 99999-9999
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
