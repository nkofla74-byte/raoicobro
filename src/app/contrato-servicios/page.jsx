"use client";

import React, { useState, useRef } from 'react';
import { FileText, Printer, PenTool, Eraser, CheckCircle2 } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

export default function ContratoServicios() {
  const sigCanvas = useRef({});
  const [firmaGuardada, setFirmaGuardada] = useState(null);
  const [mostrarPad, setMostrarPad] = useState(false);

  const limpiarFirma = () => sigCanvas.current.clear();

  const guardarFirma = () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Por favor, dibuja tu firma antes de guardar.');
      return;
    }
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setFirmaGuardada(dataURL);
    setMostrarPad(false);
  };

  const rehacerFirma = () => {
    setFirmaGuardada(null);
    setMostrarPad(true);
  };

  return (
    <div className="bg-brand-bg min-h-screen py-12 animate-fade-in print:bg-white print:py-0">
      <div className="container mx-auto px-4 max-w-4xl print:max-w-full print:px-0">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 print:hidden gap-4">
          <h1 className="text-2xl font-bold text-brand-blue flex items-center gap-2">
            <FileText size={28} className="text-brand-light" />
            Contrato Comercial
          </h1>
          <button onClick={() => window.print()} className="bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center">
            <Printer size={20} /> Guardar como PDF / Imprimir
          </button>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-xl shadow-md border border-gray-200 text-gray-800 text-justify leading-relaxed mx-auto print:shadow-none print:border-none print:p-8">
          <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide">
            2. Contrato de Prestación de Servicios de Gestión Administrativa
          </h2>

          <p className="mb-6">Entre los suscritos a saber:</p>
          <p className="mb-6">
            <strong>RadicaSalud Legal S.A.S.</strong>, identificada con NIT <strong>901.234.567-8</strong>, con domicilio en <strong>Mosquera, Cundinamarca</strong>, quien en adelante se denominará “EL PRESTADOR”,
          </p>
          <p className="mb-6 text-center font-bold">Y</p>
          <p className="mb-8 leading-loose">
            <input type="text" placeholder="Nombre completo del cliente" className="border-b border-gray-400 focus:border-brand-blue focus:outline-none w-64 md:w-80 bg-transparent text-center font-semibold text-brand-blue print:text-black" />, identificado(a) con cédula No. <input type="text" placeholder="Número de documento" className="border-b border-gray-400 focus:border-brand-blue focus:outline-none w-48 bg-transparent text-center font-semibold text-brand-blue print:text-black" />, quien en adelante se denominará “EL CLIENTE”, se celebra el presente contrato de prestación de servicios, regido por las siguientes cláusulas:
          </p>

          <h3 className="font-bold text-lg mt-8 mb-2">CLÁUSULA PRIMERA – OBJETO Y NATURALEZA</h3>
          <p className="mb-2">EL PRESTADOR se obliga a radicar incapacidades médicas y hacer seguimiento del trámite. El servicio es de gestión documental. EL PRESTADOR no garantiza la aprobación de la incapacidad, el reconocimiento económico ni los tiempos de respuesta de la EPS/ARL.</p>

          <h3 className="font-bold text-lg mt-8 mb-2">CLÁUSULA SEGUNDA – HONORARIOS</h3>
          <p className="mb-6">El CLIENTE pagará a EL PRESTADOR la suma de $<input type="text" placeholder="Ej. 50.000" className="border-b border-gray-400 focus:border-brand-blue focus:outline-none w-32 bg-transparent text-center font-semibold text-brand-blue print:text-black" /> M/CTE, según las condiciones acordadas previamente.</p>

          <h3 className="font-bold text-lg mt-8 mb-2">CLÁUSULA TERCERA – RESPONSABILIDAD</h3>
          <p className="mb-6">EL PRESTADOR no será responsable por negativas de entidades externas ni por información falsa entregada por el CLIENTE.</p>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div>
                <p className="font-bold text-gray-500 mb-2">EL PRESTADOR:</p>
                <div className="h-24 border-b border-gray-800 flex items-center justify-center">
                   <span className="font-serif italic text-3xl text-blue-900 opacity-60">RadicaSalud S.A.S.</span>
                </div>
                <p className="font-bold mt-2">Representante Legal</p>
                <p className="text-sm text-gray-500">RadicaSalud Legal S.A.S.</p>
              </div>

              <div>
                <p className="font-bold text-gray-500 mb-2">EL CLIENTE:</p>
                {firmaGuardada ? (
                  <div className="relative group">
                    <img src={firmaGuardada} alt="Firma del cliente" className="h-24 object-contain border-b border-gray-800 w-full mb-2" />
                    <button onClick={rehacerFirma} className="absolute top-0 right-0 bg-red-100 text-red-600 p-1 rounded-md text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                      X Borrar
                    </button>
                  </div>
                ) : mostrarPad ? (
                  <div className="print:hidden">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-2 overflow-hidden">
                      <SignatureCanvas ref={sigCanvas} penColor="#0A2540" canvasProps={{className: 'w-full h-32 cursor-crosshair'}} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={limpiarFirma} className="w-1/3 flex items-center justify-center gap-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 text-sm font-semibold"><Eraser size={16} /> Limpiar</button>
                      <button onClick={guardarFirma} className="w-2/3 flex items-center justify-center gap-1 bg-brand-green text-white py-2 rounded-md hover:bg-green-700 text-sm font-bold shadow-sm"><CheckCircle2 size={16} /> Aplicar Firma</button>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-800 h-24 mb-2 flex items-end pb-2">
                    <button onClick={() => setMostrarPad(true)} className="flex items-center gap-2 text-brand-light font-bold hover:text-brand-blue transition-colors print:hidden">
                      <PenTool size={18} /> Clic para firmar digitalmente
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">Aceptación electrónica contractual</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}