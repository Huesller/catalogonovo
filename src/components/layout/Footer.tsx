interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-950" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-none">AUTOPARTS</div>
                <div className="text-amber-500 text-xs leading-none mt-0.5">CATALOG PRO</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Plataforma B2B premium para catálogo técnico de peças automotivas. Dados precisos, busca inteligente.
            </p>
          </div>

          <div>
            <h3 className="text-gray-300 text-sm font-semibold mb-4 tracking-wide uppercase">Catálogo</h3>
            <ul className="space-y-2">
              {[['Todos os Produtos', 'catalog'], ['Marcas', 'brands'], ['Categorias', 'categories']].map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-500 text-sm hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-300 text-sm font-semibold mb-4 tracking-wide uppercase">Plataforma</h3>
            <ul className="space-y-2">
              {[['Área do Cliente', 'login'], ['Painel Admin', 'admin']].map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-500 text-sm hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} AutoParts Catalog Pro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 text-xs">Sistema operacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
