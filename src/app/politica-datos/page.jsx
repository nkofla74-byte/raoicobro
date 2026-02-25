import React from 'react';
import { FileText, Lock } from 'lucide-react';

export const metadata = {
  title: 'Política de Tratamiento de Datos | RAPICOBRO',
  description: 'Manual Interno de Políticas y Procedimientos sobre la protección de datos.',
};

export default function PoliticaDatos() {
  return (
    <div className="bg-brand-bg min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-brand-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue">Política de Tratamiento de Datos</h1>
            <p className="text-brand-gray">Manual Interno de Políticas y Procedimientos</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 text-brand-gray space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">1. Marco Normativo</h2>
            <p>La presente política se adopta en estricto cumplimiento de la <strong>Ley 1581 de 2012</strong>, el <strong>Decreto Reglamentario 1377 de 2013</strong> y las directrices de la Superintendencia de Industria y Comercio (SIC).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">2. Principios Rectores</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Legalidad:</strong> El tratamiento es una actividad reglada que debe sujetarse a lo establecido en la ley.</li>
              <li><strong>Finalidad:</strong> El tratamiento obedece a una finalidad legítima y comunicada al titular.</li>
              <li><strong>Libertad:</strong> Los datos solo pueden tratarse con el consentimiento previo, expreso e informado del titular.</li>
              <li><strong>Seguridad y Confidencialidad:</strong> La información se maneja con las medidas técnicas y administrativas necesarias.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">3. Medidas de Seguridad Tecnológica</h2>
            <p>Comprendiendo que gestionamos expedientes médicos, LA EMPRESA aplica protocolos estrictos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                <Lock className="text-brand-light mt-1" size={20} />
                <p className="text-sm"><strong>Cifrado SSL:</strong> Toda transmisión de datos en la web está encriptada.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                <Lock className="text-brand-light mt-1" size={20} />
                <p className="text-sm"><strong>Acceso Restringido:</strong> Solo personal jurídico autorizado accede a las historias clínicas.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">4. Procedimiento para ejercer derechos</h2>
            <p>El titular podrá ejercer sus derechos enviando un correo a <strong>legal@radicasalud.com.co</strong>. Tiempos normativos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Consultas:</strong> Serán atendidas en un término máximo de diez (10) días hábiles.</li>
              <li><strong>Reclamos:</strong> Se atenderán en un término máximo de quince (15) días hábiles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 border-b border-gray-100 pb-2">5. Transferencia y Transmisión</h2>
            <p>LA EMPRESA declara expresamente que <strong>no comercializa, vende ni alquila</strong> bases de datos a terceros. La información solo será transmitida a las entidades correspondientes para ejecutar la radicación.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
