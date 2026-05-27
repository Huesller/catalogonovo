import { type ReactNode } from 'react';
import {
  LayoutDashboard, Package, Tag, Layers, LogOut, X, Menu, Layers as LogoIcon
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../lib/auth';

interface AdminLayoutProps {
  activeSection: string;
  onSection: (s: string) => void;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'products', label: 'Produtos', icon: Package },
  { key: 'brands', label: 'Marcas', icon: Tag },
  { key: 'categories', label: 'Categorias', icon: Layers },
];

export default function AdminLayout({ activeSection, onSection, onNavigate, children }: AdminLayoutProps) {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-0 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-base-0/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-surface border-r border-base-200 flex flex-col transition-transform duration-300 ease-smooth ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-base-200">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent via-accent-dark to-accent-muted flex items-center justify-center">
              <LogoIcon className="w-4 h-4 text-base-0" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-base-900 font-semibold text-sm tracking-tight">AUTOPARTS</span>
              <span className="block text-accent text-2xs tracking-widest font-medium mt-0.5">ADMIN</span>
            </div>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onSection(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-base-600 hover:bg-base-100 hover:text-base-900'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-base-200 space-y-1">
          <button
            onClick={() => onNavigate('catalog')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-600 hover:bg-base-100 hover:text-base-900 transition-colors"
          >
            <Package className="w-4 h-4" /> Ver Catálogo
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-600 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
          <div className="px-3 pt-3">
            <span className="text-base-500 text-xs">{user?.email}</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-surface border-b border-base-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-base-600 hover:text-base-900 hover:bg-base-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-base-900 font-semibold capitalize">{activeSection}</span>
        </div>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
