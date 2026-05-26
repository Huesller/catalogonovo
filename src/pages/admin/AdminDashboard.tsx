import { useEffect, useState } from 'react';
import { Package, Tag, Layers, TrendingUp, Star, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0, brands: 0, categories: 0, featured: 0, outOfStock: 0, active: 0,
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

  if (loading) return <div className="py-20"><LoadingSpinner label="Carregando dashboard..." /></div>;

  const cards = [
    { label: 'Total de Produtos', value: stats.products, icon: Package, color: 'amber' },
    { label: 'Marcas Cadastradas', value: stats.brands, icon: Tag, color: 'blue' },
    { label: 'Categorias', value: stats.categories, icon: Layers, color: 'green' },
    { label: 'Produtos em Destaque', value: stats.featured, icon: Star, color: 'amber' },
    { label: 'Produtos Ativos', value: stats.active, icon: TrendingUp, color: 'green' },
    { label: 'Sem Estoque', value: stats.outOfStock, icon: AlertTriangle, color: 'red' },
  ];

  const colorMap: Record<string, string> = {
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Visão geral do catálogo</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-gray-500 text-sm">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
