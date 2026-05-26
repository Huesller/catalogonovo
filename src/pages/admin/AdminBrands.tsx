import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminBrands } from '../../lib/hooks';
import type { Brand } from '../../lib/database.types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

const emptyForm = { name: '', slug: '', country: '', description: '', logo_url: '', active: true };

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminBrands() {
  const { brands, loading, refetch } = useAdminBrands();
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (brand: Brand) => {
    setForm({ name: brand.name, slug: brand.slug, country: brand.country, description: brand.description, logo_url: brand.logo_url, active: brand.active });
    setEditId(brand.id);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm); };

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, slug: editId ? f.slug : slugify(name) }));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) return;
    setSaving(true);
    if (editId) {
      await supabase.from('brands').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId);
    } else {
      await supabase.from('brands').insert(form);
    }
    setSaving(false);
    closeForm();
    refetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('brands').delete().eq('id', id);
    setDeleteId(null);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Marcas</h1>
          <p className="text-gray-500 text-sm">{brands.length} marcas cadastradas</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Nova Marca
        </button>
      </div>

      {loading ? (
        <div className="py-20"><LoadingSpinner label="Carregando marcas..." /></div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                {['Nome', 'Slug', 'País', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-5 py-4 text-xs text-gray-500 font-semibold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map(brand => (
                <tr key={brand.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-white font-medium text-sm">{brand.name}</div>
                    {brand.description && (
                      <div className="text-gray-500 text-xs mt-0.5 max-w-xs truncate">{brand.description}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm font-mono">{brand.slug}</td>
                  <td className="px-5 py-4">
                    {brand.country && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Globe className="w-3.5 h-3.5 text-gray-600" /> {brand.country}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={brand.active ? 'green' : 'red'} size="xs">
                      {brand.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(brand)}
                        className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(brand.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-white font-semibold">{editId ? 'Editar Marca' : 'Nova Marca'}</h2>
              <button onClick={closeForm} className="p-1 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Nome*', key: 'name', onChange: (v: string) => handleNameChange(v) },
                { label: 'Slug*', key: 'slug', onChange: (v: string) => setForm(f => ({ ...f, slug: v })) },
                { label: 'País', key: 'country', onChange: (v: string) => setForm(f => ({ ...f, country: v })) },
                { label: 'URL do Logo', key: 'logo_url', onChange: (v: string) => setForm(f => ({ ...f, logo_url: v })) },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form] as string}
                    onChange={e => field.onChange(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Descrição</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? 'bg-amber-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-gray-400 text-sm">Ativo</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={closeForm} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-xl hover:border-gray-600 hover:text-white transition-colors text-sm">
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.slug}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
              >
                {saving ? <div className="w-4 h-4 border-2 border-gray-700 border-t-gray-950 rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-semibold mb-2">Confirmar exclusão</h3>
            <p className="text-gray-500 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 border border-gray-700 text-gray-400 rounded-xl hover:border-gray-600 hover:text-white transition-colors text-sm">
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
