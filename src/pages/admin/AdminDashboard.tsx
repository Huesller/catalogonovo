import { useEffect, useState } from 'react';
import { Package, Tag, Layers, TrendingUp, Star, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    categories: 0,
    featured: 0,
    outOfStock: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('brands').select('id', { count: 'exact', head: true }),
      supabase.from('categories').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('featured', true),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('stock_quantity', 0),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('active', true),
    ]).then(([p, b, c, f, o, a]) => {
      setStats({
        products: p.count ?? 0,
        brands: b.count ?? 0,
        categories: c.count ?? 0,
        featured: f.count ?? 0,
        outOfStock: o.count ?? 0,
        active: a.count ?? 0,
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-20"><LoadingSpinner label="Carregando..." /></div>;

  const cards = [
    { label: 'Total de Produtos', value: stats.products, icon: Package, variant: 'accent' },
    { label: 'Marcas Cadastradas', value: stats.brands, icon: Tag, variant: 'default' },
    { label: 'Categorias', value: stats.categories, icon: Layers, variant: 'default' },
    { label: 'Produtos em Destaque', value: stats.featured, icon: Star, variant: 'accent' },
    { label: 'Produtos Ativos', value: stats.active, icon: TrendingUp, variant: 'success' },
    { label: 'Sem Estoque', value: stats.outOfStock, icon: AlertTriangle, variant: 'error' },
  ];

  const variantStyles: Record<string, { bg: string; iconBg: string; iconText: string }> = {
    accent: { bg: 'bg-accent/5 border-accent/15', iconBg: 'bg-accent/10', iconText: 'text-accent' },
    default: { bg: 'bg-base-100 border-base-200', iconBg: 'bg-base-200', iconText: 'text-base-500' },
    success: { bg: 'bg-green-500/5 border-green-500/15', iconBg: 'bg-green-500/10', iconText: 'text-green-400' },
    error: { bg: 'bg-red-500/5 border-red-500/15', iconBg: 'bg-red-500/10', iconText: 'text-red-400' },
    warning: { bg: 'bg-amber-500/5 border-amber-500/15', iconBg: 'bg-amber-500/10', iconText: 'text-amber-400' },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-900 mb-1">Dashboard</h1>
        <p className="text-base-500 text-sm">Visão geral do catálogo</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(card => {
          const styles = variantStyles[card.variant];
          return (
            <div
              key={card.label}
              className={`rounded-xl p-5 border ${styles.bg} transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${styles.iconText}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-base-900 mb-1">{card.value}</div>
              <div className="text-sm text-base-500">{card.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
