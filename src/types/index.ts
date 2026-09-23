export type ServiceCategory = 
  | 'revisao'
  | 'oleo_filtros'
  | 'freios'
  | 'suspensao'
  | 'motor_cambio'
  | 'injecao_eletronica'
  | 'eletrica'
  | 'estetica';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  durationEstimate: string;
  basePrice: number;
  highlighted?: boolean;
  warrantyDays: number;
  itemsIncluded: string[];
}

export interface VehicleData {
  brand: string;
  model: string;
  year: string;
  plate: string;
  mileage: string;
  engine?: string;
  fuelType?: 'flex' | 'gasolina' | 'diesel' | 'hibrido';
}

export type AppointmentStatus = 
  | 'pendente' 
  | 'confirmado' 
  | 'em_atendimento' 
  | 'concluido' 
  | 'cancelado';

export interface Appointment {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicle: VehicleData;
  serviceIds: string[];
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  estimatedTotal: number;
}

export type BudgetStatus = 
  | 'novo' 
  | 'em_analise' 
  | 'aprovado' 
  | 'rejeitado';

export interface BudgetItemDetail {
  description: string;
  category: 'peca' | 'mao_de_obra' | 'fluido';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BudgetEstimate {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicle: VehicleData;
  serviceCategory: string;
  items: BudgetItemDetail[];
  laborHours: number;
  laborRate: number;
  subtotal: number;
  discountPercent: number;
  total: number;
  status: BudgetStatus;
  createdAt: string;
  clientNotes?: string;
  mechanicNotes?: string;
}

export type ProductCategory = 
  | 'oleo_motor' 
  | 'filtro' 
  | 'aditivo' 
  | 'fluido_freio' 
  | 'manutencao';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  viscosity?: string;
  oilType?: '100% Sintético' | 'Semi-Sintético' | 'Mineral';
  specification?: string; // ex: API SP, ACEA C3, Dexos 1 Gen 3
  volume: string; // ex: "1 Litro", "4 Litros", "500ml"
  price: number;
  originalPrice?: number;
  stock: number;
  minStock: number;
  description: string;
  featured?: boolean;
  installAvailable: boolean;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  installAtWorkshop: boolean;
}

export type OrderStatus = 
  | 'pendente' 
  | 'pago' 
  | 'separado' 
  | 'pronto_retirada' 
  | 'concluido' 
  | 'cancelado';

export interface Order {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  deliveryType: 'retirada' | 'instalacao' | 'entrega';
  paymentMethod: 'pix' | 'cartao_credito' | 'balcao';
  status: OrderStatus;
  createdAt: string;
}

export type WorkOrderStatus = 
  | 'triagem' 
  | 'aguardando_aprovacao' 
  | 'aguardando_pecas' 
  | 'em_execucao' 
  | 'teste_rodagem' 
  | 'pronto' 
  | 'entregue';

export interface WorkOrder {
  id: string;
  protocol: string;
  customerName: string;
  customerPhone: string;
  vehicle: VehicleData;
  mechanic: string;
  bay: string; // ex: "Elevador 1 (Hidráulico)", "Elevador 2 (Geometria 3D)"
  status: WorkOrderStatus;
  diagnosticNotes: string;
  servicesPerformed: string[];
  partsUsed: { name: string; quantity: number; unitPrice: number }[];
  laborTotal: number;
  partsTotal: number;
  total: number;
  entryDate: string;
  expectedDate: string;
  checklist: {
    item: string;
    checked: boolean;
    condition: 'ok' | 'alerta' | 'critico';
  }[];
}

export interface WorkshopSettings {
  shopName: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  laborHourlyRate: number;
  pixKey: string;
  elevatorsCount: number;
}
