"use client";

import React, { useState, useRef } from 'react';
import { FileSignature, Printer, PenTool, Eraser, CheckCircle2 } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

export default function AutorizacionDatos() {
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
            <FileSignature size={28} className="text-brand-light" />
            Documento Legal
          </h1>
          <button onClick={() => window.print()} className="bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center">
            <Printer size={20} /> Guardar como PDF / Imprimir
          </button>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-xl shadow-md border border-gray-200 text-gray-800 text-justify leading-relaxed mx-auto print:shadow-none print:border-none print:p-8">
          <h2 className="text-xl font-bold text-center mb-8 uppercase tracking-wide">
            1. Formato de Autorización para el Tratamiento de Datos Personales Sensibles
          </h2>

          <p className="mb-6 leading-loose">
            Yo, <input type="text" placeholder="Escribe tu nombre completo" className="border-b border-gray-400 focus:border-brand-blue focus:outline-none w-64 md:w-80 bg-transparent text-center font-semibold text-brand-blue print:text-black" />, identificado(a) con cédula de ciudadanía No. <input type="text" placeholder="Tu número de documento" className="border-b border-gray-400 focus:border-brand-blue focus:outline-none w-48 bg-transparent text-center font-semibold text-brand-blue print:text-black" />, actuando en nombre propio, autorizo de manera previa, expresa, libre e informada a <strong>RadicaSalud Legal S.A.S.</strong>, identificada con NIT <strong>901.234.567-8</strong>, con domicilio en <strong>Mosquera, Cundinamarca</strong>, en calidad de Responsable del Tratamiento, para recolectar, almacenar, usar, transmitir y suprimir mis datos personales, incluyendo datos sensibles relacionados con mi estado de salud.
          </p>

          <h3 className="font-bold text-lg mt-8 mb-3">1. Finalidad del tratamiento</h3>
          <p className="mb-2">Autorizo el tratamiento de mis datos para:</p>
          <ul className="list-disc pl-8 mb-6 space-y-2">
            <li>Gestionar la radicación de incapacidades médicas ante EPS, IPS, ARL o empleadores.</li>
            <li>Realizar seguimiento del trámite y gestionar correcciones.</li>
            <li>Contactarme para informar el estado del proceso.</li>
            <li>Cumplir obligaciones legales y conservar información probatoria.</li>
          </ul>

          <h3 className="font-bold text-lg mt-8 mb-3">2. Datos sensibles y Derechos del titular</h3>
          <p className="mb-4">Entiendo que los datos relativos a mi salud son considerados sensibles y no estoy obligado(a) a autorizarlos, pero reconozco que son necesarios para el servicio.</p>
          <p className="mb-6">Declaro conocer que puedo conocer, actualizar, rectificar, suprimir mis datos o revocar esta autorización enviando un correo a <strong>legal@radicasalud.com.co</strong>.</p>

          <h3 className="font-bold text-lg mt-8 mb-3">3. Vigencia</h3>
          <p className="mb-12">La autorización estará vigente mientras exista relación contractual o sea necesario legalmente.</p>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div>
                <p className="font-bold text-gray-500 mb-2">Firma del Titular:</p>
                
                {firmaGuardada ? (
                  <div className="relative group">
                    <img src={firmaGuardada} alt="Firma digital" className="h-24 object-contain border-b border-gray-800 w-full mb-2" />
                    <button onClick={rehacerFirma} className="absolute top-0 right-0 bg-red-100 text-red-600 p-1 rounded-md text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                      X Borrar
                    </button>
                  </div>
                ) : mostrarPad ? (
                  <div className="print:hidden">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-2 overflow-hidden">
                      <SignatureCanvas 
                        ref={sigCanvas} 
                        penColor="#0A2540"
                        canvasProps={{className: 'w-full h-32 cursor-crosshair'}} 
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={limpiarFirma} className="w-1/3 flex items-center justify-center gap-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 text-sm font-semibold">
                        <Eraser size={16} /> Limpiar
                      </button>
                      <button onClick={guardarFirma} className="w-2/3 flex items-center justify-center gap-1 bg-brand-green text-white py-2 rounded-md hover:bg-green-700 text-sm font-bold shadow-sm">
                        <CheckCircle2 size={16} /> Aplicar Firma
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-800 h-24 mb-2 flex items-end pb-2">
                    <button onClick={() => setMostrarPad(true)} className="flex items-center gap-2 text-brand-light font-bold hover:text-brand-blue transition-colors print:hidden">
                      <PenTool size={18} /> Clic para firmar digitalmente
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">Firma Electrónica Simple (Ley 527 de 1999)</p>
              </div>

              <div className="flex flex-col justify-end">
                <input type="date" className="border-b border-gray-800 focus:border-brand-blue focus:outline-none w-full bg-transparent text-gray-700 font-semibold mb-2 pb-1 print:text-black" />
                <p className="font-bold text-gray-500">Fecha de aceptación</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}