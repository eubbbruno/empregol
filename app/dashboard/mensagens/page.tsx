"use client";

import { MessageSquare } from "lucide-react";

export default function MensagensPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Mensagens em Breve
        </h2>
        <p className="text-gray-600">
          Em breve você poderá conversar diretamente com empresas
        </p>
      </div>
    </div>
  );
}
