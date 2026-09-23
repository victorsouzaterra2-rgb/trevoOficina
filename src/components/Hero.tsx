import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  CalendarCheck, 
  Calculator, 
  Search, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import heroImg from '../assets/images/hero_workshop_mechanic_1790207365389.jpg';

interface HeroProps {
  onScheduleClick: () => void;
  onBudgetClick: () => void;
  onTrackPlate: (plateOrProtocol: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScheduleClick,
  onBudgetClick,
  onTrackPlate
}) => {
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onTrackPlate(trackInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] flex items-center">
      {/* Background Image with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Oficina Mecânica Trevo - Centro Automotivo Especializado"
          className="w-full h-full object-cover object-center opacity-40 scale-102 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Domain Badge / Value Kicker (Clean unboxed inline metadata) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-md tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Oficina Especializada Multimarcas</span>
              <span className="text-emerald-700">·</span>
              <span className="text-slate-300 font-normal">Tradição & Tecnologia</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              Cuidado de precisão e confiança mecânica para o seu veículo.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Diagnóstico computadorizado de ponta, troca técnica de óleo, revisão preventiva, freios, suspensão e motor. Transparência total e peças originais com garantia formal.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScheduleClick}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-all shadow-lg shadow-emerald-900/40 flex items-center gap-2.5 active:scale-98"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-100" />
                <span>Agendar Horário</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onBudgetClick}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 active:scale-98"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Simular Orçamento Online</span>
              </button>
            </div>

            {/* Trust Markers List */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantia de 90 a 365 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4 Elevadores Hidráulicos</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Peças com Procedência</span>
              </div>
            </div>
          </div>

          {/* Quick Vehicle Tracking Card (Hero Right Anchor) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm">
                      Acompanhe seu Veículo
                    </h3>
                    <p className="text-xs text-slate-400">
                      Consulte a Ordem de Serviço em tempo real
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  Ao Vivo
                </span>
              </div>

              <form onSubmit={handleTrackSubmit} className="mt-5 space-y-3">
                <label className="block text-xs font-medium text-slate-300">
                  Digite a Placa do Carro ou Número do Protocolo:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value.toUpperCase())}
                    placeholder="Ex: RTA-4B21 ou TRV-8941"
                    maxLength={10}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white font-mono placeholder:text-slate-500 uppercase focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 transition-colors tracking-wider"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Buscar</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Dica: experimente com a placa <strong className="text-emerald-400 font-mono">RTA-4B21</strong> ou <strong className="text-emerald-400 font-mono">QEO-7J89</strong></span>
                </p>
              </form>

              {/* Live Workshop Snapshot */}
              <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="text-xs text-slate-400 block">Tempo médio troca óleo</span>
                  <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                    35–45 min
                  </span>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="text-xs text-slate-400 block">Capacidade diária</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
                    18 veículos
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
