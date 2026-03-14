"use client";

import React, { useState, useRef } from 'react';
import { FileSignature, Printer, PenTool, Eraser, CheckCircle2, RotateCcw } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

export default function AutorizacionDatos() {
  const sigCanvas = useRef({});
  const [firmaGuardada, setFirmaGuardada] = useState(null);
  const [mostrarPad, setMostrarPad] = useState(false);
  
  // Estado para los datos del formulario basado en el PDF
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limpiarFirma = () => sigCanvas.current.clear();

  const guardarFirma = () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Por favor, dibuja tu firma antes de aplicar.');
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
    <div className="bg-slate-50 min-h-screen py-12 animate-in fade-in duration-500 print:bg-white print:py-0 font-sans">
      <div className="container mx-auto px-4 max-w-4xl print:max-w-full print:px-0">
        
        {/* Acciones de Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 print:hidden gap-4">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileSignature size={28} className="text-blue-600" />
            Documento de Autorización
          </h1>
          <button 
            onClick={() => window.print()} 
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
          >
            <Printer size={20} /> Guardar como PDF / Imprimir
          </button>
        </div>

        {/* Cuerpo del Documento (RAPICOBRO) */}
        <div className="bg-white p-10 md:p-16 rounded-xl shadow-xl border border-gray-100 text-gray-800 text-justify leading-relaxed mx-auto print:shadow-none print:border-none print:p-8">
          
          {/* Logo / Encabezado del PDF */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-black text-blue-900 tracking-tighter italic">RAPICOBRO</h2>
            <p className="text-xs uppercase font-bold text-gray-500 tracking-widest -mt-1">Especialistas en cobro de incapacidades</p>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl font-bold uppercase tracking-tight border-b-2 border-gray-800 inline-block pb-1">
              1. Formato de Autorización para el Tratamiento de Datos
            </h2>
          </div>

          <p className="mb-8 text-lg leading-loose">
            Yo, 
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Escribe tu nombre completo" 
              className="mx-2 border-b border-gray-400 focus:border-blue-600 focus:outline-none w-64 md:w-80 bg-transparent text-center font-bold text-blue-800 print:text-black print:border-transparent" 
            />, 
            identificado(a) con cédula de ciudadanía No. 
            <input 
              type="text" 
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="Número de documento" 
              className="mx-2 border-b border-gray-400 focus:border-blue-600 focus:outline-none w-48 bg-transparent text-center font-bold text-blue-800 print:text-black print:border-transparent" 
            />, 
            actuando en nombre propio, autorizo de manera previa, expresa, libre e informada a 
            <strong> RAPICOBRO</strong>, identificada con NIT <strong>[Insertar NIT]</strong>, 
            con domicilio en <strong>Bogotá Cundinamarca</strong>, en calidad de Responsable del Tratamiento, 
            para recolectar, almacenar, usar, transmitir, incluyendo datos relacionados con mi estado de salud.
          </p>

          <h3 className="font-bold text-lg mt-8 mb-3">1. Finalidad del tratamiento</h3>
          <p className="mb-2">Autorizo el tratamiento de mis datos para:</p>
          <ul className="list-disc pl-8 mb-6 space-y-2">
            <li>Gestionar la radicación de incapacidades médicas ante EPS, ARL.</li>
            <li>Realizar seguimiento del trámite y gestionar.</li>
            <li>Contactar para informar el estado del proceso.</li>
            <li>Cumplir obligaciones legales y conservar información probatoria.</li>
          </ul>

          <h3 className="font-bold text-lg mt-8 mb-3">2. Datos sensibles y Derechos del titular</h3>
          <p className="mb-4">Entiendo que los datos relativos a mi salud son considerados sensibles y no estoy obligado a autorizarlos, pero reconozco que son necesarios para el servicio.</p>
          <p className="mb-6">Declaro conocer que puedo conocer, actualizar, rectificar, suprimir mis datos o revocar esta autorización enviando un correo a <strong>rapicobro1@gmail.com</strong>.</p>

          <h3 className="font-bold text-lg mt-8 mb-3">3. Vigencia</h3>
          <p className="mb-12">La autorización estará vigente mientras exista relación contractual o sea necesario legalmente.</p>

          {/* Sección de Firma */}
          <div className="mt-20 pt-10 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
              
              <div className="relative">
                <p className="font-bold text-gray-600 text-sm mb-4">Firma del Titular:</p>
                
                {firmaGuardada ? (
                  <div className="relative group border-b border-gray-900 pb-2">
                    <img src={firmaGuardada} alt="Firma" className="h-24 mx-auto object-contain" />
                    <button 
                      onClick={rehacerFirma} 
                      className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity print:hidden border border-red-100"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                ) : mostrarPad ? (
                  <div className="print:hidden">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-3 overflow-hidden">
                      <SignatureCanvas 
                        ref={sigCanvas} 
                        penColor="#000"
                        canvasProps={{className: 'w-full h-32 cursor-crosshair'}} 
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={limpiarFirma} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded hover:bg-gray-200 text-xs font-bold uppercase">
                        Limpiar
                      </button>
                      <button onClick={guardarFirma} className="flex-[2] bg-blue-900 text-white py-2 rounded hover:bg-black text-xs font-bold uppercase shadow-sm">
                        Aplicar Firma
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-800 h-24 mb-2 flex items-center justify-center print:hidden">
                    <button 
                      onClick={() => setMostrarPad(true)} 
                      className="flex items-center gap-2 text-blue-700 font-bold border-2 border-blue-700 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                    >
                      <PenTool size={18} /> Firmar Digitalmente
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-gray-500 mt-2">Firma Electrónica Simple (Ley 527 de 1999)</p>
              </div>

              <div className="flex flex-col">
                <p className="font-bold text-gray-600 text-sm mb-4 text-right">Fecha de aceptación</p>
                <input 
                  type="date" 
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="border-b border-gray-900 focus:outline-none w-full bg-transparent text-gray-800 font-bold text-center pb-2 print:border-transparent" 
                />
              </div>

            </div>
          </div>
          
          {/* Marca de RAPICOBRO en pie de página */}
          <div className="mt-12 text-center opacity-20 hidden print:block">
            <p className="text-sm font-black italic">RAPICOBRO</p>
          </div>

        </div>
      </div>
    </div>
  );
}