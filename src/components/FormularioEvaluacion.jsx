"use client";

import React, { useState } from 'react';
import { sileo } from 'sileo';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const FormularioEvaluacion = () => {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({ eps: '', tipo: '', nombre: '', telefono: '', aceptaDatos: false });

  const avanzarPaso = () => setPaso(paso + 1);
  const retrocederPaso = () => setPaso(paso - 1);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDatos({ ...datos, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datos.aceptaDatos) return;

    sileo.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: { title: 'Procesando de forma segura...' },
        success: { title: 'Incapacidad Recibida', description: 'Te notificaremos en máximo 24 horas.' },
        error: { title: 'Error de conexión. Intenta de nuevo.' },
      }
    ).then(() => {
      setPaso(4);
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md relative">
      {/* Barra de progreso simple */}
      {paso < 4 && (
        <div className="flex mb-8 space-x-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`h-2 flex-1 rounded-full transition-colors duration-300 ${paso >= item ? 'bg-brand-blue' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      )}

      {paso === 1 && (
        <div className="animate-fade-in">
          <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-2">Entidad de salud</h3>
          <p className="text-brand-gray mb-6 text-sm">¿A qué EPS o entidad pertenece la incapacidad?</p>
          <select name="eps" value={datos.eps} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg mb-6 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all bg-white text-brand-gray text-lg">
            <option value="">Seleccione una opción...</option>
            <option value="nueva_eps">Nueva EPS</option>
            <option value="sura">EPS SURA</option>
            <option value="sanitas">EPS Sanitas</option>
            <option value="otra">Otra entidad</option>
          </select>
          <button onClick={avanzarPaso} disabled={!datos.eps} className="w-full bg-brand-blue text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg">
            Continuar <ArrowRight size={20} />
          </button>
        </div>
      )}

      {paso === 2 && (
        <div className="animate-fade-in">
          <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-4">Tipo de incapacidad</h3>
          <div className="space-y-3 mb-8">
            {['Incapacidad General', 'Licencia Maternidad/Paternidad', 'Accidente Laboral'].map((tipo) => (
              <label key={tipo} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${datos.tipo === tipo ? 'border-brand-blue bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                <input type="radio" name="tipo" value={tipo} onChange={handleChange} checked={datos.tipo === tipo} className="w-5 h-5 text-brand-blue border-gray-300 focus:ring-brand-blue" />
                <span className="ml-3 text-brand-gray font-medium text-lg">{tipo}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={retrocederPaso} className="w-1/3 text-brand-gray font-medium py-4 border border-gray-300 rounded-lg hover:bg-gray-100">Volver</button>
            <button onClick={avanzarPaso} disabled={!datos.tipo} className="w-2/3 bg-brand-blue text-white font-bold py-4 rounded-lg hover:bg-blue-900 disabled:bg-gray-300 flex justify-center items-center gap-2">
              Continuar <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="animate-fade-in">
          <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-4">Tus datos de contacto</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre completo" value={datos.nombre} onChange={handleChange} required className="w-full p-4 mb-4 border border-gray-300 rounded-lg outline-none focus:border-brand-blue text-lg" />
            <input type="tel" name="telefono" placeholder="Teléfono celular" value={datos.telefono} onChange={handleChange} required className="w-full p-4 mb-6 border border-gray-300 rounded-lg outline-none focus:border-brand-blue text-lg" />
            
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <label className="flex items-start cursor-pointer">
                <input type="checkbox" name="aceptaDatos" checked={datos.aceptaDatos} onChange={handleChange} required className="mt-1 mr-3 w-5 h-5 rounded text-brand-blue focus:ring-brand-blue" />
                <span className="text-sm text-brand-gray">
                  Acepto el tratamiento de datos para la gestión de mi incapacidad (Ley 1581).
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={retrocederPaso} className="w-1/3 text-brand-gray font-medium py-4 border border-gray-300 rounded-lg hover:bg-gray-100">Volver</button>
              {/* Botón VERDE DE ACCIÓN FUERTE */}
              <button type="submit" disabled={!datos.aceptaDatos} className="w-2/3 bg-brand-green text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 shadow-md flex justify-center items-center gap-2 text-lg">
                <ShieldCheck size={22} /> Iniciar trámite
              </button>
            </div>
          </form>
        </div>
      )}

      {paso === 4 && (
        <div className="text-center animate-fade-in py-6">
          <CheckCircle2 size={64} className="text-brand-green mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-brand-blue mb-2">Trámite Iniciado</h3>
          {/* Mensaje de confirmación empático */}
          <p className="text-brand-gray text-lg">Tu incapacidad fue recibida correctamente. Te notificaremos al <b>{datos.telefono}</b> en máximo 24 horas.</p>
        </div>
      )}
    </div>
  );
};

export default FormularioEvaluacion;