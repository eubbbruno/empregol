"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SalvasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas Salvas</h1>
        <p className="text-gray-600">
          Suas vagas favoritas para revisitar depois
        </p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma vaga salva ainda
        </h3>
        <p className="text-gray-600 mb-6">
          Salve vagas interessantes para revisitar mais tarde
        </p>
        <Link href="/vagas">
          <Button>Explorar Vagas</Button>
        </Link>
      </div>
    </div>
  );
}
