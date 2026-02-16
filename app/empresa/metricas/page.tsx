"use client";

import { TrendingUp } from "lucide-react";

export default function MetricasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Métricas</h1>
        <p className="text-gray-600">Acompanhe o desempenho das suas vagas</p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Métricas em Breve
        </h3>
        <p className="text-gray-600">
          Em breve você terá acesso a métricas detalhadas
        </p>
      </div>
    </div>
  );
}
