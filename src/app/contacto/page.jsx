"use client";

import React, { useState, useRef } from 'react';
import { sileo } from 'sileo';
import { Mail, Phone, MapPin, Send, Lock, CheckCircle2, Building2, UploadCloud, File, X } from 'lucide-react';
// IMPORTANTE: Ajustamos la ruta para que encuentre tu archivo supabaseClient.js que está en src/
import { supabase } from '../../lib/supabaseClient';
export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [archivo, setArchivo] = useState(null); // Estado para el archivo adjunto
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    tipoConsulta: '',
    mensaje: '',
    aceptaDatos: false
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDatos({ ...datos, [e.target.name]: value });
  };

  // Función para manejar la selección del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validamos el tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        sileo.error('El archivo es muy pesado. Máximo 5MB.');
        return;
      }
      setArchivo(file);
    }
  };

  // Función para quitar el archivo seleccionado
  const removerArchivo = () => {
    setArchivo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datos.aceptaDatos) return;
    
    setEnviando(true);

    sileo.promise(
      new Promise(async (resolve, reject) => {
        try {
          // 1. GESTIÓN DEL CLIENTE
          let clienteId;
          const { data: clienteExistente, error: errorBusqueda } = await supabase
            .from('clientes')
            .select('id')
            .eq('correo', datos.correo)
            .maybeSingle();

          if (errorBusqueda) throw errorBusqueda;

          if (clienteExistente) {
            clienteId = clienteExistente.id;
          } else {
            const { data: nuevoCliente, error: errorCrearCliente } = await supabase
              .from('clientes')
              .insert([{
                nombre_completo: datos.nombre,
                telefono: datos.telefono,
                correo: datos.correo,
                tipo_cliente: datos.tipoConsulta === 'Independiente' || datos.tipoConsulta === 'Empresas' || datos.tipoConsulta === 'Asesoria Juridica' || datos.tipoConsulta === 'Otro' ? datos.tipoConsulta : 'Otro',
                acepta_tratamiento_datos: datos.aceptaDatos
              }])
              .select('id')
              .single();
              
            if (errorCrearCliente) throw errorCrearCliente;
            clienteId = nuevoCliente.id;
          }

          // 2. CREACIÓN DEL CASO
          const radicadoUnico = `REQ-${Math.floor(Math.random() * 90000) + 10000}`;

          const { data: nuevoCaso, error: errorCaso } = await supabase
            .from('casos')
            .insert([{
              cliente_id: clienteId,
              numero_radicado: radicadoUnico,
              tipo_servicio: 'Contacto Web - ' + datos.tipoConsulta,
              descripcion: datos.mensaje,
              estado: 'Nuevo'
            }])
            .select('id')
            .single();

          if (errorCaso) throw errorCaso;

          // 3. SUBIDA DEL ARCHIVO AL STORAGE (Si el usuario adjuntó uno)
          if (archivo) {
            // Generamos un nombre único para el archivo (fecha + nombre original limpio)
            const fileExt = archivo.name.split('.').pop();
            const fileName = `${Date.now()}_${radicadoUnico}.${fileExt}`;
            const filePath = `${clienteId}/${fileName}`; // Lo guardamos en una carpeta con el ID del cliente

            // Subimos al bucket 'documentos_clientes'
            const { error: errorStorage } = await supabase.storage
              .from('documentos_clientes')
              .upload(filePath, archivo);

            if (errorStorage) throw errorStorage;

            // Obtenemos la URL pública (aunque el bucket sea privado, esta URL sirve para referenciarlo internamente)
            const { data: publicUrlData } = supabase.storage
              .from('documentos_clientes')
              .getPublicUrl(filePath);

            // Guardamos el registro en la tabla 'documentos'
            const { error: errorDocBD } = await supabase
              .from('documentos')
              .insert([{
                caso_id: nuevoCaso.id,
                tipo_documento: 'Documento Adjunto Web',
                ruta_archivo: filePath
              }]);

            if (errorDocBD) throw errorDocBD;
          }

          resolve();
        } catch (error) {
          console.error("Error en BD:", error);
          reject();
        }
      }),
      {
        loading: { title: 'Radicando solicitud y subiendo archivos...' },
        success: { title: 'Solicitud radicada con éxito' },
        error: { title: 'Error de conexión. Intenta nuevamente.' },
      }
    ).then(() => {
      setEnviando(false);
      setEnviado(true);
      setDatos({ nombre: '', telefono: '', correo: '', tipoConsulta: '', mensaje: '', aceptaDatos: false });
      setArchivo(null);
    }).catch(() => {
      setEnviando(false);
    });
  };

  return (
    <div className="bg-brand-bg min-h-screen py-16 animate-fade-in">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">
            Estamos aquí para escucharte
          </h1>
          <p className="text-xl text-brand-gray">
            ¿Tienes dudas sobre un trámite en curso, quieres información para tu empresa o necesitas asesoría general? Escríbenos y un experto te guiará.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Panel Izquierdo */}
          <div className="lg:w-2/5 bg-brand-blue p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-light rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-brand-gold">Información de contacto</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="text-brand-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Líneas de Atención</h4>
                    <p className="text-blue-100 font-medium tracking-wide">301 256 0585</p>
                    <p className="text-blue-100 font-medium tracking-wide">350 709 8899</p>
                    <p className="text-sm text-brand-gold-light mt-2">Lunes a Viernes: 8:00 am - 5:00 pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-brand-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Correo Electrónico</h4>
                    <p className="text-blue-100">rapicobro1@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Building2 className="text-brand-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Sede Principal</h4>
                    <p className="text-blue-100">Bogotá, D.C.</p>
                    <p className="text-sm text-brand-gold-light mt-1">Localidad de Engativá</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-brand-blue-light/30 rounded-xl border border-brand-gold/20 relative z-10 backdrop-blur-sm">
              <p className="text-sm text-blue-100 leading-relaxed">
                <strong>¿Atención rápida?</strong><br/> 
                Si prefieres no llenar formularios, haz clic en el botón flotante de WhatsApp y habla con nosotros al instante.
              </p>
            </div>
          </div>

          {/* Formulario Derecho */}
          <div className="lg:w-3/5 p-10 md:p-12 bg-white relative z-10">
            {!enviado ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-blue mb-6">Envíanos un mensaje</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-gray">Nombre completo</label>
                    <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} required 
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-gray-50 hover:bg-white" 
                      placeholder="Ej. Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-gray">Número de celular</label>
                    <input type="tel" inputMode="numeric" name="telefono" value={datos.telefono} onChange={handleChange} required 
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-gray-50 hover:bg-white" 
                      placeholder="Ej. 300 123 4567" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-gray">Correo electrónico</label>
                    <input type="email" name="correo" value={datos.correo} onChange={handleChange} required 
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-gray-50 hover:bg-white" 
                      placeholder="tucorreo@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-gray">Tipo de consulta</label>
                    <select name="tipoConsulta" value={datos.tipoConsulta} onChange={handleChange} required
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-gray-50 hover:bg-white text-brand-gray cursor-pointer">
                      <option value="">Selecciona una opción...</option>
                      <option value="Independiente">Trabajador Independiente</option>
                      <option value="Empresas">Información para Empresas</option>
                      <option value="Asesoria Juridica">Asesoría Jurídica</option>
                      <option value="Otro">Otro asunto</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-gray">Mensaje o Detalles del Trámite</label>
                  <textarea name="mensaje" value={datos.mensaje} onChange={handleChange} required rows="3"
                    className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all bg-gray-50 hover:bg-white resize-none" 
                    placeholder="Escribe aquí los detalles de tu incapacidad o consulta..."></textarea>
                </div>

                {/* --- ÁREA DE CARGA DE ARCHIVOS --- */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-gray">Adjuntar Documento (Opcional)</label>
                  <p className="text-xs text-gray-500 mb-2">Sube tu historia clínica o incapacidad (PDF, JPG, PNG. Máx 5MB).</p>
                  
                  {!archivo ? (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-brand-blue/5 hover:border-brand-gold transition-all cursor-pointer group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} className="text-brand-gold" />
                      </div>
                      <p className="text-sm font-bold text-brand-blue text-center">Haz clic para buscar tu archivo</p>
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".pdf, image/jpeg, image/png" 
                      />
                    </div>
                  ) : (
                    <div className="border border-brand-gold/30 bg-brand-gold/5 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0">
                          <File size={20} className="text-brand-gold" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-bold text-brand-blue truncate">{archivo.name}</p>
                          <p className="text-xs text-gray-500">{(archivo.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={removerArchivo}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
                        title="Quitar archivo"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mt-4">
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" name="aceptaDatos" checked={datos.aceptaDatos} onChange={handleChange} required 
                      className="mt-1 mr-3 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-gold cursor-pointer" />
                    <span className="text-sm text-brand-gray leading-tight group-hover:text-brand-blue transition-colors">
                      Acepto la <a href="#politica" className="text-brand-blue font-bold hover:text-brand-gold underline decoration-brand-gold/30 underline-offset-2 transition-colors">Política de Tratamiento de Datos Personales</a>. Entiendo que mi información será usada exclusivamente para dar respuesta a esta solicitud según la Ley 1581 de 2012.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={!datos.aceptaDatos || enviando} 
                  className="w-full bg-brand-gold text-brand-blue font-bold py-4 px-8 rounded-xl shadow-md shadow-brand-gold/20 hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-gold/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {enviando ? (
                    <>Registrando y subiendo archivo... <Send size={20} className="animate-pulse" /></>
                  ) : (
                    <>Radicar Solicitud <Send size={20} /></>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-brand-gray/70 mt-4">
                  <Lock size={14} className="text-brand-gold" />
                  <span>Tu información y documentos son encriptados y tratados bajo confidencialidad.</span>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border-8 border-brand-gold/20">
                  <CheckCircle2 size={48} className="text-brand-gold" />
                </div>
                <h3 className="text-3xl font-bold text-brand-blue mb-4">¡Radicación Exitosa!</h3>
                <p className="text-xl text-brand-gray max-w-md">
                  Tu información y documentos fueron recibidos correctamente en nuestro sistema. Te contactaremos en máximo <strong>24 horas hábiles</strong>.
                </p>
                <button onClick={() => setEnviado(false)} className="mt-10 text-brand-gold font-bold hover:text-brand-blue transition-colors underline decoration-2 underline-offset-4">
                  Radicar otra solicitud
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}