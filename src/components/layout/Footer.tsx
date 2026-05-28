import { Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-base-0 border-t border-accent/18 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-7 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded flex items-center justify-center font-display font-extrabold text-white text-sm">
                A
              </div>
              <div>
                <span className="font-display font-bold text-xs text-base-900">Empresa</span>
                <span className="block text-accent text-2xs tracking-widest font-bold">CATÁLOGO</span>
              </div>
            </div>
            <p className="text-base-500 text-xs leading-relaxed max-w-sm">
              Plataforma B2B premium para catálogo técnico de peças automotivas. Dados precisos, busca inteligente e organização clara.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-accent uppercase mb-4">Catálogo</h3>
            <ul className="space-y-2.5">
              {[
                ['Todos os Produtos', 'catalog'],
                ['Marcas', 'catalog'],
                ['Categorias', 'catalog'],
              ].map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-base-500 text-xs hover:text-accent transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest text-accent uppercase mb-4">Plataforma</h3>
            <ul className="space-y-2.5">
              {[
                ['Área do Cliente', 'login'],
                ['Painel Admin', 'admin'],
              ].map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-base-500 text-xs hover:text-accent transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/18 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base-500 text-2xs">
            &copy; {new Date().getFullYear()} Empresa Catálogo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-base-500 text-2xs">Sistema operacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
