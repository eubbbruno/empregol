"use client";

import { Users } from "lucide-react";

export default function CandidatosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidatos</h1>
        <p className="text-gray-600">
          Gerencie todos os candidatos das suas vagas
        </p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum candidato ainda
        </h3>
        <p className="text-gray-600">
          Publique vagas para começar a receber candidaturas
        </p>
      </div>
    </div>
  );
}
