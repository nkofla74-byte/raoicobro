import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | RAPICOBRO',
  description: 'Términos y condiciones de uso de los servicios de RadicaSalud Legal S.A.S.',
};

export default function Terminos() {
  return (
    <div className="bg-brand-bg min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-brand-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Scale size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue">Términos y Condiciones de Uso</h1>
            <p className="text-brand-gray">Última actualización: Febrero de 2026</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 text-brand-gray space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">1. Identificación del titular del sitio</h2>
            <p><strong>RadicaSalud Legal S.A.S.</strong>, identificada con NIT 901.234.567-8, con domicilio principal en Mosquera, Cundinamarca, Colombia, en adelante “LA EMPRESA”, es titular y administradora del presente sitio web.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">2. Objeto y Naturaleza del servicio</h2>
            <p>LA EMPRESA presta servicios exclusivos de <strong>gestión administrativa y consultoría jurídica</strong> consistentes en:</p>
            <ul className="list-none space-y-2 mt-3 mb-4 pl-4">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-brand-green shrink-0 mt-1" /> Radicación de incapacidades médicas ante EPS, IPS, ARL o empleadores.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-brand-green shrink-0 mt-1" /> Seguimiento documental del trámite.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-brand-green shrink-0 mt-1" /> Notificación del estado del proceso y asesoría relacionada.</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-brand-blue font-medium text-sm">
              Aclaración esencial: LA EMPRESA no es EPS, IPS, ARL ni entidad prestadora de salud. No emitimos diagnósticos, historias clínicas ni tomamos decisiones médicas o de calificación de pérdida de capacidad laboral.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">3. Exención de Garantías de Aprobación</h2>
            <p>El servicio corresponde a una gestión de medio y no de resultado. LA EMPRESA <strong>no garantiza</strong> la aprobación de la incapacidad, el pago de prestaciones económicas ni los tiempos de respuesta. Las decisiones de reconocimiento y pago dependen única y exclusivamente de las entidades del Sistema General de Seguridad Social en Salud, regulado por la Ley 100 de 1993 y sus decretos reglamentarios.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">4. Obligaciones y Responsabilidad del Usuario</h2>
            <p>Al utilizar este sitio y nuestros servicios, el usuario declara bajo la gravedad de juramento que:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>La información médica y personal suministrada es 100% veraz, auténtica y verificable.</li>
              <li>Tiene autorización legal para entregar y permitir el tratamiento de dichos documentos.</li>
              <li>Asume total responsabilidad penal y civil frente a la entrega de documentos falsos, adulterados o inexactos, eximiendo a LA EMPRESA de cualquier reclamación por fraude a las entidades de salud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">5. Jurisdicción y Ley Aplicable</h2>
            <p>Este contrato, los términos de uso y la prestación del servicio se rigen por las leyes de la República de Colombia. Cualquier controversia derivada del presente documento será sometida a los jueces y tribunales competentes en el territorio colombiano.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
