import React from 'react';
import { User, Building2, Scale, ArrowRight, Briefcase, FileSignature, HeartPulse, FileText } from 'lucide-react';
import Link from 'next/link'; // Importación lista por si decides usar enlaces internos después

// Metadatos para SEO
export const metadata = {
  title: 'Nuestros Servicios | RAPICOBRO',
  description: 'Especialistas en recobro y protección de derechos en salud. Ayudamos a empresas e independientes a recuperar su dinero.',
};

export default function Servicios() {
  return (
    <div className="bg-brand-bg min-h-screen py-12 md:py-20 animate-fade-in">
      {/* Cabecera */}
      <div className="container mx-auto px-6 max-w-5xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">
          Especialistas en recobro y protección de derechos en salud
        </h1>
        <p className="text-lg text-brand-gray max-w-3xl mx-auto">
          En <strong>RAPICOBRO</strong> tenemos un equipo jurídico y administrativo preparado para defender tus finanzas y tu salud. Selecciona tu perfil para conocer cómo podemos ayudarte.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* ================= SECCIÓN INDEPENDIENTES Y EMPRESAS ================= */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          
          {/* Para Independientes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-brand-light/10 p-8 border-b border-gray-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-light">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand-blue">Para Independientes</h2>
                <p className="text-brand-gray text-sm">Recupera lo que te pertenece.</p>
              </div>
            </div>
            <div className="p-8 flex-grow">
              <p className="text-brand-gray text-lg mb-6 leading-relaxed">
                En <strong>RAPICOBRO</strong> te ayudamos a recuperar el cobro de tus incapacidades, licencias de maternidad y paternidad ante EPS y ARL. No pierdas dinero por no saber cómo hacer el trámite.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><FileText className="text-brand-gold mt-1 shrink-0" size={20} /> <span className="text-brand-gray font-medium">Cobro de incapacidades generales y laborales.</span></li>
                <li className="flex items-start gap-3"><FileText className="text-brand-gold mt-1 shrink-0" size={20} /> <span className="text-brand-gray font-medium">Trámite de licencias de maternidad y paternidad.</span></li>
                <li className="flex items-start gap-3"><FileText className="text-brand-gold mt-1 shrink-0" size={20} /> <span className="text-brand-gray font-medium">Gestión integral ante EPS y ARL.</span></li>
              </ul>
            </div>
          </div>

          {/* Para Empresas */}
          <div className="bg-brand-blue rounded-2xl shadow-sm overflow-hidden flex flex-col text-white">
            <div className="bg-blue-900/50 p-8 border-b border-blue-800 flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Building2 size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Para Empresas</h2>
                <p className="text-blue-200 text-sm">Protegemos tu flujo de caja.</p>
              </div>
            </div>
            <div className="p-8 flex-grow">
              <p className="text-xl font-bold text-brand-light mb-4 leading-tight">
                ¿Sabías que muchas empresas pierden ingresos por incapacidades o licencias sin gestionar el recobro adecuadamente?
              </p>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                En <strong>RAPICOBRO</strong> te ayudamos a recuperar esas prestaciones económicas, asegurando un buen flujo de caja para tu organización.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><Briefcase className="text-brand-light mt-1 shrink-0" size={20} /> <span className="text-blue-100 font-medium">Tercerización de radicación masiva.</span></li>
                <li className="flex items-start gap-3"><Briefcase className="text-brand-light mt-1 shrink-0" size={20} /> <span className="text-blue-100 font-medium">Recuperación de cartera morosa de años anteriores.</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* ================= SECCIÓN ASESORÍAS JURÍDICAS ================= */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3 text-center md:text-left">
                <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-6 mx-auto md:mx-0 shadow-lg">
                  <Scale size={40} />
                </div>
                <h2 className="text-3xl font-black text-brand-blue mb-2 tracking-tight">ASESORÍAS<br/>JURÍDICAS</h2>
                <p className="text-brand-light font-bold text-xl mb-4">RAPICOBRO</p>
                <div className="hidden md:block w-16 h-1.5 bg-brand-gold rounded-full"></div>
              </div>
              
              <div className="md:w-2/3">
                <p className="text-brand-gray text-lg mb-6 leading-relaxed">
                  Cuando el sistema falla, nosotros intervenimos. Contamos con un equipo de abogados expertos en salud para defender tus derechos ante cualquier entidad pública o privada.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <HeartPulse className="text-brand-blue shrink-0 mt-1" size={22} />
                    <span className="text-brand-gray font-semibold">Vulneración de derechos en salud (Cirugías, citas, insumos, entrega de medicamentos).</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <Scale className="text-brand-blue shrink-0 mt-1" size={22} />
                    <span className="text-brand-gray font-semibold">Elaboración de Tutelas en salud.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <FileSignature className="text-brand-blue shrink-0 mt-1" size={22} />
                    <span className="text-brand-gray font-semibold">Trámite de Desacatos.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <FileText className="text-brand-blue shrink-0 mt-1" size={22} />
                    <span className="text-brand-gray font-semibold">Derechos de petición ante cualquier entidad.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="mt-16 text-center">
          <p className="text-xl font-medium text-brand-gray mb-6">¿Tu EPS no te responde? Hablemos hoy mismo.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* BOTÓN PREMIUM APLICADO AQUÍ */}
            <a 
              href="https://wa.me/573012560585" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-gold text-brand-blue font-bold py-4 px-8 rounded-xl shadow-md shadow-brand-gold/20 hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-gold/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              Contactar por WhatsApp <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}