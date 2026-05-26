import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminCategories } from '../../lib/hooks';
import type { Category } from '../../lib/database.types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

const emptyForm = { name: '', slug: '', description: '', icon: '', parent_id: '' as string | null, active: true };

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminCategories() {
  const { categories, loading, refetch } = useAdminCategories();
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, icon: cat.icon, parent_id: cat.parent_id, active: cat.active });
    setEditId(cat.id);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm); };

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, slug: editId ? f.slug : slugify(name) }));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) return;
    setSaving(true);
    const payload = { ...form, parent_id: form.parent_id || null };
    if (editId) {
      await supabase.from('categories').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId);
    } else {
      await supabase.from('categories').insert(payload);
    }
    setSaving(false);
    closeForm();
    refetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('categories').delete().eq('id', id);
    setDeleteId(null);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">Categorias</h1>
          <p className="text-gray-500 text-sm">{categories.length} categorias cadastradas</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      {loading ? (
        <div className="py-20"><LoadingSpinner label="Carregando categorias..." /></div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                {['Nome', 'Slug', 'Ícone', 'Categoria Pai', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-5 py-4 text-xs text-gray-500 font-semibold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-white font-medium text-sm">{cat.name}</div>
                    {cat.description && (
                      <div className="text-gray-500 text-xs mt-0.5 max-w-xs truncate">{cat.description}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm font-mono">{cat.slug}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{cat.icon || '-'}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm">
                    {cat.parent_id
                      ? categories.find(c => c.id === cat.parent_id)?.name ?? '-'
                      : <span className="text-gray-600">Raiz</span>}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={cat.active ? 'green' : 'red'} size="xs">
                      {cat.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(cat.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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
              <h2 className="text-white font-semibold">{editId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
              <button onClick={closeForm} className="p-1 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Nome*', key: 'name', onChange: (v: string) => handleNameChange(v) },
                { label: 'Slug*', key: 'slug', onChange: (v: string) => setForm(f => ({ ...f, slug: v })) },
                { label: 'Ícone (nome Lucide)', key: 'icon', onChange: (v: string) => setForm(f => ({ ...f, icon: v })) },
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
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Categoria Pai</label>
                <select
                  value={form.parent_id ?? ''}
                  onChange={e => setForm(f => ({ ...f, parent_id: e.target.value || null }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="">Nenhuma (categoria raiz)</option>
                  {categories.filter(c => c.id !== editId).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
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
