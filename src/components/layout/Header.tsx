import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, Settings, LogOut, User, Layers } from 'lucide-react';
import { useAuth } from '../../lib/auth';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSearch: (query: string) => void;
}

export default function Header({ currentPage, onNavigate, onSearch }: HeaderProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.user-menu')) setUserMenuOpen(false);
    };
    if (userMenuOpen) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [userMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue('');
    }
  };

  const navItems = [
    { label: 'Catálogo', page: 'catalog' },
    { label: 'Marcas', page: 'brands' },
    { label: 'Categorias', page: 'categories' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-base-0/95 border-b border-accent/18'
            : 'bg-base-0/95 border-b border-accent/18'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-7 h-full">
          <div className="flex items-center justify-between h-full gap-8">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-md flex items-center justify-center font-display font-extrabold text-white text-sm">
                A
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-xs text-base-900 leading-none">Empresa</div>
                <div className="font-display font-bold text-[0.625rem] tracking-widest text-accent leading-none mt-0.5">CATÁLOGO</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                    currentPage === item.page
                      ? 'text-accent'
                      : 'text-base-500 hover:text-base-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xs">
              <div className="relative w-full flex items-center h-8 bg-base-100/40 border border-accent/25 rounded-md overflow-hidden">
                <Search className="w-3.5 h-3.5 text-accent/50 mx-3 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="SKU, nome ou código OEM..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-base-900 placeholder-base-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-accent text-white text-xs font-medium uppercase tracking-widest hover:bg-accent-light transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative user-menu hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 px-2 py-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-accent" />
                    <ChevronDown className={`w-3.5 h-3.5 text-base-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-base-0 border border-accent/18 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {isAdmin && (
                          <button
                            onClick={() => {
                              onNavigate('admin');
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-base-600 hover:text-accent transition-colors"
                          >
                            Painel Administrativo
                          </button>
                        )}
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-base-600 hover:text-accent transition-colors"
                        >
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="hidden md:block text-xs font-medium text-base-500 hover:text-accent transition-colors"
                >
                  Entrar
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-base-0/90 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-smooth ${
          mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-surface border-b border-base-200">
          <div className="max-w-screen-2xl mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-500" />
              <input
                type="text"
                placeholder="Buscar por nome, SKU, OEM..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-accent/10 text-accent border-l-2 border-accent'
                      : 'text-base-600 hover:bg-base-100 hover:text-base-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
