import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ops! Parece que a página que você está procurando não existe ou foi
            movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            <Home className="w-5 h-5" />
            Voltar para Home
          </Link>
          <Link
            href="/vagas"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Search className="w-5 h-5" />
            Explorar Vagas
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Precisa de ajuda?</p>
          <p className="text-gray-900">
            Entre em contato:{" "}
            <a
              href="mailto:contato@empregol.com"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              contato@empregol.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
