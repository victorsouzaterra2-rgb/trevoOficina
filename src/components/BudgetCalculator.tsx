import React, { useState } from 'react';
import { BudgetEstimate, BudgetItemDetail, VehicleData } from '../types';
import { 
  Calculator, 
  Car, 
  Wrench, 
  FileText, 
  Check, 
  Percent, 
  CreditCard, 
  QrCode, 
  Send, 
  Download,
  AlertCircle,
  Copy
} from 'lucide-react';

interface BudgetCalculatorProps {
  onBudgetCreated: (budget: BudgetEstimate) => void;
}

interface PackageTemplate {
  id: string;
  name: string;
  category: string;
  laborHours: number;
  parts: { name: string; category: 'peca' | 'fluido'; basePrice: number }[];
}

const PACKAGES: PackageTemplate[] = [
  {
    id: 'pkg-oleo',
    name: 'Troca de Óleo Sintético & 4 Filtros',
    category: 'Troca de Óleo',
    laborHours: 0.8,
    parts: [
      { name: '4 Litros de Óleo 100% Sintético API SP', category: 'fluido', basePrice: 240 },
      { name: 'Filtro de Óleo Blindado Original', category: 'peca', basePrice: 38 },
      { name: 'Filtro de Ar do Motor', category: 'peca', basePrice: 48 },
      { name: 'Filtro de Combustível Injeção', category: 'peca', basePrice: 35 },
      { name: 'Filtro de Cabine Ar-Condicionado', category: 'peca', basePrice: 42 }
    ]
  },
  {
    id: 'pkg-freios',
    name: 'Freios Dianteiros Completos (Pastilhas + Discos + Fluido)',
    category: 'Freios & ABS',
    laborHours: 1.5,
    parts: [
      { name: 'Jogo de Pastilhas Cerâmica Dianteiras', category: 'peca', basePrice: 260 },
      { name: 'Par de Discos de Freio Ventilados', category: 'peca', basePrice: 380 },
      { name: 'Fluido de Freio Bosch DOT 4 HP (1 Litro)', category: 'fluido', basePrice: 72 }
    ]
  },
  {
    id: 'pkg-suspensao',
    name: 'Suspensão Dianteira + Geometria 3D & Balanceamento',
    category: 'Suspensão',
    laborHours: 2.5,
    parts: [
      { name: 'Par de Amortecedores Dianteiros Pressurizados', category: 'peca', basePrice: 620 },
      { name: 'Kit Batentes e Coifas Guarda-Pó', category: 'peca', basePrice: 140 },
      { name: 'Par de Bieletas Estabilizadoras', category: 'peca', basePrice: 160 },
      { name: 'Serviço de Alinhamento 3D + Balanceamento 4 Rodas', category: 'peca', basePrice: 120 }
    ]
  },
  {
    id: 'pkg-correia',
    name: 'Correia Dentada, Tensor & Bomba d\'Água',
    category: 'Motor & Correias',
    laborHours: 3.5,
    parts: [
      { name: 'Kit Correia Dentada Sincronizadora Continental', category: 'peca', basePrice: 380 },
      { name: 'Rolamento Tensor Automático', category: 'peca', basePrice: 180 },
      { name: 'Bomba d\'Água Rolamento Blindado', category: 'peca', basePrice: 260 },
      { name: 'Aditivo Concentrado Orgânico Long Life (2L)', category: 'fluido', basePrice: 90 }
    ]
  },
  {
    id: 'pkg-embreagem',
    name: 'Substituição de Kit de Embreagem (LUK/Sachs)',
    category: 'Transmissão & Câmbio',
    laborHours: 4.0,
    parts: [
      { name: 'Platô e Disco de Embreagem Reforçado', category: 'peca', basePrice: 680 },
      { name: 'Atuador Hidráulico de Embreagem Central', category: 'peca', basePrice: 280 },
      { name: 'Óleo Sintético para Transmissão Manual (2L)', category: 'fluido', basePrice: 120 }
    ]
  }
];

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  onBudgetCreated
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-oleo');
  const [vehicleCategory, setVehicleCategory] = useState<'hatch' | 'sedan' | 'suv' | 'picape'>('sedan');
  
  // Multipliers for vehicle category (e.g. SUV and Picapes use larger parts / more fluids)
  const categoryMultipliers = {
    hatch: 1.0,
    sedan: 1.08,
    suv: 1.25,
    picape: 1.40
  };

  const [vehicle, setVehicle] = useState<VehicleData>({
    brand: 'Chevrolet',
    model: 'Onix Plus',
    year: '2022',
    plate: 'RTA-4B21',
    mileage: '40.000 km',
    engine: '1.0 Turbo'
  });

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [submittedBudget, setSubmittedBudget] = useState<BudgetEstimate | null>(null);
  const [copied, setCopied] = useState(false);

  const currentPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const multiplier = categoryMultipliers[vehicleCategory];
  const laborRate = 140; // R$ 140/hora técnica

  // Calculated values
  const laborCost = currentPackage.laborHours * laborRate;
  const partsCost = currentPackage.parts.reduce((sum, part) => {
    return sum + (part.basePrice * multiplier);
  }, 0);

  const subtotal = laborCost + partsCost;
  const pixDiscountPercent = 8;
  const pixTotal = subtotal * (1 - pixDiscountPercent / 100);
  const cardInstallment = subtotal / 10;

  const handleSendBudget = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim()) {
      alert('Por favor, informe seu nome e telefone WhatsApp para receber a cópia do orçamento.');
      return;
    }

    const itemsDetail: BudgetItemDetail[] = [
      ...currentPackage.parts.map(p => ({
        description: p.name,
        category: p.category,
        quantity: 1,
        unitPrice: p.basePrice * multiplier,
        totalPrice: p.basePrice * multiplier
      })),
      {
        description: `Mão de obra técnica especializada (${currentPackage.laborHours}h)`,
        category: 'mao_de_obra',
        quantity: currentPackage.laborHours,
        unitPrice: laborRate,
        totalPrice: laborCost
      }
    ];

    const randomNum = Math.floor(100 + Math.random() * 900);
    const protocol = `TRV-ORC-${randomNum}`;

    const newBudget: BudgetEstimate = {
      id: `bdg-${Date.now()}`,
      protocol,
      customerName: customer.name.trim(),
      customerPhone: customer.phone.trim(),
      customerEmail: customer.email.trim(),
      vehicle: {
        ...vehicle,
        model: `${vehicle.brand} ${vehicle.model} (${vehicleCategory.toUpperCase()})`
      },
      serviceCategory: currentPackage.category,
      items: itemsDetail,
      laborHours: currentPackage.laborHours,
      laborRate,
      subtotal,
      discountPercent: pixDiscountPercent,
      total: pixTotal,
      status: 'novo',
      createdAt: new Date().toISOString(),
      clientNotes: customer.notes.trim()
    };

    onBudgetCreated(newBudget);
    setSubmittedBudget(newBudget);
  };

  return (
    <section id="orcamento" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
            Simulador Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight mt-3">
            Faça um orçamento online instantâneo
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Calcule o valor exato de peças genuínas e horas de mão de obra técnica para o seu carro, com desconto no PIX e parcelamento no cartão.
          </p>
        </div>

        {submittedBudget ? (
          /* Submitted Confirmation Card */
          <div className="bg-white rounded-2xl border border-emerald-300 p-8 shadow-md text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-950">
              Orçamento Enviado com Sucesso!
            </h3>
            <p className="text-xs text-slate-600 mt-2">
              Nossa equipe de consultores técnicos analisará os detalhes do veículo e responderá via WhatsApp em minutos.
            </p>

            <div className="my-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500">Número do Orçamento:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  {submittedBudget.protocol}
                </span>
              </div>
              <div className="mt-3 text-xs text-slate-700 space-y-1">
                <div><strong>Cliente:</strong> {submittedBudget.customerName} ({submittedBudget.customerPhone})</div>
                <div><strong>Veículo:</strong> {submittedBudget.vehicle.model}</div>
                <div><strong>Pacote:</strong> {submittedBudget.serviceCategory}</div>
                <div><strong>Subtotal:</strong> R$ {submittedBudget.subtotal.toFixed(2)}</div>
                <div className="text-emerald-700 font-bold">
                  À vista no PIX ({submittedBudget.discountPercent}% off): R$ {submittedBudget.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?phone=5591983520888&text=Ol%C3%A1!%20Acabei%20de%20simular%20o%20or%C3%A7amento%20${submittedBudget.protocol}%20no%20site%20da%20Trevo%20para%20o%20${submittedBudget.vehicle.model}.%20Gostaria%20de%20confirmar%20a%20disponibilidade.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Conversar com Mecânico no WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmittedBudget(null)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold"
              >
                Simular Novo Orçamento
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Calculator Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Selectors */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step A: Category of Repair */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  1. Escolha o Pacote de Manutenção:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        selectedPackageId === pkg.id
                          ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[11px] font-semibold text-emerald-700 block">
                        {pkg.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                        {pkg.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Mão de obra: {pkg.laborHours}h
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step B: Vehicle Category */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  2. Categoria do seu veículo:
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'hatch', label: 'Hatch Compacto', desc: 'Onix, Gol, HB20, Polo' },
                    { id: 'sedan', label: 'Sedã', desc: 'Corolla, Civic, Virtus, Cronos' },
                    { id: 'suv', label: 'SUV / Crossover', desc: 'Compass, Creta, Tracker, T-Cross' },
                    { id: 'picape', label: 'Picape / Diesel', desc: 'Hilux, Toro, Ranger, S10' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setVehicleCategory(cat.id as any)}
                      className={`p-3 text-center rounded-xl border transition-all ${
                        vehicleCategory === cat.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Car className={`w-5 h-5 mx-auto mb-1.5 ${vehicleCategory === cat.id ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold block">{cat.label}</span>
                      <span className={`text-[10px] block mt-0.5 ${vehicleCategory === cat.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {cat.desc}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Montadora:</label>
                    <input
                      type="text"
                      value={vehicle.brand}
                      onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value })}
                      placeholder="Ex: Chevrolet"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Modelo:</label>
                    <input
                      type="text"
                      value={vehicle.model}
                      onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                      placeholder="Ex: Onix 1.0 Turbo"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Ano:</label>
                    <input
                      type="text"
                      value={vehicle.year}
                      onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                      placeholder="Ex: 2022"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step C: Customer Contact Info for fast dispatch */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  3. Seus dados para envio do orçamento formal:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Seu Nome:</label>
                    <input
                      type="text"
                      placeholder="Ex: Roberto Gomes"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">WhatsApp:</label>
                    <input
                      type="tel"
                      placeholder="Ex: (91) 98877-6655"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-600 block mb-1">Observações ou Sintomas:</label>
                    <input
                      type="text"
                      placeholder="Ex: barulho metálico ao passar em lombadas..."
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Real-Time Breakdown & Quotation Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl sticky top-28">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-display font-bold text-white text-base">
                      Demonstrativo do Orçamento
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    ABNT NBR 14754
                  </span>
                </div>

                {/* Package Selected info */}
                <div className="mt-4 pb-3 border-b border-slate-800/80">
                  <span className="text-xs text-slate-400">Serviço Escolhido:</span>
                  <div className="font-bold text-sm text-emerald-400 mt-0.5">
                    {currentPackage.name}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Para: {vehicle.brand} {vehicle.model} ({vehicleCategory.toUpperCase()})
                  </span>
                </div>

                {/* Parts Breakdown */}
                <div className="py-4 space-y-2 text-xs border-b border-slate-800/80">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Peças & Fluidos Homologados:
                  </div>
                  {currentPackage.parts.map((part, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-300">
                      <span className="truncate pr-2">{part.name}</span>
                      <span className="font-mono tabular-nums shrink-0">
                        R$ {(part.basePrice * multiplier).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800/60 font-semibold">
                    <span>Mão de Obra ({currentPackage.laborHours}h a R$ {laborRate}/h)</span>
                    <span className="font-mono tabular-nums">
                      R$ {laborCost.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Totals & Rules */}
                <div className="py-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Subtotal Tabela:</span>
                    <span className="font-mono line-through">R$ {subtotal.toFixed(2)}</span>
                  </div>

                  {/* PIX Best Offer */}
                  <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-xl">
                    <div className="flex items-center justify-between text-emerald-300 text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-emerald-400" />
                        <span>À vista no PIX ({pixDiscountPercent}% OFF):</span>
                      </span>
                      <span className="text-lg font-mono font-bold text-emerald-400">
                        R$ {pixTotal.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-500 block mt-1">
                      Economia real de R$ {(subtotal - pixTotal).toFixed(2)} com emissão imediata de NF
                    </span>
                  </div>

                  {/* Credit Card installment */}
                  <div className="flex justify-between items-center text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Ou no cartão de crédito:</span>
                    </span>
                    <span className="font-mono font-semibold">
                      10x de R$ {cardInstallment.toFixed(2)} sem juros
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSendBudget}
                  className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Orçamento para Aprovação da Oficina</span>
                </button>

                <p className="text-[10px] text-slate-500 text-center mt-3">
                  *Valores com validade de 10 dias. Garantia mínima de 90 dias em todas as intervenções conforme CDC.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
