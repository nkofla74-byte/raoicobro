"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ShieldCheck, TrendingUp, Clock, FileCheck, Smartphone, 
  Headset, Activity, FileSpreadsheet, BarChart, Settings, Gavel, 
  ClipboardCheck, Briefcase, Truck, Users, HeartHandshake
} from 'lucide-react';
import Link from 'next/link';

// --- COMPONENTE INTERNO: CONTADOR ANIMADO ---
// Hace que los números cuenten desde 0 hasta el valor final cuando aparecen en pantalla
const ContadorAnimado = ({ fin, duracion = 2000, sufijo = "", prefijo = "" }) => {
  const [cuenta, setCuenta] = useState(0);
  const [visible, setVisible] = useState(false);
  const elementoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (elementoRef.current) observer.observe(elementoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let inicio = 0;
    const incremento = fin / (duracion / 16);
    const timer = setInterval(() => {
      inicio += incremento;
      if (inicio >= fin) {
        clearInterval(timer);
        setCuenta(fin);
      } else {
        setCuenta(Math.ceil(inicio));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, fin, duracion]);

  return <span ref={elementoRef}>{prefijo}{cuenta.toLocaleString('es-CO')}{sufijo}</span>;
};


export default function Inicio() {
  // Lista de beneficios para el carrusel
  const beneficios = [
    { icono: <Headset size={32} />, titulo: "Soporte de nuestro equipo" },
    { icono: <TrendingUp size={32} />, titulo: "Aumento en el flujo de caja" },
    { icono: <Activity size={32} />, titulo: "Recobro efectivo mes a mes" },
    { icono: <FileSpreadsheet size={32} />, titulo: "Actualización de carteras" },
    { icono: <Settings size={32} />, titulo: "Mejoramiento y control de procesos" },
    { icono: <BarChart size={32} />, titulo: "Informes mensuales detallados" },
    { icono: <ClipboardCheck size={32} />, titulo: "Diagnóstico de situación actual" },
    { icono: <HeartHandshake size={32} />, titulo: "Reducción de ausentismo" }
  ];

  // Duplicamos la lista para que el carrusel infinito sea fluido y no se corte
  const beneficiosDuplicados = [...beneficios, ...beneficios];

  return (
    <div className="animate-fade-in">
      
      {/* HERO SECTION */}
      <div className="bg-brand-blue text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-brand-gold-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-blue-light/50 text-brand-gold-light text-sm font-bold px-4 py-2 rounded-full mb-8 border border-brand-light/30">
              <ShieldCheck size={16} /> Especialistas en Prestaciones Económicas
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Recuperamos la cartera que <span className="text-brand-gold">dabas por perdida.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed font-light">
              Recuperamos tus prestaciones de incapacidades y licencias ante EPS y ARL. Cuidamos tu flujo de caja.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/servicios" className="w-full sm:w-auto bg-brand-gold text-brand-blue font-bold py-4 px-8 rounded-xl hover:bg-brand-gold-light transition-transform hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(201,166,70,0.39)] flex items-center justify-center gap-2 text-lg">
                Conoce nuestros servicios <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE MÉTRICAS ANIMADA Y CON HOVER */}
      <div className="bg-white border-b border-gray-200 py-10 relative z-20 -mt-8 mx-6 md:mx-auto max-w-5xl rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="px-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-5xl font-black text-brand-blue mb-2 group-hover:text-brand-light transition-colors">
              <ContadorAnimado fin={15000} prefijo="+" />
            </h3>
            <p className="text-sm text-brand-gray font-bold uppercase tracking-wide">Incapacidades Gestionadas</p>
          </div>
          <div className="px-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-5xl font-black text-brand-gold mb-2 group-hover:scale-110 transition-transform inline-block">
              <ContadorAnimado fin={98} sufijo="%" />
            </h3>
            <p className="text-sm text-brand-gray font-bold uppercase tracking-wide">Efectividad de Recobro</p>
          </div>
          <div className="px-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-5xl font-black text-brand-blue mb-2 group-hover:text-brand-light transition-colors">
              <ContadorAnimado fin={24} sufijo="/7" />
            </h3>
            <p className="text-sm text-brand-gray font-bold uppercase tracking-wide">Trazabilidad en tiempo real</p>
          </div>
        </div>
      </div>

      {/* CARRUSEL DE BENEFICIOS */}
      <div className="py-20 bg-brand-bg overflow-hidden border-b border-gray-200">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4">Beneficios que tu empresa podrá encontrar</h2>
          <p className="text-lg text-brand-gray">Soluciones integrales diseñadas para el crecimiento de tu organización.</p>
        </div>
        
        {/* Contenedor del Carrusel Infinito */}
        <div className="relative w-full overflow-hidden flex">
          {/* Sombras en los bordes para difuminar la entrada/salida */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee gap-6 px-4 py-4 flex">
            {beneficiosDuplicados.map((item, index) => (
              <div key={index} className="bg-white min-w-[280px] p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-brand-blue-light/10 text-brand-blue rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  {item.icono}
                </div>
                <h4 className="font-bold text-brand-blue leading-tight">{item.titulo}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN DE SERVICIOS */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mb-4">Portafolio de Especialidades</h2>
            <p className="text-xl text-brand-gray">Selecciona tu perfil para descubrir cómo recuperamos tu dinero.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-brand-bg p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:bg-brand-blue hover:-translate-y-3 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-brand-blue text-brand-gold rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-brand-blue transition-colors shadow-md">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-3 group-hover:text-brand-gold transition-colors">Empresas (B2B)</h3>
              <p className="text-brand-gray group-hover:text-blue-100 transition-colors leading-relaxed">
                ¿Sabías que muchas empresas pierden ingresos por incapacidades o licencias sin gestionar el recobro adecuadamente? Aseguramos tu flujo de caja.
              </p>
            </div>
            
            <div className="group bg-brand-bg p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:bg-brand-blue hover:-translate-y-3 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-brand-blue text-brand-gold rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-brand-blue transition-colors shadow-md">
                <FileCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-3 group-hover:text-brand-gold transition-colors">Independientes</h3>
              <p className="text-brand-gray group-hover:text-blue-100 transition-colors leading-relaxed">
                En RAPICOBRO te ayudamos a recuperar el cobro de incapacidades, licencia de maternidad y paternidad ante EPS y ARL sin dolores de cabeza.
              </p>
            </div>

            <div className="group bg-brand-bg p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:bg-brand-blue hover:-translate-y-3 transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-brand-gold"></div>
              <div className="w-16 h-16 bg-brand-blue text-brand-gold rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-brand-blue transition-colors shadow-md">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-3 group-hover:text-brand-gold transition-colors">Asesoría Jurídica</h3>
              <p className="text-brand-gray group-hover:text-blue-100 transition-colors leading-relaxed">
                Tutelas en salud, desacatos, derechos de petición y defensa ante vulneración de derechos como negación de cirugías o medicamentos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICIOS QUE APOYAN NUESTRA GESTIÓN */}
      <div className="bg-brand-blue py-24 text-white relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C9A646 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Servicios que apoyan nuestra gestión</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-brand-blue-light border border-brand-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Gavel size={36} className="text-brand-gold group-hover:text-brand-blue" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wide">Gestión<br/>Jurídica</h4>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-brand-blue-light border border-brand-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Users size={36} className="text-brand-gold group-hover:text-brand-blue" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wide">Gestión<br/>Operativa</h4>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-brand-blue-light border border-brand-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <ShieldCheck size={36} className="text-brand-gold group-hover:text-brand-blue" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wide">Gestión<br/>de Calidad</h4>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-brand-blue-light border border-brand-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Briefcase size={36} className="text-brand-gold group-hover:text-brand-blue" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wide">Gestión<br/>Administrativa</h4>
            </div>

            <div className="flex flex-col items-center group col-span-2 md:col-span-1">
              <div className="w-20 h-20 bg-brand-blue-light border border-brand-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Truck size={36} className="text-brand-gold group-hover:text-brand-blue" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wide">Gestión<br/>Logística</h4>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}