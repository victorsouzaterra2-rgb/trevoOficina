import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '../types';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Check, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  Gauge,
  Activity,
  Layers
} from 'lucide-react';
import diagnosticImg from '../assets/images/diagnostic_engine_service_1790207385850.jpg';
import brakesImg from '../assets/images/brakes_suspension_bay_1790207395134.jpg';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceToSchedule: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceToSchedule
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'oleo_filtros', label: 'Troca de Óleo' },
    { id: 'revisao', label: 'Revisão Preventiva' },
    { id: 'freios', label: 'Freios & ABS' },
    { id: 'suspensao', label: 'Suspensão & 3D' },
    { id: 'injecao_eletronica', label: 'Injeção Eletrônica' },
    { id: 'motor_cambio', label: 'Motor & Câmbio' },
  ];

  const filteredServices = selectedCategory === 'todos' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="servicos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
            Serviços Especializados
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight mt-3">
            Manutenção automotiva de alto padrão técnico
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Diagnósticos exatos, ferramental aferido por normas ABNT e mecânicos certificados com histórico comprovado.
          </p>
        </div>

        {/* Visual Feature Split: Diagnostic Bay & Suspension */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Diagnostic */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[260px] flex flex-col justify-end p-6 border border-slate-800 shadow-md group">
            <img
              src={diagnosticImg}
              alt="Diagnóstico Computadorizado com Scanner OBD2 na Trevo"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
                <Gauge className="w-4 h-4" />
                <span>Scanner Eletrônico OBD2 & Osciloscópio</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Diagnóstico de Precisão Sem "Achismos"
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Identificação rápida de falhas na injeção, falhas de ignição, emissão de poluentes e sensores automotivos sem desmontar peças à toa.
              </p>
            </div>
          </div>

          {/* Card 2: Brakes & Suspension */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[260px] flex flex-col justify-end p-6 border border-slate-800 shadow-md group">
            <img
              src={brakesImg}
              alt="Manutenção de Freios e Suspensão na Oficina Trevo"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
                <Activity className="w-4 h-4" />
                <span>Frenagem Eficaz & Conforto Dinâmico</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Segurança Ativa: Freios & Suspensão
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Discos ventilados, pastilhas cerâmicas e alinhamento tridimensional a laser para máxima aderência e estabilidade nas estradas.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters (Segmented Control Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 hover:border-slate-300"
              >
                <div>
                  {/* Top line: Index number & estimated duration */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-mono font-bold text-emerald-700 tracking-wider">
                      {indexNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.durationEstimate}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-slate-950 mb-2 leading-snug">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights checklist preview */}
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                    {service.itemsIncluded.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer price & actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-600 block">
                      A partir de
                    </span>
                    <span className="text-lg font-mono font-bold text-slate-950">
                      R$ {service.basePrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => onSelectServiceToSchedule(service.id)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors flex items-center gap-1 active:scale-98"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Especificação Técnica
                </span>
                <h3 className="text-xl font-display font-bold text-slate-950 mt-0.5">
                  {selectedServiceModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {selectedServiceModal.description}
            </p>

            <div className="mt-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                O que está incluído no procedimento:
              </h4>
              <ul className="space-y-2">
                {selectedServiceModal.itemsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block">Tempo estimado:</span>
                <strong className="text-slate-900 font-semibold">{selectedServiceModal.durationEstimate}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block">Garantia formal:</span>
                <strong className="text-emerald-700 font-semibold">{selectedServiceModal.warrantyDays} dias</strong>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Preço estimado:</span>
                <span className="text-xl font-mono font-bold text-slate-950">
                  R$ {selectedServiceModal.basePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const id = selectedServiceModal.id;
                    setSelectedServiceModal(null);
                    onSelectServiceToSchedule(id);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5"
                >
                  <span>Agendar este Serviço</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
