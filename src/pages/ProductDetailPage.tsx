import { useState } from 'react';
import {
  ArrowLeft, Tag, Package, Weight, Ruler, Hash, Car, ChevronRight,
  AlertCircle, CheckCircle, Copy, Check, Share2, Printer, Star, StarOff
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
  const [copiedSku, setCopiedSku] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'oem'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  const shareProduct = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const printProduct = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Carregando peça..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-gray-600" />
        <h2 className="text-white text-xl font-semibold">Peça não encontrada</h2>
        <button
          onClick={() => onNavigate('catalog')}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl transition-colors"
        >
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  const specs = Object.entries(product.technical_specs || {});
  const applications = product.vehicle_applications || [];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              Início
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
              Catálogo
            </button>
            {product.categories && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <button
                  onClick={() => onNavigate('catalog', { categoryId: product.category_id ?? '' })}
                  className="hover:text-white transition-colors"
                >
                  {product.categories.name}
                </button>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-300 truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
        </button>

        {/* Product header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden aspect-square mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-gray-700" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-amber-500' : 'border-gray-700 hover:border-gray-500'
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
            {/* Brand & Category */}
            <div className="flex items-center gap-3 mb-3">
              {product.brands && (
                <Badge variant="amber">{product.brands.name}</Badge>
              )}
              {product.categories && (
                <Badge variant="default">{product.categories.name}</Badge>
              )}
              {product.featured && (
                <Badge variant="amber">Destaque</Badge>
              )}
            </div>

            <h1 className="text-white text-3xl font-bold leading-snug mb-4">{product.name}</h1>

            {/* SKU */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-900 border border-gray-800 rounded-xl">
              <div className="flex items-center gap-2 flex-1">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400 text-sm">SKU:</span>
                <span className="text-white font-mono text-sm">{product.sku}</span>
              </div>
              <button
                onClick={() => copyToClipboard(product.sku)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg text-xs transition-colors"
              >
                {copiedSku ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSku ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            {product.description && (
              <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={shareProduct}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white rounded-lg text-sm transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                {copiedLink ? 'Link copiado!' : 'Compartilhar'}
              </button>
              <button
                onClick={printProduct}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white rounded-lg text-sm transition-colors"
              >
                <Printer className="w-4 h-4" /> Imprimir
              </button>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.price > 0 && (
                <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                  <div className="text-gray-500 text-xs mb-1">Preço</div>
                  <div className="text-white text-xl font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </div>
                </div>
              )}
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="text-gray-500 text-xs mb-1">Disponibilidade</div>
                <div className={`flex items-center gap-2 ${product.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold text-sm">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} un.` : 'Indisponível'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {product.weight > 0 && (
                <div className="flex items-center gap-2 p-3 bg-gray-900 border border-gray-800 rounded-lg">
                  <Weight className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-gray-600 text-xs">Peso</div>
                    <div className="text-gray-300 text-sm font-medium">{product.weight} kg</div>
                  </div>
                </div>
              )}
              {product.min_order_qty > 1 && (
                <div className="flex items-center gap-2 p-3 bg-gray-900 border border-gray-800 rounded-lg">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-gray-600 text-xs">Pedido mínimo</div>
                    <div className="text-gray-300 text-sm font-medium">{product.min_order_qty} un.</div>
                  </div>
                </div>
              )}
              {product.barcode && (
                <div className="flex items-center gap-2 p-3 bg-gray-900 border border-gray-800 rounded-lg col-span-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-gray-600 text-xs">Código de Barras</div>
                    <div className="text-gray-300 text-sm font-mono">{product.barcode}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products section */}
        {product.brands && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg font-semibold">Produtos da mesma marca</h3>
                <p className="text-gray-500 text-sm">Outras peças de {product.brands.name}</p>
              </div>
              <button
                onClick={() => onNavigate('catalog', { brandId: product.brand_id ?? '' })}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tabs: Specs / Applications / OEM */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-800">
            {[
              { key: 'specs', label: 'Especificações Técnicas' },
              { key: 'applications', label: `Aplicações (${applications.length})` },
              { key: 'oem', label: `Códigos OEM (${product.oem_codes?.length ?? 0})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? 'text-amber-400 border-amber-500'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div>
                {specs.length === 0 ? (
                  <p className="text-gray-600 text-sm">Nenhuma especificação técnica cadastrada.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specs.map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-800/50 border border-gray-800 rounded-xl">
                        <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">{key}</div>
                        <div className="text-white font-medium">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Physical dimensions */}
                {Object.keys(product.dimensions || {}).length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Ruler className="w-3.5 h-3.5" /> Dimensões
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(product.dimensions).map(([k, v]) => (
                        <div key={k} className="p-3 bg-gray-800/50 rounded-lg text-center">
                          <div className="text-gray-500 text-xs capitalize">{k}</div>
                          <div className="text-white font-medium text-sm">{v}</div>
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
                  <p className="text-gray-600 text-sm">Nenhuma aplicação cadastrada para esta peça.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-800">
                          {['Marca', 'Modelo', 'Ano Inicial', 'Ano Final', 'Motor', 'Observações'].map(h => (
                            <th key={h} className="pb-3 pr-4 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map(app => (
                          <tr key={app.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-gray-600" />
                                <span className="text-white text-sm font-medium">{app.make}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-gray-300 text-sm">{app.model}</td>
                            <td className="py-3 pr-4 text-gray-400 text-sm">{app.year_from ?? '-'}</td>
                            <td className="py-3 pr-4 text-gray-400 text-sm">{app.year_to ?? '-'}</td>
                            <td className="py-3 pr-4">
                              {app.engine && (
                                <Badge variant="default" size="xs">{app.engine}</Badge>
                              )}
                            </td>
                            <td className="py-3 text-gray-500 text-sm">{app.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* OEM Codes Tab */}
            {activeTab === 'oem' && (
              <div>
                {!product.oem_codes || product.oem_codes.length === 0 ? (
                  <p className="text-gray-600 text-sm">Nenhum código OEM cadastrado.</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {product.oem_codes.map(code => (
                      <button
                        key={code}
                        onClick={() => copyToClipboard(code)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 hover:border-amber-500/40 hover:bg-amber-500/5 rounded-xl text-sm font-mono text-gray-300 hover:text-amber-400 transition-all"
                      >
                        <Hash className="w-3.5 h-3.5 text-gray-600" />
                        {code}
                        <Copy className="w-3 h-3 text-gray-600 ml-1" />
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
