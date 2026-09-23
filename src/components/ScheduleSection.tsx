import React, { useState, useEffect } from 'react';
import { ServiceItem, Appointment, VehicleData } from '../types';
import { 
  Calendar, 
  Clock, 
  Car, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  MessageSquare, 
  Wrench,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface ScheduleSectionProps {
  services: ServiceItem[];
  preselectedServiceId?: string | null;
  onAppointmentCreated: (appointment: Appointment) => void;
}

const POPULAR_BRANDS = [
  'Chevrolet', 'Volkswagen', 'Fiat', 'Toyota', 'Hyundai', 
  'Jeep', 'Honda', 'Ford', 'Renault', 'Nissan', 'BMW'
];

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  services,
  preselectedServiceId,
  onAppointmentCreated
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<VehicleData>({
    brand: 'Chevrolet',
    model: '',
    year: '2022',
    plate: '',
    mileage: '',
    engine: '',
    fuelType: 'flex'
  });

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('08:30');
  const [step, setStep] = useState<number>(1);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedServiceId && !selectedServices.includes(preselectedServiceId)) {
      setSelectedServices(prev => [...prev, preselectedServiceId]);
    }
  }, [preselectedServiceId]);

  // Set default minimum date (tomorrow)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, id) => {
      const s = services.find(item => item.id === id);
      return sum + (s ? s.basePrice : 0);
    }, 0);
  };

  const timeSlots = [
    '07:30', '08:30', '09:30', '10:30', '11:30',
    '13:30', '14:30', '15:30', '16:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert('Por favor, selecione ao menos um serviço.');
      setStep(1);
      return;
    }

    if (!vehicle.model.trim() || !vehicle.plate.trim()) {
      alert('Por favor, preencha o modelo e a placa do veículo.');
      setStep(2);
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      alert('Por favor, preencha seu nome e telefone WhatsApp.');
      setStep(3);
      return;
    }

    // Protocol generation
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `TRV-${randomNum}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      protocol,
      customerName: customer.name.trim(),
      customerPhone: customer.phone.trim(),
      customerEmail: customer.email.trim(),
      vehicle: {
        ...vehicle,
        plate: vehicle.plate.toUpperCase().trim()
      },
      serviceIds: selectedServices,
      preferredDate,
      preferredTime,
      notes: customer.notes.trim(),
      status: 'pendente',
      createdAt: new Date().toISOString(),
      estimatedTotal: calculateTotal()
    };

    onAppointmentCreated(newAppointment);
    setCreatedAppointment(newAppointment);
  };

  const resetForm = () => {
    setCreatedAppointment(null);
    setSelectedServices([]);
    setCustomer({ name: '', phone: '', email: '', notes: '' });
    setVehicle({
      brand: 'Chevrolet',
      model: '',
      year: '2022',
      plate: '',
      mileage: '',
      engine: '',
      fuelType: 'flex'
    });
    setStep(1);
  };

  return (
    <section id="agendamento" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
            Agendamento Rápido
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-950 tracking-tight mt-3">
            Reserve o horário do seu carro na oficina
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Escolha os serviços, data e horário preferencial. Você receberá a confirmação com número de protocolo.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {createdAppointment ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-950">
              Agendamento Solicitado com Sucesso!
            </h3>
            
            <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
              Seu agendamento foi registrado no sistema da Oficina Trevo e já está visível para a equipe técnica.
            </p>

            {/* Protocol Display Box */}
            <div className="mt-6 bg-white p-5 rounded-xl border border-emerald-200 inline-block text-left min-w-[320px] shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Protocolo do Agendamento:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdAppointment.protocol);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="text-2xl font-mono font-bold text-emerald-700 tracking-wider">
                {createdAppointment.protocol}
              </div>

              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <div><strong>Cliente:</strong> {createdAppointment.customerName}</div>
                <div><strong>Veículo:</strong> {createdAppointment.vehicle.brand} {createdAppointment.vehicle.model} ({createdAppointment.vehicle.plate})</div>
                <div><strong>Data e Hora:</strong> {createdAppointment.preferredDate} às {createdAppointment.preferredTime}h</div>
                <div><strong>Total Estimado:</strong> R$ {createdAppointment.estimatedTotal.toFixed(2)}</div>
              </div>
            </div>

            {/* WhatsApp notification action */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?phone=5591983520888&text=Ol%C3%A1%2C%20acabei%20de%20fazer%20o%20agendamento%20protocolo%20${createdAppointment.protocol}%20para%20o%20carro%20${createdAppointment.vehicle.model}%20(${createdAppointment.vehicle.plate})%20no%20dia%20${createdAppointment.preferredDate}%20%C3%A0s%20${createdAppointment.preferredTime}.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar via WhatsApp da Oficina</span>
              </a>

              <button
                onClick={resetForm}
                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition-colors"
              >
                Fazer Outro Agendamento
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Scheduling Wizard */
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            
            {/* Step Indicators */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { num: 1, title: 'Serviços' },
                { num: 2, title: 'Veículo' },
                { num: 3, title: 'Data & Contato' }
              ].map((s) => (
                <div 
                  key={s.num}
                  className={`text-center py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    step === s.num
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : step > s.num
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  <span className="inline-block mr-1">{s.num}.</span>
                  <span>{s.title}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Select Services */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-slate-900 text-lg">
                      1. Selecione os serviços desejados:
                    </h3>
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                      Total: R$ {calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {services.map((srv) => {
                      const isSelected = selectedServices.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-600'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 pointer-events-none"
                              />
                              <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                                {srv.name}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-950 shrink-0">
                              R$ {srv.basePrice.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 pl-6 line-clamp-2">
                            {srv.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={selectedServices.length === 0}
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Avançar para Dados do Veículo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Vehicle Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                    2. Dados do seu veículo:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Marca da Montadora:
                      </label>
                      <select
                        value={vehicle.brand}
                        onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      >
                        {POPULAR_BRANDS.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Modelo do Carro:
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Onix, Corolla, Compass, HB20"
                        value={vehicle.model}
                        onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Placa do Veículo (Mercosul ou antiga):
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: RTA-4B21 ou ABC-1234"
                        value={vehicle.plate}
                        onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value.toUpperCase() })}
                        required
                        maxLength={9}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono uppercase text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ano de Fabricação:
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 2021"
                        value={vehicle.year}
                        onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quilometragem (KM atual aproximado):
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 45.000 km"
                        value={vehicle.mileage}
                        onChange={(e) => setVehicle({ ...vehicle, mileage: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Combustível:
                      </label>
                      <select
                        value={vehicle.fuelType}
                        onChange={(e) => setVehicle({ ...vehicle, fuelType: e.target.value as any })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="flex">Flex (Etanol / Gasolina)</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="diesel">Diesel</option>
                        <option value="hibrido">Híbrido / Elétrico</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs rounded-lg flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Voltar</span>
                    </button>

                    <button
                      type="button"
                      disabled={!vehicle.model.trim() || !vehicle.plate.trim()}
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Avançar para Data e Contato</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date, Time & Contact Info */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                    3. Escolha a data, horário e seus dados de contato:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Data Preferida:
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Seg a Sex: 07:30 às 17:30 | Sáb: 07:30 às 11:30
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Horário de Chegada:
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      >
                        {timeSlots.map(t => (
                          <option key={t} value={t}>{t}h</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Seu Nome Completo:
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Carlos Eduardo Mendes"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Telefone para Contato:
                      </label>
                      <input
                        type="tel"
                        placeholder="Ex: (91) 98112-3344"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        E-mail (opcional):
                      </label>
                      <input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Observações ou Barulhos Percebidos (opcional):
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Veículo faz barulho ao frear ou ao passar em lombadas..."
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Summary before finalizing */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 block">Veículo e Serviços:</span>
                      <strong className="text-slate-900 font-semibold">
                        {vehicle.brand} {vehicle.model} ({vehicle.plate}) · {selectedServices.length} serviço(s)
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block">Estimativa:</span>
                      <strong className="text-emerald-700 font-bold font-mono text-sm">
                        R$ {calculateTotal().toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs rounded-lg flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Voltar</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Agendamento</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
