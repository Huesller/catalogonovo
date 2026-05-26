import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Search, Star, Package } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminProducts, useAdminBrands, useAdminCategories } from '../../lib/hooks';
import type { ProductWithRelations } from '../../lib/database.types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

type FormData = {
  sku: string; name: string; slug: string; description: string;
  brand_id: string; category_id: string; price: string; weight: string;
  stock_quantity: string; min_order_qty: string; oem_codes: string;
  images: string; barcode: string; active: boolean; featured: boolean;
  technical_specs: string;
};

const emptyForm: FormData = {
  sku: '', name: '', slug: '', description: '', brand_id: '', category_id: '',
  price: '', weight: '', stock_quantity: '0', min_order_qty: '1',
  oem_codes: '', images: '', barcode: '', active: true, featured: false,
  technical_specs: '{}',
};

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminProducts() {
  const { products, loading, refetch } = useAdminProducts();
  const { brands } = useAdminBrands();
  const { categories } = useAdminCategories();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p: ProductWithRelations) => {
    setForm({
      sku: p.sku, name: p.name, slug: p.slug, description: p.description,
      brand_id: p.brand_id ?? '', category_id: p.category_id ?? '',
      price: String(p.price), weight: String(p.weight),
      stock_quantity: String(p.stock_quantity), min_order_qty: String(p.min_order_qty),
      oem_codes: (p.oem_codes ?? []).join(', '), images: (p.images ?? []).join('\n'),
      barcode: p.barcode, active: p.active, featured: p.featured,
      technical_specs: JSON.stringify(p.technical_specs ?? {}, null, 2),
    });
    setEditId(p.id);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm); };

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, slug: editId ? f.slug : slugify(name) }));
  };

  const handleSave = async () => {
    if (!form.sku || !form.name || !form.slug) return;
    setSaving(true);

    let specs = {};
    try { specs = JSON.parse(form.technical_specs); } catch { specs = {}; }

    const payload = {
      sku: form.sku.trim(), name: form.name.trim(), slug: form.slug.trim(),
      description: form.description,
      brand_id: form.brand_id || null, category_id: form.category_id || null,
      price: parseFloat(form.price) || 0,
      weight: parseFloat(form.weight) || 0,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      min_order_qty: parseInt(form.min_order_qty) || 1,
      oem_codes: form.oem_codes.split(',').map(s => s.trim()).filter(Boolean),
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      barcode: form.barcode, active: form.active, featured: form.featured,
      technical_specs: specs,
    };

    if (editId) {
      await supabase.from('products').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId);
    } else {
      await supabase.from('products').insert(payload);
    }

    setSaving(false);
    closeForm();
    refetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    setDeleteId(null);
    refetch();
  };

  const filtered = filter
    ? products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.sku.toLowerCase().includes(filter.toLowerCase())
      )
    : products;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Produtos</h1>
          <p className="text-gray-500 text-sm">{products.length} produtos cadastrados</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Filtrar por nome ou SKU..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {loading ? (
        <div className="py-20"><LoadingSpinner label="Carregando produtos..." /></div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  {['Produto', 'SKU', 'Marca', 'Categoria', 'Preço', 'Estoque', 'Status', 'Ações'].map(h => (
                    <th key={h} className="px-4 py-4 text-xs text-gray-500 font-semibold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <div className="text-white text-sm font-medium max-w-[180px] truncate">{product.name}</div>
                          {product.featured && (
                            <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                              <Star className="w-3 h-3" /> Destaque
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{product.sku}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{product.brands?.name ?? '-'}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{product.categories?.name ?? '-'}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">
                      {product.price > 0
                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)
                        : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={product.stock_quantity > 0 ? 'green' : 'red'} size="xs">
                        {product.stock_quantity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={product.active ? 'green' : 'red'} size="xs">
                        {product.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(product)} className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(product.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 rounded-t-2xl z-10">
              <h2 className="text-white font-semibold">{editId ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={closeForm} className="p-1 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">SKU*</label>
                  <input type="text" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Código de Barras</label>
                  <input type="text" value={form.barcode} onChange={e => setForm(f => ({ ...f, barcode: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Nome*</label>
                <input type="text" value={form.name} onChange={e => handleNameChange(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Slug*</label>
                <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Marca</label>
                  <select value={form.brand_id} onChange={e => setForm(f => ({ ...f, brand_id: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors">
                    <option value="">Sem marca</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Categoria</label>
                  <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors">
                    <option value="">Sem categoria</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Preço (R$)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Estoque</label>
                  <input type="number" value={form.stock_quantity} onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Peso (kg)</label>
                  <input type="number" step="0.01" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Códigos OEM (separados por vírgula)</label>
                <input type="text" value={form.oem_codes} onChange={e => setForm(f => ({ ...f, oem_codes: e.target.value }))}
                  placeholder="OEM001, OEM002, OEM003"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">URLs de Imagens (uma por linha)</label>
                <textarea value={form.images} onChange={e => setForm(f => ({ ...f, images: e.target.value }))}
                  rows={3} placeholder="https://..." className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none font-mono" />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Especificações Técnicas (JSON)</label>
                <textarea value={form.technical_specs} onChange={e => setForm(f => ({ ...f, technical_specs: e.target.value }))}
                  rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none font-mono" />
              </div>
              <div className="flex gap-6">
                {[
                  { key: 'active', label: 'Produto Ativo' },
                  { key: 'featured', label: 'Em Destaque' },
                ].map(toggle => (
                  <label key={toggle.key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm(f => ({ ...f, [toggle.key]: !f[toggle.key as keyof typeof f] }))}
                      className={`w-10 h-5 rounded-full transition-colors relative ${form[toggle.key as keyof typeof form] ? 'bg-amber-500' : 'bg-gray-700'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form[toggle.key as keyof typeof form] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-gray-400 text-sm">{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={closeForm} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-xl hover:border-gray-600 hover:text-white transition-colors text-sm">
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.sku || !form.name || !form.slug}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
              >
                {saving ? <div className="w-4 h-4 border-2 border-gray-700 border-t-gray-950 rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-semibold mb-2">Confirmar exclusão</h3>
            <p className="text-gray-500 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-xl hover:border-gray-600 hover:text-white transition-colors text-sm">
                Cancelar
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl transition-colors text-sm">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
