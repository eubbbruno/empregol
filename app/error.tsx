"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Algo deu errado
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Desculpe, ocorreu um erro inesperado. Tente novamente ou volte para a
          página inicial.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-gradient-primary text-white shadow-md"
          >
            <RefreshCw className="w-5 h-5" />
            Tentar Novamente
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              <Home className="w-5 h-5" />
              Voltar para Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 text-left">
            <p className="text-sm font-mono text-red-600">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
