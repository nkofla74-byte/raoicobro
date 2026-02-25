import React from 'react';
import { Shield, Lock, Server, Users } from 'lucide-react';

export const metadata = {
  title: 'Protocolo Interno de Seguridad | RAPICOBRO',
  description: 'Manual de Manejo y Protección de Datos Personales de la empresa.',
};

export default function ProtocoloInterno() {
  return (
    <div className="bg-brand-bg min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-brand-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue">Protocolo Interno de Seguridad</h1>
            <p className="text-brand-gray">Manual de Manejo y Protección de Datos Personales</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-gray-100 pb-2">1. Objetivo y Alcance</h2>
            <p className="text-brand-gray mb-4">Establecer lineamientos internos para garantizar la protección, confidencialidad y seguridad de los datos personales. Este protocolo es de estricto cumplimiento para:</p>
            <div className="flex gap-4">
              <span className="bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold">Empleados</span>
              <span className="bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold">Contratistas</span>
              <span className="bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold">Proveedores TI</span>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-gray-100 pb-2">2. Clasificación de la Información</h2>
            <p className="text-brand-gray mb-3">La información se clasifica en tres niveles. Los <strong>datos sensibles (información de salud e historias clínicas)</strong> tendrán, sin excepción, un nivel de seguridad ALTO.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">3. Medidas de Protección</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-100 p-5 rounded-xl bg-gray-50">
                <Server className="text-brand-light mb-3" size={24} />
                <h3 className="font-bold text-brand-blue mb-2">Medidas Técnicas</h3>
                <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
                  <li>Uso obligatorio de protocolo HTTPS.</li>
                  <li>Acceso restringido mediante credenciales individuales.</li>
                  <li>Cambio periódico de contraseñas.</li>
                  <li>Copias de seguridad cifradas.</li>
                  <li>Control de accesos a servidores y logs de actividad.</li>
                </ul>
              </div>
              <div className="border border-gray-100 p-5 rounded-xl bg-gray-50">
                <Users className="text-brand-light mb-3" size={24} />
                <h3 className="font-bold text-brand-blue mb-2">Medidas Administrativas</h3>
                <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
                  <li>Firma de acuerdos de confidencialidad (NDA).</li>
                  <li>Capacitación anual obligatoria en protección de datos.</li>
                  <li>Designación de Oficial de Privacidad interno.</li>
                  <li>Procedimiento formal de atención de requerimientos.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-gray-100 pb-2">4. Manejo de Incidentes de Seguridad</h2>
            <p className="text-brand-gray mb-3">En caso de vulneración o brecha de datos, el equipo actuará bajo la siguiente cadena de respuesta:</p>
            <ol className="list-decimal pl-6 text-brand-gray space-y-1">
              <li>Identificación y aislamiento del incidente.</li>
              <li>Contención técnica inmediata.</li>
              <li>Notificación a la gerencia y evaluación del riesgo.</li>
              <li>Notificación a la SIC y a los titulares.</li>
              <li>Implementación de parches y medidas correctivas.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-3 border-b border-gray-100 pb-2">5. Conservación, Eliminación y Auditoría</h2>
            <p className="text-brand-gray">Los datos se conservarán únicamente durante el tiempo necesario para cumplir la finalidad y obligaciones legales. Cumplida la finalidad, serán eliminados de forma segura o anonimizados.</p>
          </section>
        </div>
      </div>
    </div>
  );
}