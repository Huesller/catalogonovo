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
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500 ease-smooth ${
          scrolled
            ? 'bg-base-0/80 backdrop-blur-2xl border-b border-base-200/50 shadow-elevated'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-3.5 py-2"
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-accent-light via-accent to-accent-dark p-[1px]">
                <div className="absolute inset-0 rounded-lg bg-base-0" />
                <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center">
                  <Layers className="w-4 h-4 text-accent" strokeWidth={2.5} />
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-base-900 text-sm font-semibold tracking-tight leading-none">
                  AUTOPARTS
                </span>
                <span className="text-2xs font-medium tracking-[0.2em] text-accent leading-none mt-0.5">
                  CATALOG PRO
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              {navItems.map((item, i) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative px-4 py-5 text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-base-900'
                      : 'text-base-600 hover:text-base-800'
                  }`}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-t" />
                  )}
                </button>
              ))}
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-8">
              <div className="relative w-full group">
                <Search
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    searchFocused ? 'text-accent' : 'text-base-500'
                  }`}
                />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Buscar por nome, SKU, OEM..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="input-field pl-10 h-10 bg-base-50/80 border-base-200 text-sm"
                />
                <div
                  className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${
                    searchFocused
                      ? 'ring-1 ring-accent/30 shadow-glow'
                      : 'group-hover:border-base-300'
                  }`}
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {user ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-base-100 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/40 to-accent-dark/40 flex items-center justify-center ring-1 ring-accent/20">
                      <User className="w-4 h-4 text-accent-light" />
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm text-base-800 font-medium leading-none">
                        {user.email?.split('@')[0]}
                      </span>
                      <span className="text-2xs text-base-500 leading-none mt-0.5">
                        {isAdmin ? 'Administrador' : 'Usuário'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-base-500 transition-transform duration-200 ${
                        userMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 card-surface shadow-elevated animate-scale-in origin-top-right">
                      <div className="p-1.5">
                        {isAdmin && (
                          <button
                            onClick={() => {
                              onNavigate('admin');
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-700 hover:bg-base-100 hover:text-base-900 transition-colors"
                          >
                            <Settings className="w-4 h-4 text-base-500" />
                            <span>Painel Administrativo</span>
                          </button>
                        )}
                        <div className="my-1 h-px bg-base-200" />
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-700 hover:bg-base-100 hover:text-red-400 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-base-500" />
                          <span>Sair</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="btn-secondary"
                >
                  Entrar
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-base-100 text-base-600 hover:text-base-900 transition-colors"
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
