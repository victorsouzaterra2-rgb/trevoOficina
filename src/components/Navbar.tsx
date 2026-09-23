import React, { useState } from 'react';
import { CloverLogo } from './CloverLogo';
import { 
  ShoppingBag, 
  Lock, 
  Menu, 
  X, 
  Phone, 
  Clock, 
  Search,
  CalendarCheck,
  Calculator
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOwnerModal: () => void;
  onOpenTrackModal: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOwnerModal,
  onOpenTrackModal,
  onNavigate,
  activeSection = 'inicio'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Serviços', id: 'servicos' },
    { label: 'Agendar', id: 'agendamento' },
    { label: 'Orçamento Online', id: 'orcamento' },
    { label: 'Loja de Óleos', id: 'loja' },
    { label: 'Localização', id: 'localizacao' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for direct contact and workshop status */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <strong className="text-white font-medium">Oficina Aberta</strong>
              <span className="hidden md:inline text-slate-400">· Seg a Sex 07:30–17:30 · Sáb 07:30–11:30</span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Castanhal - PA · Alameda Imperial, 1.576
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href="tel:9137216567" 
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>(91) 3721-6567</span>
            </a>
            <button
              onClick={onOpenTrackModal}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              title="Acompanhe o status do conserto do seu carro"
            >
              <Search className="w-3 h-3" />
              <span>Rastrear Veículo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav (Top Bar Contract: 3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand element */}
        <button 
          onClick={() => handleLinkClick('inicio')}
          className="text-left focus:outline-hidden"
        >
          <CloverLogo size="md" />
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors hover:text-slate-900 ${
                  isActive ? 'text-emerald-800 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative p-2.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Owner Dashboard Lock Button */}
          <button
            onClick={onOpenOwnerModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/90 rounded-lg transition-colors border border-slate-200"
            title="Acesso restrito ao proprietário da oficina"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Área do Dono</span>
          </button>

          {/* CTA Agendar */}
          <button
            onClick={() => handleLinkClick('agendamento')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-98"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Agendar Serviço</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-800 flex items-center justify-between"
              >
                <span>{link.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                onOpenTrackModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Consultar / Rastrear Placa do Veículo</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenOwnerModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Painel do Dono</span>
            </button>
            <button
              onClick={() => handleLinkClick('agendamento')}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Agendar Agora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
