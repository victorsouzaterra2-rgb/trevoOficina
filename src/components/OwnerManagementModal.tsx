import React, { useState } from 'react';
import { 
  WorkOrder, 
  Appointment, 
  BudgetEstimate, 
  Product, 
  Order, 
  WorkshopSettings,
  WorkOrderStatus
} from '../types';
import { 
  Lock, 
  X, 
  BarChart3, 
  Wrench, 
  Calendar, 
  FileText, 
  Package, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Check, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Truck, 
  Trash2, 
  Printer, 
  ArrowRight,
  TrendingUp,
  Layers,
  LogOut,
  ExternalLink
} from 'lucide-react';

interface OwnerManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrders: WorkOrder[];
  appointments: Appointment[];
  budgets: BudgetEstimate[];
  products: Product[];
  orders: Order[];
  settings: WorkshopSettings;
  onUpdateWorkOrderStatus: (id: string, newStatus: WorkOrderStatus) => void;
  onAddWorkOrder: (order: WorkOrder) => void;
  onUpdateAppointmentStatus: (id: string, status: any) => void;
  onConvertAppointmentToOS: (appointment: Appointment) => void;
  onUpdateProductStock: (id: string, newStock: number) => void;
  onUpdateProductPrice: (id: string, newPrice: number) => void;
  onAddNewProduct: (product: Product) => void;
  onUpdateSettings: (newSettings: WorkshopSettings) => void;
}

export const OwnerManagementModal: React.FC<OwnerManagementModalProps> = ({
  isOpen,
  onClose,
  workOrders,
  appointments,
  budgets,
  products,
  orders,
  settings,
  onUpdateWorkOrderStatus,
  onAddWorkOrder,
  onUpdateAppointmentStatus,
  onConvertAppointmentToOS,
  onUpdateProductStock,
  onUpdateProductPrice,
  onAddNewProduct,
  onUpdateSettings
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'os' | 'agendamentos' | 'orcamentos' | 'estoque' | 'pedidos' | 'config'>('dashboard');

  // New OS form state
  const [showNewOSModal, setShowNewOSModal] = useState<boolean>(false);
  const [newOS, setNewOS] = useState({
    customerName: '',
    customerPhone: '',
    brand: 'Chevrolet',
    model: '',
    year: '2022',
    plate: '',
    mileage: '',
    mechanic: 'Mestre Roberto Silva',
    bay: 'Elevador 1 (Hidráulico)',
    services: 'Revisão e Troca de Óleo',
    laborTotal: 180,
    partsTotal: 250,
    notes: ''
  });

  // New Product form state
  const [showNewProductModal, setShowNewProductModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'oleo_motor' as any,
    viscosity: '5W30',
    volume: '1 Litro',
    price: 65,
    stock: 20,
    minStock: 10,
    description: ''
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'trevo2026' || passwordInput === 'admin' || passwordInput === 'dono') {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleDemoAccess = () => {
    setPasswordInput('trevo2026');
    setIsAuthenticated(true);
    setPasswordError(false);
  };

  // KPIs
  const totalRevenue = workOrders.reduce((sum, wo) => sum + wo.total, 0) + 
    orders.reduce((sum, ord) => sum + ord.total, 0);
  
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'pendente').length;
  const activeOSCount = workOrders.filter(wo => wo.status === 'em_execucao' || wo.status === 'aguardando_pecas' || wo.status === 'triagem').length;
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  const handleCreateOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOS.customerName || !newOS.plate) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const createdWO: WorkOrder = {
      id: `os-${Date.now()}`,
      protocol: `TRV-${randomNum}`,
      customerName: newOS.customerName,
      customerPhone: newOS.customerPhone,
      vehicle: {
        brand: newOS.brand,
        model: newOS.model,
        year: newOS.year,
        plate: newOS.plate.toUpperCase(),
        mileage: newOS.mileage || '40.000 km'
      },
      mechanic: newOS.mechanic,
      bay: newOS.bay,
      status: 'em_execucao',
      diagnosticNotes: newOS.notes || 'Entrada manual registrada pelo gestor.',
      servicesPerformed: [newOS.services],
      partsUsed: [
        { name: 'Peças e insumos gerais da oficina', quantity: 1, unitPrice: Number(newOS.partsTotal) }
      ],
      laborTotal: Number(newOS.laborTotal),
      partsTotal: Number(newOS.partsTotal),
      total: Number(newOS.laborTotal) + Number(newOS.partsTotal),
      entryDate: new Date().toISOString(),
      expectedDate: new Date(Date.now() + 86400000).toISOString(),
      checklist: [
        { item: 'Nível de óleo do motor', checked: true, condition: 'ok' },
        { item: 'Fluido de freio', checked: true, condition: 'ok' },
        { item: 'Suspensão e amortecedores', checked: true, condition: 'ok' }
      ]
    };

    onAddWorkOrder(createdWO);
    setShowNewOSModal(false);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.brand) {
      alert('Preencha o nome e a marca do produto.');
      return;
    }

    const createdProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      viscosity: newProduct.viscosity,
      volume: newProduct.volume,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock),
      description: newProduct.description || 'Produto homologado cadastrado pelo proprietário.',
      installAvailable: true
    };

    onAddNewProduct(createdProduct);
    setShowNewProductModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Header of Management Area */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base">
                  Painel de Gestão da Oficina Trevo
                </h3>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Exclusivo Dono
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Alameda Imperial, 1.576 · Castanhal - PA · Operações & Estoque
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg flex items-center gap-1 transition-colors"
                title="Sair do modo administrador"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desconectar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If not authenticated: Login Gate */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full shadow-lg text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-display font-bold text-slate-900">
                Acesso Restrito ao Proprietário
              </h4>
              <p className="text-xs text-slate-600 mt-1 mb-6">
                Digite a senha de administrador da Oficina Mecânica Trevo para gerenciar ordens de serviço, agendamentos e faturamento.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Digite a senha do dono..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 text-center tracking-widest focus:ring-1 focus:ring-emerald-500"
                  />
                  {passwordError && (
                    <span className="text-xs text-rose-600 font-medium block mt-1">
                      Senha incorreta. (Tente: trevo2026)
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  Entrar no Painel do Dono
                </button>
              </form>

              {/* Instant 1-click Demo helper for easy reviewing */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDemoAccess}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline"
                >
                  Acesso Rápido de Demonstração (1 clique)
                </button>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  (Senha padrão de fábrica configurada: <strong className="font-mono">trevo2026</strong>)
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Management Interface */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-white border-r border-slate-200 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 p-3 gap-1">
              {[
                { id: 'dashboard', label: 'Dashboard & Elevadores', icon: BarChart3 },
                { id: 'os', label: `Ordens de Serviço (${workOrders.length})`, icon: Wrench },
                { id: 'agendamentos', label: `Agendamentos (${pendingAppointmentsCount})`, icon: Calendar, badge: pendingAppointmentsCount },
                { id: 'orcamentos', label: `Orçamentos (${budgets.length})`, icon: FileText },
                { id: 'estoque', label: `Estoque de Óleos (${lowStockCount} alertas)`, icon: Package, alert: lowStockCount > 0 },
                { id: 'pedidos', label: `Vendas Loja (${orders.length})`, icon: ShoppingBag },
                { id: 'config', label: 'Dados da Oficina', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.alert && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 block">Faturamento Previsto:</span>
                      <span className="text-xl font-mono font-bold text-slate-950 mt-1 block">
                        R$ {totalRevenue.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        OS Ativas + Vendas Loja
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 block">Carros na Oficina:</span>
                      <span className="text-xl font-mono font-bold text-slate-950 mt-1 block">
                        {activeOSCount} veículos
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Em 4 elevadores hidráulicos
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 block">Agendamentos Pendentes:</span>
                      <span className="text-xl font-mono font-bold text-emerald-700 mt-1 block">
                        {pendingAppointmentsCount} novos
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Aguardando confirmação
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500 block">Itens com Estoque Baixo:</span>
                      <span className={`text-xl font-mono font-bold mt-1 block ${lowStockCount > 0 ? 'text-amber-600' : 'text-slate-950'}`}>
                        {lowStockCount} produtos
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Abaixo do mínimo
                      </span>
                    </div>
                  </div>

                  {/* Elevators Live Workshop Status */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-display font-bold text-slate-900 text-sm">
                          Status dos 4 Elevadores Mecânicos (Tempo Real)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Ocupação do galpão principal em Castanhal
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Capacidade Nominal: 4 Box
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { 
                          name: 'Elevador 1 (Troca Rápida)', 
                          status: 'Ocupado', 
                          car: 'Onix Plus (RTA-4B21)', 
                          mechanic: 'Mestre Roberto Silva',
                          service: 'Troca de Óleo Mobil 0W20',
                          badgeColor: 'bg-emerald-600 text-white'
                        },
                        { 
                          name: 'Elevador 2 (Geometria & Suspensão)', 
                          status: 'Aguardando Peça', 
                          car: 'Jeep Compass (QEO-7J89)', 
                          mechanic: 'André Costa',
                          service: 'Bandeja dianteira & bieletas',
                          badgeColor: 'bg-amber-500 text-white'
                        },
                        { 
                          name: 'Elevador 3 (Freios & ABS)', 
                          status: 'Livre / Disponível', 
                          car: 'Nenhum carro no momento', 
                          mechanic: 'Aguardando próxima entrada',
                          service: 'Box desimpedido',
                          badgeColor: 'bg-slate-200 text-slate-800'
                        },
                        { 
                          name: 'Elevador 4 (Motor & Câmbio)', 
                          status: 'Concluído / Liberando', 
                          car: 'Gol 1.6 MSI (QDM-3412)', 
                          mechanic: 'Marcos Vinicius',
                          service: 'Correia dentada trocada',
                          badgeColor: 'bg-blue-600 text-white'
                        }
                      ].map((box, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
                          <div className="flex items-center justify-between text-xs font-semibold mb-2">
                            <span className="text-slate-800 font-bold">{box.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${box.badgeColor}`}>
                              {box.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-700">
                            <strong>{box.car}</strong>
                            <p className="text-[11px] text-slate-500 mt-0.5">{box.service}</p>
                            <span className="text-[10px] text-slate-400 block mt-2">
                              Técnico: {box.mechanic}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fast Action Shortcuts */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setShowNewOSModal(true)}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Abrir Nova Ordem de Serviço (OS)</span>
                    </button>

                    <button
                      onClick={() => setShowNewProductModal(true)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cadastrar Novo Produto / Óleo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDENS DE SERVIÇO (OS) */}
              {activeTab === 'os' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base">
                        Ordens de Serviço em Andamento
                      </h4>
                      <p className="text-xs text-slate-500">
                        Altere o status para atualizar automaticamente o rastreamento do cliente
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewOSModal(true)}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nova OS</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {workOrders.map((wo) => (
                      <div
                        key={wo.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-800 text-sm">
                              {wo.protocol}
                            </span>
                            <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded">
                              {wo.vehicle.plate}
                            </span>
                            <span className="text-xs text-slate-500">· {wo.vehicle.brand} {wo.vehicle.model}</span>
                          </div>

                          <div className="text-xs text-slate-600">
                            <strong>Cliente:</strong> {wo.customerName} ({wo.customerPhone}) · <strong>Mecânico:</strong> {wo.mechanic}
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {wo.diagnosticNotes}
                          </p>
                        </div>

                        {/* Status selector & Financial value */}
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block uppercase">Total OS:</span>
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              R$ {wo.total.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <select
                              value={wo.status}
                              onChange={(e) => onUpdateWorkOrderStatus(wo.id, e.target.value as any)}
                              className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="triagem">Triagem</option>
                              <option value="aguardando_aprovacao">Aguardando Aprovação</option>
                              <option value="aguardando_pecas">Aguardando Peças</option>
                              <option value="em_execucao">Em Execução</option>
                              <option value="teste_rodagem">Teste de Rodagem</option>
                              <option value="pronto">Pronto para Retirada</option>
                              <option value="entregue">Entregue / Concluído</option>
                            </select>

                            <button
                              onClick={() => {
                                window.print();
                              }}
                              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                              title="Imprimir Ordem de Serviço"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: AGENDAMENTOS */}
              {activeTab === 'agendamentos' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      Agendamentos Solicitados no Site
                    </h4>
                    <p className="text-xs text-slate-500">
                      Confirme os pedidos e transforme em Ordem de Serviço (OS) com 1 clique
                    </p>
                  </div>

                  <div className="space-y-3">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-800 text-sm">{apt.protocol}</span>
                            <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-bold">{apt.vehicle.plate}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              apt.status === 'confirmado' ? 'bg-emerald-100 text-emerald-800' :
                              apt.status === 'pendente' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {apt.status}
                            </span>
                          </div>

                          <div className="text-xs text-slate-700">
                            <strong>{apt.customerName}</strong> ({apt.customerPhone}) · {apt.vehicle.brand} {apt.vehicle.model}
                          </div>

                          <div className="text-xs text-slate-500">
                            <span>Data solicitada: <strong>{apt.preferredDate} às {apt.preferredTime}h</strong></span>
                            {apt.notes && <span> · Obs: "{apt.notes}"</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {apt.status === 'pendente' && (
                            <button
                              onClick={() => onUpdateAppointmentStatus(apt.id, 'confirmado')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Confirmar</span>
                            </button>
                          )}

                          <button
                            onClick={() => onConvertAppointmentToOS(apt)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                          >
                            <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Gerar OS na Oficina</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ORÇAMENTOS */}
              {activeTab === 'orcamentos' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      Orçamentos Recebidos pelo Simulador
                    </h4>
                    <p className="text-xs text-slate-500">
                      Propostas calculadas pelos clientes através do simulador de orçamento
                    </p>
                  </div>

                  <div className="space-y-3">
                    {budgets.map((bdg) => (
                      <div
                        key={bdg.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-800 text-sm">{bdg.protocol}</span>
                            <span className="text-xs font-semibold text-slate-800">{bdg.serviceCategory}</span>
                            <span className="text-xs text-slate-400">· {bdg.vehicle.model}</span>
                          </div>

                          <div className="text-xs text-slate-700">
                            Cliente: <strong>{bdg.customerName}</strong> ({bdg.customerPhone})
                          </div>

                          {bdg.clientNotes && (
                            <p className="text-[11px] text-slate-500 italic">
                              "{bdg.clientNotes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">Total com desc. PIX:</span>
                            <span className="font-mono font-bold text-emerald-700 text-sm">
                              R$ {bdg.total.toFixed(2)}
                            </span>
                          </div>

                          <a
                            href={`https://api.whatsapp.com/send?phone=55${bdg.customerPhone.replace(/\D/g, '')}&text=Ol%C3%A1%20${encodeURIComponent(bdg.customerName)}%2C%20aqui%20%C3%A9%20da%20Oficina%20Mec%C3%A2nica%20Trevo%20referente%20ao%20seu%20or%C3%A7amento%20${bdg.protocol}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Responder</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ESTOQUE DE ÓLEOS E PEÇAS */}
              {activeTab === 'estoque' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base">
                        Controle de Estoque & Lubrificantes
                      </h4>
                      <p className="text-xs text-slate-500">
                        Gerencie quantidades em prateleira e preços de venda
                      </p>
                    </div>

                    <button
                      onClick={() => setShowNewProductModal(true)}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar Produto</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Produto</th>
                          <th className="py-3 px-4">Marca</th>
                          <th className="py-3 px-4">Viscosidade / Tipo</th>
                          <th className="py-3 px-4">Estoque Atual</th>
                          <th className="py-3 px-4">Preço (R$)</th>
                          <th className="py-3 px-4 text-right">Ajuste Rápido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((prod) => {
                          const isLow = prod.stock <= prod.minStock;
                          return (
                            <tr key={prod.id} className="hover:bg-slate-50/70">
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {prod.name}
                                {isLow && (
                                  <span className="ml-2 text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
                                    Estoque Baixo
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-slate-600">{prod.brand}</td>
                              <td className="py-3 px-4 font-mono text-slate-700">{prod.viscosity || 'Insumo'}</td>
                              <td className="py-3 px-4 font-mono font-bold">
                                <span className={isLow ? 'text-amber-600' : 'text-slate-900'}>
                                  {prod.stock} un
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-slate-900">
                                R$ {prod.price.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    onClick={() => onUpdateProductStock(prod.id, Math.max(0, prod.stock - 1))}
                                    className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                                    title="Diminuir 1"
                                  >
                                    -
                                  </button>
                                  <button
                                    onClick={() => onUpdateProductStock(prod.id, prod.stock + 6)}
                                    className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px]"
                                    title="Adicionar caixa (+6)"
                                  >
                                    +6
                                  </button>
                                  <button
                                    onClick={() => onUpdateProductStock(prod.id, prod.stock + 12)}
                                    className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px]"
                                    title="Adicionar caixa (+12)"
                                  >
                                    +12
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: VENDAS LOJA */}
              {activeTab === 'pedidos' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      Pedidos Realizados na Loja Online
                    </h4>
                    <p className="text-xs text-slate-500">
                      Vendas de óleos, filtros e fluidos com retirada ou instalação
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                      Nenhum pedido de venda registrado até o momento.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-emerald-800">{ord.protocol}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                                {ord.status}
                              </span>
                            </div>
                            <div className="mt-1 text-slate-700">
                              <strong>{ord.customerName}</strong> ({ord.customerPhone}) · {ord.deliveryType === 'instalacao' ? 'Instalar na Oficina' : 'Retirada no Balcão'}
                            </div>
                            <div className="text-slate-500 text-[11px] mt-0.5">
                              {ord.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-slate-400 block text-[10px]">TOTAL:</span>
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              R$ {ord.total.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-500 block uppercase font-medium">
                              Via {ord.paymentMethod}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: CONFIGURAÇÕES */}
              {activeTab === 'config' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-2xl space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-base">
                    Configurações Gerais da Oficina Trevo
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Nome da Oficina:</label>
                      <input
                        type="text"
                        value={settings.shopName}
                        onChange={(e) => onUpdateSettings({ ...settings, shopName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Telefone Fixo:</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => onUpdateSettings({ ...settings, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">WhatsApp da Oficina:</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => onUpdateSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Valor Hora Técnica (R$/h):</label>
                      <input
                        type="number"
                        value={settings.laborHourlyRate}
                        onChange={(e) => onUpdateSettings({ ...settings, laborHourlyRate: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Endereço Completo:</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => onUpdateSettings({ ...settings, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Horário de Funcionamento:</label>
                      <input
                        type="text"
                        value={settings.openingHours}
                        onChange={(e) => onUpdateSettings({ ...settings, openingHours: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-emerald-700 font-semibold block">
                      ✓ Alterações salvas instantaneamente no banco de dados local.
                    </span>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>

      {/* MODAL: ABRIR NOVA OS */}
      {showNewOSModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h4 className="font-display font-bold text-slate-900 text-base">
                Abrir Nova Ordem de Serviço (OS)
              </h4>
              <button onClick={() => setShowNewOSModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateOS} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Nome do Cliente:</label>
                  <input
                    type="text"
                    required
                    value={newOS.customerName}
                    onChange={(e) => setNewOS({ ...newOS, customerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Telefone / WhatsApp:</label>
                  <input
                    type="text"
                    required
                    value={newOS.customerPhone}
                    onChange={(e) => setNewOS({ ...newOS, customerPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Modelo do Veículo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Corolla XEi"
                    value={newOS.model}
                    onChange={(e) => setNewOS({ ...newOS, model: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Placa:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: RTA-4B21"
                    value={newOS.plate}
                    onChange={(e) => setNewOS({ ...newOS, plate: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Mecânico Designado:</label>
                  <select
                    value={newOS.mechanic}
                    onChange={(e) => setNewOS({ ...newOS, mechanic: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Mestre Roberto Silva">Mestre Roberto Silva</option>
                    <option value="André Costa">André Costa</option>
                    <option value="Marcos Vinicius">Marcos Vinicius</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Elevador / Box:</label>
                  <select
                    value={newOS.bay}
                    onChange={(e) => setNewOS({ ...newOS, bay: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Elevador 1 (Hidráulico)">Elevador 1 (Hidráulico)</option>
                    <option value="Elevador 2 (Geometria 3D)">Elevador 2 (Geometria 3D)</option>
                    <option value="Elevador 3 (Freios)">Elevador 3 (Freios)</option>
                    <option value="Elevador 4 (Motor & Câmbio)">Elevador 4 (Motor & Câmbio)</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Valor Mão de Obra (R$):</label>
                  <input
                    type="number"
                    value={newOS.laborTotal}
                    onChange={(e) => setNewOS({ ...newOS, laborTotal: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Valor Peças (R$):</label>
                  <input
                    type="number"
                    value={newOS.partsTotal}
                    onChange={(e) => setNewOS({ ...newOS, partsTotal: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Diagnóstico Inicial:</label>
                <textarea
                  rows={2}
                  value={newOS.notes}
                  onChange={(e) => setNewOS({ ...newOS, notes: e.target.value })}
                  placeholder="Relato do cliente e anotações do teste..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewOSModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg"
                >
                  Salvar e Criar OS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO PRODUTO */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h4 className="font-display font-bold text-slate-900 text-base">
                Cadastrar Novo Óleo / Produto
              </h4>
              <button onClick={() => setShowNewProductModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Nome do Produto:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Óleo Motul 5W30 8100 Eco-lite"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Marca:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Motul, Castrol, Mobil"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Viscosidade:</label>
                  <input
                    type="text"
                    placeholder="Ex: 5W30, 0W20"
                    value={newProduct.viscosity}
                    onChange={(e) => setNewProduct({ ...newProduct, viscosity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Preço de Venda (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Quantidade em Estoque:</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg"
                >
                  Cadastrar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
