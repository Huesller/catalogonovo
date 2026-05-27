import { useState } from 'react';
import {
  ArrowLeft, Package, Weight, Hash, Car, ChevronRight,
  AlertCircle, CheckCircle, Copy, Check, Share2, Printer, Ruler,
} from 'lucide-react';
import { useProduct } from '../lib/hooks';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Badge from '../components/ui/Badge';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProductDetailPage({ slug, onNavigate }: ProductDetailPageProps) {
  const { product, loading } = useProduct(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'oem'>('specs');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-0 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Carregando peça..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-0 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-base-400" />
        </div>
        <h2 className="text-xl font-semibold text-base-900">Peça não encontrada</h2>
        <button onClick={() => onNavigate('catalog')} className="btn-primary mt-2">
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  const specs = Object.entries(product.technical_specs || {});
  const applications = product.vehicle_applications || [];
  const oemCodes = product.oem_codes || [];

  return (
    <div className="min-h-screen bg-base-0">
      {/* Breadcrumb */}
      <div className="bg-surface raised border-b border-base-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-base-500 overflow-x-auto">
            <button onClick={() => onNavigate('home')} className="hover:text-base-900 transition-colors whitespace-nowrap">
              Início
            </button>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <button onClick={() => onNavigate('catalog')} className="hover:text-base-900 transition-colors whitespace-nowrap">
              Catálogo
            </button>
            {product.categories && (
              <>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                <button
                  onClick={() => onNavigate('catalog', { categoryId: product.category_id ?? '' })}
                  className="hover:text-base-900 transition-colors whitespace-nowrap"
                >
                  {product.categories.name}
                </button>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-base-700 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 text-sm text-base-500 hover:text-base-900 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Voltar ao catálogo</span>
        </button>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="card-surface rounded-2xl overflow-hidden aspect-square mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-base-100">
                  <Package className="w-24 h-24 text-base-400" strokeWidth={1} />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      activeImage === i
                        ? 'border-accent shadow-glow'
                        : 'border-base-200 hover:border-base-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              {product.brands && (
                <Badge variant="accent">{product.brands.name}</Badge>
              )}
              {product.categories && (
                <Badge variant="default">{product.categories.name}</Badge>
              )}
              {product.featured && (
                <Badge variant="accent">Destaque</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-base-900 leading-tight mb-6">
              {product.name}
            </h1>

            {/* SKU Card */}
            <div className="card-surface rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-base-100 flex items-center justify-center">
                  <Hash className="w-5 h-5 text-base-500" />
                </div>
                <div>
                  <div className="text-xs text-base-500">SKU</div>
                  <div className="text-base-900 font-mono font-medium">{product.sku}</div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(product.sku, 'sku')}
                className="btn-secondary text-xs"
              >
                {copiedField === 'sku' ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-base-600 leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => copyToClipboard(window.location.href, 'link')}
                className="btn-secondary"
              >
                {copiedField === 'link' ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" /> Link copiado
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" /> Compartilhar
                  </>
                )}
              </button>
              <button onClick={() => window.print()} className="btn-secondary">
                <Printer className="w-4 h-4" /> Imprimir
              </button>
            </div>

            {/* Price & Stock Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.price > 0 && (
                <div className="card-surface rounded-xl p-5">
                  <div className="text-xs text-base-500 mb-1">Preço</div>
                  <div className="text-2xl font-bold text-base-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </div>
                </div>
              )}
              <div className="card-surface rounded-xl p-5">
                <div className="text-xs text-base-500 mb-2">Disponibilidade</div>
                <div className={`flex items-center gap-2 ${product.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} unidades` : 'Indisponível'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3">
              {product.weight > 0 && (
                <div className="card-surface rounded-lg p-4 flex items-start gap-3">
                  <Weight className="w-5 h-5 text-base-500 mt-0.5" />
                  <div>
                    <div className="text-2xs text-base-500 mb-0.5">Peso</div>
                    <div className="text-base-900 font-medium">{product.weight} kg</div>
                  </div>
                </div>
              )}
              {product.min_order_qty > 1 && (
                <div className="card-surface rounded-lg p-4 flex items-start gap-3">
                  <Hash className="w-5 h-5 text-base-500 mt-0.5" />
                  <div>
                    <div className="text-2xs text-base-500 mb-0.5">Pedido mínimo</div>
                    <div className="text-base-900 font-medium">{product.min_order_qty} un.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card-surface rounded-2xl overflow-hidden">
          <div className="flex border-b border-base-200 overflow-x-auto">
            {[
              { key: 'specs', label: 'Especificações' },
              { key: 'applications', label: `Aplicações (${applications.length})` },
              { key: 'oem', label: `Códigos OEM (${oemCodes.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'text-accent border-accent'
                    : 'text-base-500 border-transparent hover:text-base-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div>
                {specs.length === 0 ? (
                  <p className="text-base-500 text-sm">Nenhuma especificação técnica cadastrada.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specs.map(([key, value]) => (
                      <div key={key} className="p-4 bg-base-100 rounded-xl">
                        <div className="text-2xs text-base-500 uppercase tracking-wider mb-1">{key}</div>
                        <div className="text-base-900 font-medium">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {Object.keys(product.dimensions || {}).length > 0 && (
                  <div className="mt-8 pt-8 border-t border-base-200">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-base-900 mb-4">
                      <Ruler className="w-4 h-4 text-base-500" />
                      Dimensões
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(product.dimensions).map(([k, v]) => (
                        <div key={k} className="p-4 bg-base-100 rounded-lg text-center">
                          <div className="text-2xs text-base-500 capitalize">{k}</div>
                          <div className="text-base-900 font-medium mt-1">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                {applications.length === 0 ? (
                  <p className="text-base-500 text-sm">Nenhuma aplicação cadastrada.</p>
                ) : (
                  <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-base-200">
                          {['Marca', 'Modelo', 'Ano Início', 'Ano Fim', 'Motor', 'Obs'].map(h => (
                            <th key={h} className="pb-3 px-6 sm:px-4 first:pl-6 sm:first:pl-4 last:pr-6 sm:last:pr-4 text-left text-2xs text-base-500 font-semibold uppercase tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map(app => (
                          <tr key={app.id} className="border-b border-base-200/50 hover:bg-base-100 transition-colors">
                            <td className="py-3 px-6 sm:px-4 first:pl-6 sm:first:pl-4">
                              <div className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-base-500" />
                                <span className="text-base-900 font-medium">{app.make}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-base-700">{app.model}</td>
                            <td className="py-3 px-4 text-base-600">{app.year_from ?? '-'}</td>
                            <td className="py-3 px-4 text-base-600">{app.year_to ?? '-'}</td>
                            <td className="py-3 px-4">
                              {app.engine && <Badge variant="default" size="xs">{app.engine}</Badge>}
                            </td>
                            <td className="py-3 px-4 text-base-500 text-sm">{app.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* OEM Tab */}
            {activeTab === 'oem' && (
              <div>
                {oemCodes.length === 0 ? (
                  <p className="text-base-500 text-sm">Nenhum código OEM cadastrado.</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {oemCodes.map(code => (
                      <button
                        key={code}
                        onClick={() => copyToClipboard(code, `oem-${code}`)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-200 ${
                          copiedField === `oem-${code}`
                            ? 'bg-accent text-base-0'
                            : 'bg-base-100 border border-base-200 text-base-700 hover:border-accent/40 hover:text-accent'
                        }`}
                      >
                        <Hash className="w-3.5 h-3.5" />
                        <span>{code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
