import React, { useState, useEffect } from 'react';
import { WorkOrder, WorkOrderStatus } from '../types';
import { 
  X, 
  Search, 
  Car, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Check, 
  FileText,
  UserCheck
} from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrders: WorkOrder[];
  initialSearchQuery?: string;
}

const STATUS_STEPS: { key: WorkOrderStatus; label: string }[] = [
  { key: 'triagem', label: 'Triagem / Entrada' },
  { key: 'aguardando_aprovacao', label: 'Orçamento' },
  { key: 'aguardando_pecas', label: 'Peças' },
  { key: 'em_execucao', label: 'Em Execução' },
  { key: 'teste_rodagem', label: 'Teste de Rodagem' },
  { key: 'pronto', label: 'Pronto Retirada' },
  { key: 'entregue', label: 'Entregue' }
];

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  workOrders,
  initialSearchQuery = ''
}) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [searchedOrder, setSearchedOrder] = useState<WorkOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setQuery(initialSearchQuery);
      performSearch(initialSearchQuery);
    }
  }, [initialSearchQuery, isOpen]);

  if (!isOpen) return null;

  const performSearch = (searchTerm: string) => {
    const clean = searchTerm.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const found = workOrders.find(wo => {
      const cleanPlate = wo.vehicle.plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const cleanProtocol = wo.protocol.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return cleanPlate.includes(clean) || cleanProtocol.includes(clean);
    });

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const getStepIndex = (status: WorkOrderStatus) => {
    return STATUS_STEPS.findIndex(s => s.key === status);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                Rastreamento de Ordem de Serviço
              </h3>
              <p className="text-[11px] text-slate-500">
                Acompanhe o andamento mecânico do seu automóvel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-5 border-b border-slate-100">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                placeholder="Digite a placa (ex: RTA-4B21) ou protocolo (ex: TRV-8941)"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs font-mono uppercase text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Consultar
            </button>
          </form>

          {/* Quick example badges */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
            <span>Exemplos no sistema:</span>
            {workOrders.slice(0, 3).map(wo => (
              <button
                key={wo.id}
                onClick={() => {
                  setQuery(wo.vehicle.plate);
                  performSearch(wo.vehicle.plate);
                }}
                className="font-mono text-emerald-700 hover:underline"
              >
                {wo.vehicle.plate}
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {searchedOrder ? (
            <div className="space-y-6">
              
              {/* Vehicle & Order Identity Card */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400 text-lg">
                      {searchedOrder.vehicle.plate}
                    </span>
                    <span className="text-xs text-slate-400">· Protocolo {searchedOrder.protocol}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-white mt-0.5">
                    {searchedOrder.vehicle.brand} {searchedOrder.vehicle.model} ({searchedOrder.vehicle.year})
                  </h4>
                  <span className="text-xs text-slate-300">
                    KM: {searchedOrder.vehicle.mileage} · {searchedOrder.vehicle.engine || 'Motorização padrão'}
                  </span>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800 text-xs">
                  <span className="text-slate-400 block">Mecânico Responsável:</span>
                  <strong className="text-white font-medium flex items-center sm:justify-end gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{searchedOrder.mechanic}</span>
                  </strong>
                  <span className="text-slate-400 block mt-1">{searchedOrder.bay}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Etapas do Atendimento na Oficina:
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {STATUS_STEPS.map((step, idx) => {
                    const currentIdx = getStepIndex(searchedOrder.status);
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step.key}
                        className={`p-2 rounded-lg text-center border text-[11px] flex flex-col items-center justify-center min-h-[58px] transition-all ${
                          isCurrent
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />}
                        {isCurrent && <Clock className="w-3.5 h-3.5 text-white mb-0.5 animate-spin" />}
                        <span className="line-clamp-2 leading-tight">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Diagnostic Observations */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Laudo Técnico & Diagnóstico do Mecânico:</span>
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {searchedOrder.diagnosticNotes}
                </p>
              </div>

              {/* Checklist results */}
              {searchedOrder.checklist && searchedOrder.checklist.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Checklist de Segurança:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {searchedOrder.checklist.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-2 rounded-lg border flex items-center justify-between ${
                          item.condition === 'ok'
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                            : item.condition === 'critico'
                            ? 'bg-rose-50 border-rose-200 text-rose-900'
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}
                      >
                        <span className="truncate pr-2">{item.item}</span>
                        <span className="font-bold text-[10px] uppercase shrink-0">
                          {item.condition === 'ok' ? 'Aprovado' : item.condition === 'critico' ? 'Substituir' : 'Atenção'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial summary for owner or client */}
              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-600">Total do conserto (Peças + Mão de obra):</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  R$ {searchedOrder.total.toFixed(2)}
                </span>
              </div>

            </div>
          ) : hasSearched ? (
            <div className="text-center py-12 text-slate-500">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                Nenhuma Ordem de Serviço encontrada
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Verifique se digitou a placa corretamente ou entre em contato direto pelo WhatsApp da Oficina Trevo.
              </p>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs">
                Digite a placa ou protocolo para carregar os dados em tempo real.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg"
          >
            Fechar Consulta
          </button>
        </div>

      </div>
    </div>
  );
};
