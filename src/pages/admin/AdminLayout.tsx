import { type ReactNode } from 'react';
import {
  LayoutDashboard, Package, Tag, Layers, LogOut, ChevronRight, X, Menu
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
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-60 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-800">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-950" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-xs leading-none">AUTOPARTS</div>
              <div className="text-amber-500 text-xs leading-none mt-0.5 font-medium">ADMIN</div>
            </div>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onSection(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === item.key
                  ? 'bg-amber-500/15 text-amber-400 font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {activeSection === item.key && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-800 space-y-0.5">
          <button
            onClick={() => onNavigate('catalog')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Package className="w-4 h-4" /> Ver Catálogo
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
          <div className="px-3 pt-2">
            <div className="text-gray-600 text-xs truncate">{user?.email}</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-white font-semibold text-sm capitalize">{activeSection}</span>
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
