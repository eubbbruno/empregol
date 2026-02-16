"use client";

import { Building2 } from "lucide-react";

export default function PerfilEmpresaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Perfil da Empresa
        </h1>
        <p className="text-gray-600">
          Gerencie as informações da sua empresa
        </p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Edição de Perfil em Breve
        </h3>
        <p className="text-gray-600">
          Em breve você poderá editar o perfil da sua empresa
        </p>
      </div>
    </div>
  );
}
