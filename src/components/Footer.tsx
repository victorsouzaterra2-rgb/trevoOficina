import React from 'react';
import { CloverLogo } from './CloverLogo';
import { Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { WorkshopSettings } from '../types';

interface FooterProps {
  settings: WorkshopSettings;
  onNavigate: (sectionId: string) => void;
  onOpenOwnerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenOwnerModal
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <CloverLogo size="md" light showText />
            <p className="text-slate-400 text-xs leading-relaxed">
              Centro automotivo especializado em diagnósticos eletrônicos, mecânica geral, troca técnica de óleo e revisão preventiva com alto rigor técnico.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantia formal em todas as ordens de serviço</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3">
              Navegação Rápida
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Serviços Especializados', id: 'servicos' },
                { label: 'Agendar Horário na Oficina', id: 'agendamento' },
                { label: 'Simulador de Orçamento', id: 'orcamento' },
                { label: 'Loja de Óleos & Peças', id: 'loja' },
                { label: 'Localização & Horários', id: 'localizacao' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3">
              Especialidades
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Troca de Óleo 100% Sintético & 4 Filtros</li>
              <li>Revisão Geral Preventiva de 50 Itens</li>
              <li>Manutenção de Freios & Diagnóstico ABS</li>
              <li>Suspensão, Alinhamento 3D & Balanceamento</li>
              <li>Injeção Eletrônica & Limpeza de Bicos</li>
              <li>Correia Dentada, Embreagem & Motor</li>
            </ul>
          </div>

          {/* Col 4: Contact & Owner Gate */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3">
              Atendimento Castanhal
            </h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{settings.address} - {settings.neighborhood}, {settings.city} - {settings.state}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{settings.phone} / {settings.whatsapp}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{settings.openingHours}</span>
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenOwnerModal}
                className="text-[11px] text-slate-400 hover:text-emerald-400 underline transition-colors"
              >
                Acesso Restrito: Painel de Gestão da Oficina
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Oficina Mecânica Trevo Especializada. Todos os direitos reservados. CNPJ homologado.
          </div>
          <div className="text-slate-400">
            Conforme Código de Defesa do Consumidor (Lei Federal nº 8.078/1990)
          </div>
        </div>
      </div>
    </footer>
  );
};
