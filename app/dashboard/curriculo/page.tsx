"use client";

import { FileCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CurriculoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Currículo</h1>
        <p className="text-gray-600">
          Gerencie seu currículo e documentos profissionais
        </p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum currículo enviado
        </h3>
        <p className="text-gray-600 mb-6">
          Faça upload do seu currículo em PDF para facilitar candidaturas
        </p>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Fazer Upload
        </Button>
      </div>
    </div>
  );
}
