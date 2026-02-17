"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "Como me candidato a uma vaga?",
    answer:
      "Navegue até a seção 'Vagas' no menu lateral, encontre uma vaga de interesse e clique em 'Ver Detalhes'. Na página da vaga, clique no botão 'Candidatar-se'. Sua candidatura será enviada imediatamente e você poderá acompanhar o status na seção 'Candidaturas'.",
  },
  {
    question: "Como edito meu perfil?",
    answer:
      "Clique em 'Meu Perfil' no menu lateral. Você poderá editar todas as suas informações pessoais, profissionais, adicionar skills, links e preferências. Não esqueça de clicar em 'Salvar Alterações' ao finalizar.",
  },
  {
    question: "Como acompanho minhas candidaturas?",
    answer:
      "Acesse 'Candidaturas' no menu lateral. Lá você verá todas as vagas que se candidatou, o status atual de cada uma (Enviada, Em Análise, Entrevista, Aprovado ou Recusado) e uma timeline visual do progresso.",
  },
  {
    question: "Posso salvar vagas para ver depois?",
    answer:
      "Sim! Ao visualizar uma vaga, clique no ícone de coração para salvá-la. Você pode acessar todas as vagas salvas na seção 'Salvas' do menu lateral.",
  },
  {
    question: "Como funciona o match de vagas?",
    answer:
      "Nossa inteligência artificial analisa seu perfil (skills, experiência, preferências) e compara com os requisitos das vagas. Quanto mais completo seu perfil, melhores serão as recomendações que você receberá.",
  },
  {
    question: "Posso me candidatar a quantas vagas quiser?",
    answer:
      "Sim! Não há limite de candidaturas. Recomendamos focar em vagas que realmente combinam com seu perfil para aumentar suas chances de sucesso.",
  },
  {
    question: "Como as empresas veem meu perfil?",
    answer:
      "Quando você se candidata a uma vaga, a empresa tem acesso ao seu perfil completo, incluindo experiência, skills e links profissionais. Por isso é importante manter seu perfil sempre atualizado.",
  },
  {
    question: "Posso cancelar uma candidatura?",
    answer:
      "No momento não é possível cancelar candidaturas pelo dashboard. Se precisar, entre em contato diretamente com a empresa através da seção de Mensagens (em breve).",
  },
];

export default function AjudaPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-green-600" />
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
        className="mt-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Não encontrou o que procurava?
        </h3>
        <p className="text-gray-700 mb-4">
          Entre em contato com nosso suporte e teremos prazer em ajudar!
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:suporte@empregol.com.br"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            suporte@empregol.com.br
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            WhatsApp: (11) 99999-9999
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
