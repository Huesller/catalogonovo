import { Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-surface raised border-t border-base-200 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent via-accent-dark to-accent-muted flex items-center justify-center">
                <Layers className="w-4 h-4 text-base-0" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-base-900 font-semibold text-sm">AUTOPARTS</span>
                <span className="block text-accent text-2xs tracking-widest font-medium mt-0.5">CATALOG PRO</span>
              </div>
            </div>
            <p className="text-base-500 text-sm leading-relaxed max-w-sm">
              Plataforma B2B premium para catálogo técnico de peças automotivas. Dados precisos, busca inteligente.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-label mb-4">Catálogo</h3>
            <ul className="space-y-3">
              {[
                ['Todos os Produtos', 'catalog'],
                ['Marcas', 'catalog'],
                ['Categorias', 'catalog'],
              ].map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-base-500 text-sm hover:text-base-900 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-label mb-4">Plataforma</h3>
            <ul className="space-y-3">
              {[
                ['Área do Cliente', 'login'],
                ['Painel Admin', 'admin'],
              ].map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-base-500 text-sm hover:text-base-900 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-base-200 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base-600 text-xs">
            &copy; {new Date().getFullYear()} AutoParts Catalog Pro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-base-600 text-xs">Sistema operacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
