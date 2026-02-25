"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  LayoutDashboard, Users, FileText, CheckSquare, Clock, 
  Search, Building2, User, ShieldAlert, FileDigit, RefreshCw, AlertCircle, MapPin, Hash
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; 

export default function AdminDashboard() {
  const router = useRouter(); 
  const [vistaActiva, setVistaActiva] = useState('tablero');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [cargando, setCargando] = useState(true);

  const [solicitudes, setSolicitudes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [clientesUnicos, setClientesUnicos] = useState([]);

  const cargarDatos = async () => {
    if (solicitudes.length === 0) setCargando(true);
    
    try {
      const { data: dataCasos, error: errorCasos } = await supabase
        .from('casos')
        .select(`
          id,
          numero_radicado,
          fecha_creacion,
          tipo_servicio,
          entidad_salud,
          descripcion,
          estado,
          monto_recuperar,
          clientes ( nombre_completo, tipo_cliente, telefono, correo, identificacion, ciudad )
        `)
        .order('fecha_creacion', { ascending: false });

      if (errorCasos) throw errorCasos;

      const casosFormateados = dataCasos.map(c => {
        const clienteData = Array.isArray(c.clientes) ? c.clientes[0] : c.clientes;
        
        return {
          id: c.id, 
          radicado: c.numero_radicado,
          fecha: new Date(c.fecha_creacion).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }),
          cliente: clienteData?.nombre_completo || 'Sin nombre',
          correo: clienteData?.correo || 'Sin correo',
          telefono: clienteData?.telefono || 'Sin teléfono',
          identificacion: clienteData?.identificacion || 'Sin documento',
          ciudad: clienteData?.ciudad || 'Sin ciudad',
          tipoCliente: clienteData?.tipo_cliente || 'Otro',
          servicio: c.tipo_servicio,
          entidad: c.entidad_salud || 'No especificada',
          descripcion: c.descripcion || 'Sin descripción',
          estado: c.estado,
          monto: c.monto_recuperar
        };
      });

      setSolicitudes(casosFormateados);

      const correosVistos = new Set();
      const clientesMapeados = [];
      
      casosFormateados.forEach(sol => {
        if (!correosVistos.has(sol.correo)) {
          correosVistos.add(sol.correo);
          clientesMapeados.push(sol);
        }
      });
      setClientesUnicos(clientesMapeados);

      const { data: dataDocs, error: errorDocs } = await supabase
        .from('documentos')
        .select(`
          id,
          tipo_documento,
          ruta_archivo,
          fecha_subida,
          casos ( numero_radicado )
        `)
        .order('fecha_subida', { ascending: false });

      if (errorDocs) throw errorDocs;

      const docsFormateados = dataDocs.map(d => {
        const casoData = Array.isArray(d.casos) ? d.casos[0] : d.casos;
        return {
          idDoc: d.id,
          idReq: casoData?.numero_radicado || 'Desconocido',
          nombre: d.ruta_archivo.split('/').pop(), 
          tipo: d.tipo_documento,
          fecha: new Date(d.fecha_subida).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
          url: d.ruta_archivo
        };
      });

      setDocumentos(docsFormateados);

    } catch (error) {
      console.error("Error al cargar la base de datos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/login'); 
        return;
      }
      cargarDatos();

      const canal = supabase
        .channel('cambios-reales')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'casos' }, () => { cargarDatos(); })
        .subscribe();

      return () => { supabase.removeChannel(canal); };
    };

    verificarSesion();
  }, [router]);

  const cambiarEstado = async (id_real, nuevoEstado) => {
    setSolicitudes(solicitudes.map(s => s.id === id_real ? { ...s, estado: nuevoEstado } : s));

    try {
      const { error } = await supabase
        .from('casos')
        .update({ estado: nuevoEstado, fecha_actualizacion: new Date().toISOString() })
        .eq('id', id_real);

      if (error) {
        console.error("Error al actualizar estado:", error);
        cargarDatos(); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // SOLUCIÓN A LA APERTURA DE ARCHIVOS: Usando el método Blob nativo (Download)
  const abrirArchivoSeguro = async (ruta) => {
    try {
      // Descargamos el blob con los permisos de la sesión actual
      const { data, error } = await supabase.storage
        .from('documentos_clientes')
        .download(ruta);

      if (error) throw error;

      // Creamos una URL temporal en memoria para el navegador
      const url = URL.createObjectURL(data);
      window.open(url, '_blank'); 

      // Limpiamos la memoria después de unos segundos
      setTimeout(() => URL.revokeObjectURL(url), 15000);

    } catch (error) {
      console.error("Error al generar enlace seguro:", error);
      alert(`No se pudo abrir el archivo. Detalles del error: ${error.message || 'Sin permisos de lectura'}. Verifica que en Supabase Storage las políticas (RLS) permitan SELECT al rol autenticado.`);
    }
  };

  const estilosEstado = {
    'Nuevo': 'bg-blue-100 text-blue-800 border-blue-200 focus:ring-blue-500',
    'Revisando Documentos': 'bg-orange-100 text-orange-800 border-orange-200 focus:ring-orange-500',
    'En Gestión': 'bg-yellow-100 text-yellow-800 border-yellow-200 focus:ring-yellow-500',
    'Esperando Pago': 'bg-purple-100 text-purple-800 border-purple-200 focus:ring-purple-500',
    'Finalizado': 'bg-green-100 text-green-800 border-green-200 focus:ring-green-500',
    'Rechazado': 'bg-red-100 text-red-800 border-red-200 focus:ring-red-500',
  };

  const iconosCliente = {
    'Independiente': <User size={16} className="text-brand-light" />,
    'Empresas': <Building2 size={16} className="text-brand-gold" />,
    'Asesoria Juridica': <ShieldAlert size={16} className="text-red-400" />,
    'Otro': <User size={16} className="text-gray-400" />
  };

  const solicitudesFiltradas = filtroEstado === 'Todos' 
    ? solicitudes 
    : solicitudes.filter(s => s.estado === filtroEstado);

  const totalNuevas = solicitudes.filter(s => s.estado === 'Nuevo').length;
  const totalRevisando = solicitudes.filter(s => s.estado === 'Revisando Documentos').length;
  const totalGestion = solicitudes.filter(s => s.estado === 'En Gestión').length;
  const totalFin = solicitudes.filter(s => s.estado === 'Finalizado').length;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-brand-blue text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-blue-800">
          <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-blue font-black shadow-lg">RC</div>
          <div>
            <h2 className="font-bold tracking-widest text-brand-gold">ADMIN</h2>
            <p className="text-xs text-blue-300">Portal de Gestión</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setVistaActiva('tablero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${vistaActiva === 'tablero' ? 'bg-brand-blue-light/50 text-brand-gold border border-brand-gold/30' : 'text-blue-200 hover:bg-brand-blue-light/30 hover:text-white'}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Tablero Principal</span>
          </button>
          <button onClick={() => setVistaActiva('clientes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${vistaActiva === 'clientes' ? 'bg-brand-blue-light/50 text-brand-gold border border-brand-gold/30' : 'text-blue-200 hover:bg-brand-blue-light/30 hover:text-white'}`}>
            <Users size={20} /> <span className="font-medium">Base de Clientes</span>
          </button>
          <button onClick={() => setVistaActiva('documentos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${vistaActiva === 'documentos' ? 'bg-brand-blue-light/50 text-brand-gold border border-brand-gold/30' : 'text-blue-200 hover:bg-brand-blue-light/30 hover:text-white'}`}>
            <FileText size={20} /> <span className="font-medium">Documentos (EPS)</span>
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-brand-blue capitalize">{vistaActiva.replace('-', ' ')}</h1>
            <button onClick={cargarDatos} className="flex items-center gap-2 text-sm text-brand-gray hover:text-brand-gold transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200" title="Refrescar datos">
              <RefreshCw size={16} className={cargando ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          {cargando ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-blue">
              <RefreshCw size={40} className="animate-spin mb-4 text-brand-gold" />
              <p className="font-bold">Sincronizando con la base de datos...</p>
            </div>
          ) : (
            <>
              {vistaActiva === 'tablero' && (
                <div className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-brand-gray font-medium mb-1">Nuevas Solicitudes</p>
                        <h3 className="text-3xl font-black text-brand-blue">{totalNuevas}</h3>
                      </div>
                      <div className="w-12 h-12 bg-blue-50 text-brand-light rounded-full flex items-center justify-center"><Clock size={24} /></div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-brand-gray font-medium mb-1">Revisando Docs</p>
                        <h3 className="text-3xl font-black text-orange-500">{totalRevisando}</h3>
                      </div>
                      <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-brand-gray font-medium mb-1">En Gestión (EPS)</p>
                        <h3 className="text-3xl font-black text-brand-gold">{totalGestion}</h3>
                      </div>
                      <div className="w-12 h-12 bg-yellow-50 text-brand-gold-dark rounded-full flex items-center justify-center"><LayoutDashboard size={24} /></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-brand-gray font-medium mb-1">Finalizados</p>
                        <h3 className="text-3xl font-black text-green-600">{totalFin}</h3>
                      </div>
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><CheckSquare size={24} /></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <h3 className="text-lg font-bold text-brand-blue">Control de Procesos</h3>
                      <div className="flex flex-wrap gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                        {['Todos', 'Nuevo', 'Revisando Documentos', 'En Gestión', 'Esperando Pago', 'Finalizado', 'Rechazado'].map(estado => (
                          <button 
                            key={estado}
                            onClick={() => setFiltroEstado(estado)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filtroEstado === estado ? 'bg-white shadow-sm text-brand-blue font-bold border border-gray-200' : 'text-gray-500 hover:text-brand-blue'}`}
                          >
                            {estado}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-brand-gray text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold w-1/6">Radicado / Fecha</th>
                            <th className="p-4 font-semibold w-1/4">Datos del Cliente</th>
                            <th className="p-4 font-semibold w-2/5">Servicio y Contexto Completo</th>
                            <th className="p-4 font-semibold w-1/6 text-center">Gestión</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {solicitudesFiltradas.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-400">No hay casos registrados en este estado.</td></tr>
                          ) : (
                            solicitudesFiltradas.map((sol) => (
                              <tr key={sol.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 align-top">
                                  <div className="font-bold text-brand-blue text-base">{sol.radicado}</div>
                                  <div className="text-xs text-gray-500 mt-1">{sol.fecha}</div>
                                </td>
                                <td className="p-4 align-top">
                                  <div className="font-bold text-gray-800 text-base">{sol.cliente}</div>
                                  
                                  <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-1 text-sm text-gray-700">
                                      <Hash size={14} className="text-brand-gold" /> C.C/NIT: <b>{sol.identificacion}</b>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-700">
                                      <MapPin size={14} className="text-brand-gold" /> <b>{sol.ciudad}</b>
                                    </div>
                                    <div className="text-xs text-gray-500 pt-1">{sol.correo}</div>
                                    <div className="text-xs text-gray-500">{sol.telefono}</div>
                                  </div>

                                  <div className="flex items-center gap-1 mt-3 text-xs text-brand-gold font-medium bg-brand-gold/10 inline-block px-2 py-1 rounded">
                                    {sol.tipoCliente}
                                  </div>
                                </td>
                                <td className="p-4 align-top">
                                  <div className="flex flex-col gap-2">
                                    <div className="text-sm font-bold text-brand-blue uppercase">{sol.servicio}</div>
                                    <div className="text-xs font-semibold text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg w-max border border-gray-200">
                                      <Building2 size={14} className="text-brand-gold" /> Entidad: {sol.entidad}
                                    </div>
                                    
                                    {/* SOLUCIÓN VISUAL: Caja de mensaje con wrap total para leer todo el contexto sin recortes */}
                                    <div className="mt-2 bg-white border border-brand-gold/30 p-4 rounded-xl shadow-sm">
                                      <p className="text-xs font-bold text-brand-gold mb-1">Mensaje del cliente:</p>
                                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {sol.descripcion}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 align-top text-center">
                                  <select
                                    value={sol.estado}
                                    onChange={(e) => cambiarEstado(sol.id, e.target.value)}
                                    className={`px-3 py-2 text-sm font-bold rounded-xl border outline-none cursor-pointer appearance-none text-center shadow-sm transition-colors w-full mb-2 ${estilosEstado[sol.estado] || estilosEstado['Nuevo']}`}
                                  >
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Revisando Documentos">Revisando Documentos</option>
                                    <option value="En Gestión">En Gestión</option>
                                    <option value="Esperando Pago">Esperando Pago</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Rechazado">Rechazado</option>
                                  </select>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {vistaActiva === 'clientes' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-brand-blue">Directorio de Clientes</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-brand-gray text-sm uppercase tracking-wider">
                          <th className="p-4 font-semibold">Cliente / Razón Social</th>
                          <th className="p-4 font-semibold">Identificación y Ubicación</th>
                          <th className="p-4 font-semibold">Contacto</th>
                          <th className="p-4 font-semibold">Tipo de Perfil</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {clientesUnicos.length === 0 ? (
                          <tr><td colSpan="4" className="p-8 text-center text-gray-400">No hay clientes registrados aún.</td></tr>
                        ) : (
                          clientesUnicos.map((cli, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 font-bold text-brand-blue flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-gold">{cli.cliente.charAt(0)}</div>
                                {cli.cliente}
                              </td>
                              <td className="p-4">
                                <div className="text-sm font-medium text-gray-800 flex items-center gap-1"><Hash size={14} className="text-gray-400" /> {cli.identificacion}</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {cli.ciudad}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm font-medium text-gray-800">{cli.telefono}</div>
                                <div className="text-xs text-gray-500">{cli.correo}</div>
                              </td>
                              <td className="p-4 text-sm text-gray-600">{cli.tipoCliente}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {vistaActiva === 'documentos' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-brand-blue">Gestor de Archivos Adjuntos</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 p-6">
                    {documentos.length === 0 ? (
                      <div className="col-span-3 text-center text-gray-400 py-8">No hay documentos adjuntos en el sistema.</div>
                    ) : (
                      documentos.map((doc, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => abrirArchivoSeguro(doc.url)} 
                          className="border border-gray-200 rounded-xl p-4 flex items-start gap-4 hover:border-brand-gold transition-colors cursor-pointer group bg-gray-50 hover:bg-white text-left w-full"
                        >
                          <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-lg flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors shrink-0">
                            <FileDigit size={24} />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold text-sm text-brand-blue truncate" title={doc.nombre}>{doc.nombre}</p>
                            <p className="text-xs text-gray-500 mt-1">Radicado: {doc.idReq}</p>
                            <p className="text-xs text-gray-400">{doc.fecha}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}