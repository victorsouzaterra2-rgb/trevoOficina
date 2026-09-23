import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Navigation, 
  Coffee, 
  Wifi, 
  ShieldCheck, 
  Car,
  ExternalLink
} from 'lucide-react';
import { WorkshopSettings } from '../types';

interface LocationAndContactProps {
  settings: WorkshopSettings;
}

export const LocationAndContact: React.FC<LocationAndContactProps> = ({ settings }) => {
  return (
    <section id="localizacao" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
            Localização & Atendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight mt-3">
            Venha conhecer nossa estrutura automotiva
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            Fácil acesso, ampla área de estacionamento, box de atendimento rápido e recepção confortável com café e Wi-Fi enquanto você aguarda o seu veículo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 6 Columns: Contact Details & Amenities */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              
              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Endereço Oficial:
                  </h4>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {settings.address}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {settings.neighborhood} · {settings.city} - {settings.state}, CEP {settings.zipCode}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Alameda+Imperial+1576+Castanhal+PA"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Abrir no Google Maps / Waze</span>
                  </a>
                </div>
              </div>

              {/* Operating hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Horário de Funcionamento:
                  </h4>
                  <div className="text-xs text-slate-700 mt-1 space-y-1">
                    <p><strong>Segunda a Sexta:</strong> 07:30 às 17:30</p>
                    <p><strong>Sábado:</strong> 07:30 às 11:30</p>
                    <p className="text-slate-400"><strong>Domingo:</strong> Fechado (Plantão Guincho Parceiro)</p>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Canais Diretos de Comunicação:
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <a
                      href={`tel:${settings.phone.replace(/\D/g, '')}`}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{settings.phone}</span>
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?phone=55${settings.whatsapp.replace(/\D/g, '')}&text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20servi%C3%A7os%20na%20Oficina%20Trevo.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp {settings.whatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Customer Amenities Card */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Sala de Espera VIP</span>
                  <span className="text-[11px] text-slate-400 block">Ar-condicionado, Wi-Fi 5G & Café Nespresso cortesia</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Wi-Fi Grátis</span>
                </span>
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vagas Clientes</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Stylized Interactive Map / Location Graphic */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <div className="relative flex-1 min-h-[300px] bg-slate-900 flex items-center justify-center p-6 text-center">
              {/* Map grid background pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #10B981 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Central Map Pin Pointer */}
              <div className="relative z-10 max-w-sm bg-slate-950/90 border border-emerald-800/80 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-base">
                  Trevo Oficina Especializada
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Alameda Imperial, nº 1.576 · Caiçara
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Entre Tv. Benjamin Constant e Tv. Irmã Adelaide · Castanhal - PA
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <a
                    href="https://maps.google.com/?q=Alameda+Imperial+1576+Castanhal+PA"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Como Chegar via GPS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom summary bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Atendimento a veículos nacionais e importados</span>
              <span className="font-semibold text-emerald-800 font-mono">Castanhal / Região Metropolitana</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
