import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { 
  ShoppingBag, 
  Check, 
  Search, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  Droplet,
  Wrench,
  AlertCircle
} from 'lucide-react';
import oilShowcaseImg from '../assets/images/oil_products_showcase_1790207376261.jpg';

interface ShopSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, installAtWorkshop: boolean) => void;
  onOpenCart: () => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onAddToCart,
  onOpenCart
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filters = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: '5W30', label: 'Óleos 5W30' },
    { id: '0W20', label: 'Óleos 0W20' },
    { id: '5W40', label: 'Óleos 5W40' },
    { id: '10W40', label: 'Óleos 10W40' },
    { id: 'filtro', label: 'Filtros' },
    { id: 'aditivo', label: 'Aditivos & Fluidos' },
  ];

  const filteredProducts = products.filter(product => {
    // Category or viscosity filter
    let matchesFilter = true;
    if (selectedFilter === 'filtro') {
      matchesFilter = product.category === 'filtro';
    } else if (selectedFilter === 'aditivo') {
      matchesFilter = product.category === 'aditivo' || product.category === 'fluido_freio';
    } else if (selectedFilter !== 'todos') {
      matchesFilter = product.viscosity === selectedFilter;
    }

    // Search query
    const matchesSearch = searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.specification && product.specification.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product, 1, true);
    setAddedToast(`"${product.name}" adicionado ao carrinho!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <section id="loja" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner with Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white mb-12 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 border border-emerald-800/80 px-3 py-1 rounded-md">
                Loja de Lubrificantes & Peças
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-3">
                Óleos 100% Genuínos & Troca Técnica na Oficina
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
                Compre o lubrificante exato para o motor do seu carro (Castrol, Motul, Mobil, Shell, Lubrax). Na compra do kit de óleo com a Trevo, você pode optar pela instalação na oficina com mão de obra especializada.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Lacrados e com Nota Fiscal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span>Troca com descarte ecológico</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full relative min-h-[280px]">
              <img
                src={oilShowcaseImg}
                alt="Vitrine de óleos para motor da Oficina Trevo"
                className="w-full h-full object-cover object-center opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
            </div>

          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedFilter === f.id
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por marca, viscosidade, norma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 hover:border-slate-300 group"
            >
              <div>
                {/* Brand & Volume line */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-800 tracking-wide">
                    {product.brand}
                  </span>
                  <span className="text-slate-400">{product.volume}</span>
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-slate-950 text-base leading-snug group-hover:text-emerald-700 transition-colors mb-1.5">
                  {product.name}
                </h3>

                {/* Specs */}
                {product.viscosity && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                    <Droplet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Viscosidade: <strong className="text-slate-900">{product.viscosity}</strong></span>
                    {product.oilType && <span>· {product.oilType}</span>}
                  </div>
                )}

                {product.specification && (
                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-3 bg-slate-50 px-2 py-1 rounded border border-slate-100 font-mono">
                    {product.specification}
                  </p>
                )}

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>
              </div>

              {/* Price & Buy Button */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through block leading-none">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xl font-mono font-bold text-slate-950">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>

                  <span className={`text-[11px] font-semibold ${product.stock > 10 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={product.stock <= 0}
                  onClick={() => handleAdd(product)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{addedToast}</span>
          <button
            onClick={onOpenCart}
            className="ml-2 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded"
          >
            Ver Carrinho
          </button>
        </div>
      )}
    </section>
  );
};
