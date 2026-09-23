import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Wrench, 
  Tag, 
  Check, 
  QrCode, 
  CreditCard, 
  Store, 
  ArrowRight,
  Copy
} from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onToggleInstall: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCreated: (order: Order) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onToggleInstall,
  onRemoveItem,
  onClearCart,
  onOrderCreated
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'instalacao' | 'entrega'>('instalacao');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao_credito' | 'balcao'>('pix');
  
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'TREVO10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      alert('Cupom inválido. Experimente usar "TREVO10" para 10% de desconto!');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim()) {
      alert('Por favor, preencha seu nome e telefone WhatsApp.');
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const protocol = `TRV-PED-${randomNum}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      protocol,
      customerName: customer.name.trim(),
      customerPhone: customer.phone.trim(),
      customerEmail: customer.email.trim(),
      items: [...items],
      subtotal,
      discount: discountAmount,
      total,
      deliveryType,
      paymentMethod,
      status: paymentMethod === 'pix' ? 'pago' : 'pendente',
      createdAt: new Date().toISOString()
    };

    onOrderCreated(newOrder);
    setCompletedOrder(newOrder);
    setCheckoutStep('success');
    onClearCart();
  };

  const resetAll = () => {
    setCheckoutStep('cart');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h3 className="font-display font-bold text-slate-900 text-lg">
              {checkoutStep === 'cart' && 'Seu Carrinho de Compras'}
              {checkoutStep === 'checkout' && 'Finalizar Compra'}
              {checkoutStep === 'success' && 'Pedido Confirmado!'}
            </h3>
          </div>
          <button
            onClick={resetAll}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-medium">Seu carrinho está vazio.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Navegue pela loja e adicione óleos, filtros e fluidos automotivos.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start">
                        <div className="pr-2">
                          <span className="text-[11px] font-semibold text-emerald-700 block">
                            {item.product.brand}
                          </span>
                          <span className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {item.product.volume}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remover produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Installation toggle */}
                      {item.product.installAvailable && (
                        <div 
                          onClick={() => onToggleInstall(item.product.id)}
                          className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 cursor-pointer text-[11px] text-emerald-800"
                        >
                          <input
                            type="checkbox"
                            checked={item.installAtWorkshop}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 text-emerald-600 rounded pointer-events-none"
                          />
                          <span className="flex items-center gap-1 font-medium">
                            <Wrench className="w-3 h-3 text-emerald-600" />
                            Instalação / Troca na Oficina Trevo (Incluso)
                          </span>
                        </div>
                      )}

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-slate-900 w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-slate-950">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Coupon section */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Cupom (use TREVO10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        disabled={couponApplied}
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs uppercase font-mono text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={couponApplied || !couponCode.trim()}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold"
                      >
                        {couponApplied ? 'Aplicado!' : 'Aplicar'}
                      </button>
                    </div>
                    {couponApplied && (
                      <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                        ✓ Desconto de 10% aplicado no pedido!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Mendes"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp para Contato / Notificação:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (91) 98112-3344"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-mail para comprovante:
                </label>
                <input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Delivery method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Forma de Atendimento / Recebimento:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'instalacao', label: 'Instalar na Oficina Trevo', desc: 'Troca de óleo imediata com checklist grátis' },
                    { id: 'retirada', label: 'Retirada no Balcão', desc: 'Alameda Imperial, 1.576 - Castanhal, PA' },
                    { id: 'entrega', label: 'Entrega Expressa Local', desc: 'Motoboy em até 2 horas em Castanhal' },
                  ].map((del) => (
                    <div
                      key={del.id}
                      onClick={() => setDeliveryType(del.id as any)}
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                        deliveryType === del.id
                          ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <strong className="block text-slate-900">{del.label}</strong>
                        <span className="text-[10px] text-slate-500">{del.desc}</span>
                      </div>
                      <span className="text-emerald-700 font-bold text-[11px]">
                        Grátis
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Forma de Pagamento:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pix', label: 'PIX', icon: QrCode },
                    { id: 'cartao_credito', label: 'Cartão', icon: CreditCard },
                    { id: 'balcao', label: 'Balcão', icon: Store },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-2.5 rounded-lg border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${
                          paymentMethod === pm.id
                            ? 'bg-slate-950 text-white border-slate-950'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && completedOrder && (
            <div className="text-center py-6 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-display font-bold text-slate-900">
                Pedido Registrado!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Seu pedido foi encaminhado para a equipe da Oficina Trevo.
              </p>

              <div className="my-5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Protocolo:</span>
                  <strong className="font-mono text-emerald-700">{completedOrder.protocol}</strong>
                </div>
                <div><strong>Cliente:</strong> {completedOrder.customerName}</div>
                <div><strong>Telefone:</strong> {completedOrder.customerPhone}</div>
                <div><strong>Modalidade:</strong> {completedOrder.deliveryType === 'instalacao' ? 'Instalação na Oficina' : 'Retirada no Balcão'}</div>
                <div><strong>Total:</strong> R$ {completedOrder.total.toFixed(2)}</div>
              </div>

              {completedOrder.paymentMethod === 'pix' && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mb-4 text-xs">
                  <span className="font-semibold text-emerald-900 block mb-1">
                    Chave PIX da Oficina Trevo (E-mail):
                  </span>
                  <div className="font-mono bg-white p-2 rounded border border-emerald-200 text-slate-800 flex items-center justify-between">
                    <span>contato@oficinatrevo.com.br</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('contato@oficinatrevo.com.br');
                        setCopiedPix(true);
                        setTimeout(() => setCopiedPix(false), 2000);
                      }}
                      className="text-emerald-700 hover:text-emerald-900 font-sans text-[11px] font-bold"
                    >
                      {copiedPix ? 'Copiado!' : 'Copiar Chave'}
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={resetAll}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl"
              >
                Concluir & Voltar ao Site
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono">R$ {subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Desconto Cupom ({discountPercent}%):</span>
                  <span className="font-mono">- R$ {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-slate-950 pt-1 border-t border-slate-200">
                <span>Total:</span>
                <span className="font-mono text-emerald-800">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-98 shadow-xs"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
                >
                  Voltar
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Finalizar Pedido (R$ {total.toFixed(2)})</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
