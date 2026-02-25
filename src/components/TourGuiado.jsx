"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CheckCircle2, ShieldCheck, MessageCircle, FileSignature } from 'lucide-react';

const TourGuiado = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [visible, setVisible] = useState(false);

  // Verificamos si es la primera vez que el usuario entra a la web
  useEffect(() => {
    const tourCompletado = localStorage.getItem('rapicobro_tour_v1');
    if (!tourCompletado) {
      // Damos 1.5 segundos de respiro antes de mostrar el tour
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const cerrarTour = () => {
    setVisible(false);
    localStorage.setItem('rapicobro_tour_v1', 'true'); // Guardamos para que no vuelva a salir
  };

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      cerrarTour();
    }
  };

  const pasos = [
    {
      titulo: "¡Bienvenido a RAPICOBRO!",
      descripcion: "Tu dinero y tu salud son nuestra prioridad. Estamos aquí para recuperar las prestaciones económicas que dabas por perdidas ante EPS y ARL.",
      icono: <ShieldCheck size={48} className="text-brand-gold" />
    },
    {
      titulo: "Elige tu perfil",
      descripcion: "En la sección de 'Servicios' encontrarás soluciones diseñadas a la medida si eres un Trabajador Independiente, una Empresa, o si necesitas Asesoría Jurídica.",
      icono: <CheckCircle2 size={48} className="text-brand-gold" />
    },
    {
      titulo: "Atención inmediata",
      descripcion: "No tienes que dar vueltas. En la esquina inferior derecha siempre verás nuestro botón de WhatsApp para hablar directamente con un asesor legal.",
      icono: <MessageCircle size={48} className="text-brand-gold" />
    },
    {
      titulo: "Firma Digital Segura",
      descripcion: "Todo nuestro proceso está avalado por la ley. Al final de la página (Footer) podrás leer, firmar y descargar tus documentos legales sin salir de casa.",
      icono: <FileSignature size={48} className="text-brand-gold" />
    }
  ];

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative transform transition-all">
        
        {/* Botón de cerrar superior */}
        <button 
          onClick={cerrarTour}
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-blue transition-colors z-10 bg-gray-100 rounded-full p-1"
        >
          <X size={20} />
        </button>

        {/* Cabecera decorativa */}
        <div className="bg-brand-blue-light/10 pt-10 pb-6 flex justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            {/* Barra de progreso */}
            <div 
              className="h-full bg-brand-gold transition-all duration-500 ease-out"
              style={{ width: `${((pasoActual + 1) / pasos.length) * 100}%` }}
            ></div>
          </div>
          <div className="relative z-10 bg-white p-4 rounded-full shadow-lg border-4 border-brand-bg">
            {pasos[pasoActual].icono}
          </div>
        </div>

        {/* Contenido del paso */}
        <div className="p-8 text-center min-h-[200px] flex flex-col justify-center">
          <h3 className="text-2xl font-black text-brand-blue mb-4">
            {pasos[pasoActual].titulo}
          </h3>
          <p className="text-brand-gray text-lg leading-relaxed">
            {pasos[pasoActual].descripcion}
          </p>
        </div>

        {/* Controles de navegación */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={cerrarTour}
            className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors px-4 py-2"
          >
            Omitir tour
          </button>
          
          <div className="flex gap-2">
            {pasos.map((_, index) => (
              <div 
                key={index} 
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === pasoActual ? 'bg-brand-gold' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>

          <button 
            onClick={siguientePaso}
            className="flex items-center gap-2 bg-brand-blue text-brand-gold font-bold px-6 py-3 rounded-xl hover:bg-brand-blue-light transition-colors shadow-md"
          >
            {pasoActual === pasos.length - 1 ? '¡Empezar!' : 'Siguiente'}
            {pasoActual < pasos.length - 1 && <ChevronRight size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TourGuiado;