"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Toaster } from 'sileo';
import { Phone, Menu, X, Users, MapPin, Mail, Lock, Facebook, Instagram, Linkedin, FileSignature, FileText, Shield } from 'lucide-react';

import TourGuiado from '@/components/TourGuiado';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAlerta(true);
    }, 8000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuAbierto(false);
  }, [pathname]);

  const getLinkClass = (path) => {
    return pathname === path 
      ? "bg-brand-blue text-brand-gold font-bold shadow-md" 
      : "text-brand-blue font-semibold hover:bg-brand-blue/5 hover:text-brand-gold";
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <>
      <Toaster position="bottom-center" />
      <TourGuiado /> 

      {mostrarAlerta && (
        <div className="fixed bottom-6 left-6 z-40 bg-white p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 animate-fade-in max-w-[280px] flex items-start gap-3 transition-all duration-500 border-l-4 border-l-brand-gold">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-brand-blue-light">
            <Users size={20} className="text-brand-blue" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-brand-blue leading-tight">¿Necesitas asesoría jurídica?</h4>
            <p className="text-xs text-brand-gray mt-1 mb-3">Nuestros expertos están en línea para ayudarte.</p>
            <div className="flex gap-2">
              <a href="https://wa.me/573012560585" target="_blank" rel="noopener noreferrer" className="text-xs bg-brand-gold text-brand-blue px-3 py-1.5 rounded-lg font-bold hover:bg-brand-gold-dark hover:text-white transition-colors shadow-sm">
                Hablar con asesor
              </a>
              <button onClick={() => setMostrarAlerta(false)} className="text-xs text-gray-400 hover:text-gray-700 font-medium px-2 py-1.5">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton /> 

      {/* HEADER FLOTANTE */}
      <div className="sticky top-0 z-50 pt-4 px-4 pb-2 md:px-6 w-full pointer-events-none">
        <nav className="pointer-events-auto container mx-auto max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-brand-gold/20 px-4 md:px-6 py-3 flex justify-between items-center transition-all duration-300">
          
          <Link href="/" className="text-xl md:text-2xl font-black text-brand-blue flex items-center gap-3 tracking-tight group">
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full shadow-sm border-2 border-brand-gold overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image src="/logo.jpeg" alt="Rapicobro Logo" fill sizes="60px" style={{objectFit: "cover"}} />              
            </div>
            RAPICOBRO
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/" className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${getLinkClass('/')}`}>Inicio</Link>
            <Link href="/servicios" className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${getLinkClass('/servicios')}`}>Servicios</Link>
            <Link href="/como-funciona" className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${getLinkClass('/como-funciona')}`}>Cómo funciona</Link>
            <Link href="/nosotros" className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${getLinkClass('/nosotros')}`}>Nosotros</Link>
            
            <div className="pl-4 ml-2 border-l border-gray-200 flex items-center gap-3">
              <Link href="/contacto" className="px-6 py-2.5 bg-brand-gold text-brand-blue font-bold rounded-xl shadow-md shadow-brand-gold/20 hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 block">
                Contáctanos
              </Link>
              
              <Link href="/login" className="w-10 h-10 bg-brand-bg text-brand-blue rounded-xl flex items-center justify-center hover:bg-brand-blue hover:text-brand-gold transition-all duration-300 border border-gray-200 hover:border-brand-blue shadow-sm" title="Acceso Administrativo">
                <Lock size={18} />
              </Link>
            </div>
          </div>
          
          <button onClick={toggleMenu} className="md:hidden p-2 text-brand-blue bg-brand-blue/5 rounded-xl hover:bg-brand-blue/10 transition-colors focus:outline-none">
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-40 bg-brand-blue/40 backdrop-blur-sm" onClick={toggleMenu}>
          <div className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-brand-gold/20 p-4 flex flex-col space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <Link href="/" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl transition-all ${getLinkClass('/')}`}>Inicio</Link>
            <Link href="/servicios" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl transition-all ${getLinkClass('/servicios')}`}>Servicios</Link>
            <Link href="/como-funciona" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl transition-all ${getLinkClass('/como-funciona')}`}>Cómo funciona</Link>
            <Link href="/nosotros" onClick={toggleMenu} className={`block px-4 py-3 rounded-xl transition-all ${getLinkClass('/nosotros')}`}>Nosotros</Link>
            
            <div className="border-t border-gray-100 my-2 pt-2 flex flex-col gap-2">
              <Link href="/contacto" onClick={toggleMenu} className="block px-4 py-3 bg-brand-gold text-brand-blue text-center font-bold rounded-xl shadow-sm">
                Contáctanos
              </Link>
              <Link href="/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 px-4 py-3 text-brand-gray bg-gray-50 rounded-xl hover:text-brand-gold font-bold transition-all border border-gray-200">
                <Lock size={18} /> Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow -mt-20 pt-20">
        {children}
      </main>

      <footer className="bg-brand-blue text-white pt-16 pb-8 mt-auto border-t-[6px] border-brand-gold relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div>
              <Link href="/" className="text-2xl font-black text-white flex items-center gap-3 mb-4 tracking-tight">
                <div className="relative h-10 w-10 rounded-full border-2 border-brand-gold opacity-90 overflow-hidden">
                  <Image src="/logo.jpeg" alt="Rapicobro Logo" fill sizes="60px" style={{objectFit: "cover"}} />                
                </div>
                RAPICOBRO
              </Link>
              <p className="text-sm text-blue-200 mb-6 leading-relaxed">
                Recuperación de prestaciones económicas, cobro de incapacidades y asesorías jurídicas en salud. Cuidamos tu flujo de caja.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-brand-blue font-bold bg-brand-gold px-4 py-2 rounded-lg shadow-sm">
                <Lock size={16} /> Sitio 100% Seguro (SSL)
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-brand-blue-light pb-2 text-brand-gold-light">Documentos Legales</h4>
              <ul className="space-y-4 text-sm text-blue-100">
                <li><Link href="/autorizacion-datos" className="hover:text-brand-gold transition-colors flex items-center gap-2"><FileSignature size={16} className="text-brand-gold" /> Autorización de Datos</Link></li>
                <li><Link href="/contrato-servicios" className="hover:text-brand-gold transition-colors flex items-center gap-2"><FileText size={16} className="text-brand-gold" /> Contrato de Servicios</Link></li>
                <li><Link href="/protocolo-interno" className="hover:text-brand-gold transition-colors flex items-center gap-2"><Shield size={16} className="text-brand-gold" /> Protocolo de Seguridad</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-brand-blue-light pb-2 text-brand-gold-light">Contacto y Sede</h4>
              <ul className="space-y-4 text-sm text-blue-100">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>Sede Principal<br/>Bogotá, D.C.<br/>Localidad de Engativá</span>
                </li>
                <li className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-brand-gold shrink-0" />
                    <span className="font-bold">301 256 0585</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-brand-gold shrink-0 opacity-0" />
                    <span className="font-bold">350 709 8899</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-gold shrink-0" />
                  <a href="mailto:rapicobro1@gmail.com" className="hover:text-brand-gold transition-colors">rapicobro1@gmail.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 border-b border-brand-blue-light pb-2 text-brand-gold-light">Comunidad</h4>
              <div className="flex gap-4 mb-8">
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:-translate-y-1"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:-translate-y-1"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-blue-light flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 hover:-translate-y-1"><Linkedin size={20} /></a>
              </div>
              <div className="p-4 bg-brand-blue-light/50 rounded-xl border border-brand-blue-light">
                <p className="text-xs text-blue-100 leading-tight">
                  Gestión garantizada ante el Sistema General de Seguridad Social en Salud regulado por la Ley 100 de 1993.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-blue-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300">
            <p>© {new Date().getFullYear()} RAPICOBRO. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              <Link href="/aviso-privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
              <Link href="/politica-datos" className="hover:text-white transition-colors">Política de Tratamiento de Datos</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}