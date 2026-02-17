"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send, Search, Paperclip } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

const mockConversations = [
  {
    id: "1",
    empresa: "Tech Solutions",
    avatar: "https://ui-avatars.com/api/?name=Tech+Solutions&background=22c55e&color=fff",
    lastMessage: "Gostaríamos de agendar uma entrevista com você",
    time: "10:30",
    unread: 2,
    vaga: "Desenvolvedor Full Stack",
  },
  {
    id: "2",
    empresa: "StartupXYZ",
    avatar: "https://ui-avatars.com/api/?name=StartupXYZ&background=3b82f6&color=fff",
    lastMessage: "Obrigado pelo interesse na vaga",
    time: "Ontem",
    unread: 0,
    vaga: "Product Manager",
  },
  {
    id: "3",
    empresa: "InnovaCorp",
    avatar: "https://ui-avatars.com/api/?name=InnovaCorp&background=f59e0b&color=fff",
    lastMessage: "Quando você estaria disponível?",
    time: "2 dias",
    unread: 1,
    vaga: "UX Designer",
  },
];

export default function MensagensPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-[calc(100vh-8rem)]"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mensagens</h1>
        <p className="text-gray-600">
          Converse diretamente com empresas sobre suas candidaturas
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-[calc(100%-5rem)] flex"
      >
        {/* Sidebar - Lista de Conversas */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar conversas..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <div
                key={conv.id}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Image
                      src={conv.avatar}
                      alt={conv.empresa}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    {conv.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {conv.empresa}
                      </h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-green-600 mb-1">{conv.vaga}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-12 h-12 text-green-600" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sistema de Mensagens em Desenvolvimento
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Em breve você poderá conversar diretamente com empresas, agendar
              entrevistas e tirar dúvidas sobre suas candidaturas em tempo real.
            </p>

            {/* Features Preview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-left space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Recursos que virão:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Chat em tempo real
                    </p>
                    <p className="text-xs text-gray-500">
                      Converse instantaneamente com recrutadores
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Paperclip className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Compartilhamento de arquivos
                    </p>
                    <p className="text-xs text-gray-500">
                      Envie currículo e portfólio diretamente
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Send className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Notificações instantâneas
                    </p>
                    <p className="text-xs text-gray-500">
                      Nunca perca uma mensagem importante
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-800">
                <span className="font-semibold">Novidade em breve!</span> Estamos
                trabalhando para trazer a melhor experiência de comunicação para
                você.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
