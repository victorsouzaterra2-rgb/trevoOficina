import React, { useState, useEffect } from 'react';
import { 
  ServiceItem, 
  Product, 
  CartItem, 
  Appointment, 
  BudgetEstimate, 
  WorkOrder, 
  Order, 
  WorkshopSettings,
  WorkOrderStatus
} from './types';
import { 
  INITIAL_SERVICES, 
  INITIAL_PRODUCTS, 
  INITIAL_SETTINGS, 
  INITIAL_WORK_ORDERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_BUDGETS,
  getStoredData,
  setStoredData
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ShopSection } from './components/ShopSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { OwnerManagementModal } from './components/OwnerManagementModal';

export default function App() {
  // Persistent state
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [products, setProducts] = useState<Product[]>(() => 
    getStoredData('trevo_products', INITIAL_PRODUCTS)
  );
  const [settings, setSettings] = useState<WorkshopSettings>(() => 
    getStoredData('trevo_settings', INITIAL_SETTINGS)
  );
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => 
    getStoredData('trevo_work_orders', INITIAL_WORK_ORDERS)
  );
  const [appointments, setAppointments] = useState<Appointment[]>(() => 
    getStoredData('trevo_appointments', INITIAL_APPOINTMENTS)
  );
  const [budgets, setBudgets] = useState<BudgetEstimate[]>(() => 
    getStoredData('trevo_budgets', INITIAL_BUDGETS)
  );
  const [orders, setOrders] = useState<Order[]>(() => 
    getStoredData('trevo_orders', [])
  );
  const [cart, setCart] = useState<CartItem[]>(() => 
    getStoredData('trevo_cart', [])
  );

  // Modal controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackQuery, setTrackQuery] = useState('');

  // Active section & preselection
  const [activeSection, setActiveSection] = useState('inicio');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    setStoredData('trevo_products', products);
  }, [products]);

  useEffect(() => {
    setStoredData('trevo_work_orders', workOrders);
  }, [workOrders]);

  useEffect(() => {
    setStoredData('trevo_appointments', appointments);
  }, [appointments]);

  useEffect(() => {
    setStoredData('trevo_budgets', budgets);
  }, [budgets]);

  useEffect(() => {
    setStoredData('trevo_orders', orders);
  }, [orders]);

  useEffect(() => {
    setStoredData('trevo_settings', settings);
  }, [settings]);

  useEffect(() => {
    setStoredData('trevo_cart', cart);
  }, [cart]);

  // Smooth Navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, installAtWorkshop = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, installAtWorkshop }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleToggleInstallCart = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, installAtWorkshop: !item.installAtWorkshop }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Schedule interactions
  const handleSelectServiceToSchedule = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    handleNavigate('agendamento');
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
  };

  // Budget interactions
  const handleBudgetCreated = (newBudget: BudgetEstimate) => {
    setBudgets(prev => [newBudget, ...prev]);
  };

  // Order interactions
  const handleOrderCreated = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    // Deduct stock
    setProducts(prev =>
      prev.map(prod => {
        const itemInOrder = newOrder.items.find(i => i.product.id === prod.id);
        if (itemInOrder) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - itemInOrder.quantity)
          };
        }
        return prod;
      })
    );
  };

  // Quick vehicle search
  const handleTrackPlate = (plateOrProtocol: string) => {
    setTrackQuery(plateOrProtocol);
    setIsTrackModalOpen(true);
  };

  // Owner Admin actions
  const handleUpdateWorkOrderStatus = (id: string, newStatus: WorkOrderStatus) => {
    setWorkOrders(prev =>
      prev.map(wo => (wo.id === id ? { ...wo, status: newStatus } : wo))
    );
  };

  const handleAddWorkOrder = (newWO: WorkOrder) => {
    setWorkOrders(prev => [newWO, ...prev]);
  };

  const handleUpdateAppointmentStatus = (id: string, status: any) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const handleConvertAppointmentToOS = (apt: Appointment) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newWO: WorkOrder = {
      id: `os-${Date.now()}`,
      protocol: `TRV-${randomNum}`,
      customerName: apt.customerName,
      customerPhone: apt.customerPhone,
      vehicle: {
        ...apt.vehicle,
        engine: '1.0 / 1.6 Flex'
      },
      mechanic: 'Mestre Roberto Silva',
      bay: 'Elevador 1 (Hidráulico)',
      status: 'em_execucao',
      diagnosticNotes: apt.notes || 'Agendamento confirmado convertido em Ordem de Serviço.',
      servicesPerformed: apt.serviceIds.map(id => {
        const s = services.find(srv => srv.id === id);
        return s ? s.name : 'Serviço Geral';
      }),
      partsUsed: [
        { name: 'Kit Troca de Óleo e Filtros homologado', quantity: 1, unitPrice: apt.estimatedTotal * 0.6 }
      ],
      laborTotal: apt.estimatedTotal * 0.4,
      partsTotal: apt.estimatedTotal * 0.6,
      total: apt.estimatedTotal,
      entryDate: new Date().toISOString(),
      expectedDate: new Date(Date.now() + 86400000).toISOString(),
      checklist: [
        { item: 'Nível e viscosidade do óleo', checked: true, condition: 'ok' },
        { item: 'Inspeção de pastilhas de freio', checked: true, condition: 'ok' },
        { item: 'Pressão dos pneus e estepe', checked: true, condition: 'ok' }
      ]
    };

    setWorkOrders(prev => [newWO, ...prev]);
    // update appointment status to concluido or confirmado
    handleUpdateAppointmentStatus(apt.id, 'confirmado');
    alert(`Agendamento de ${apt.customerName} convertido na OS ${newWO.protocol}!`);
  };

  const handleUpdateProductStock = (id: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const handleAddNewProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const handleUpdateSettings = (newSettings: WorkshopSettings) => {
    setSettings(newSettings);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
        onOpenTrackModal={() => {
          setTrackQuery('');
          setIsTrackModalOpen(true);
        }}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScheduleClick={() => handleNavigate('agendamento')}
          onBudgetClick={() => handleNavigate('orcamento')}
          onTrackPlate={handleTrackPlate}
        />

        {/* Services Section */}
        <ServicesSection
          services={services}
          onSelectServiceToSchedule={handleSelectServiceToSchedule}
        />

        {/* Schedule Appointment Section */}
        <ScheduleSection
          services={services}
          preselectedServiceId={preselectedServiceId}
          onAppointmentCreated={handleAppointmentCreated}
        />

        {/* Budget Calculator Section */}
        <BudgetCalculator
          onBudgetCreated={handleBudgetCreated}
        />

        {/* Shop Section (Oils, Filters, Lubricants) */}
        <ShopSection
          products={products}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Location & Contact Section */}
        <LocationAndContact
          settings={settings}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
      />

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onToggleInstall={handleToggleInstallCart}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderCreated={handleOrderCreated}
      />

      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        workOrders={workOrders}
        initialSearchQuery={trackQuery}
      />

      <OwnerManagementModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        workOrders={workOrders}
        appointments={appointments}
        budgets={budgets}
        products={products}
        orders={orders}
        settings={settings}
        onUpdateWorkOrderStatus={handleUpdateWorkOrderStatus}
        onAddWorkOrder={handleAddWorkOrder}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        onConvertAppointmentToOS={handleConvertAppointmentToOS}
        onUpdateProductStock={handleUpdateProductStock}
        onUpdateProductPrice={handleUpdateProductPrice}
        onAddNewProduct={handleAddNewProduct}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
