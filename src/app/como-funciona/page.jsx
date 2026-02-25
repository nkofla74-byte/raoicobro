import React from 'react';
import { MessageCircle, FileSearch, Building, Wallet, CheckCircle2 } from 'lucide-react';
import Link from 'next/link'; // Cambiado a Next.js

export const metadata = {
  title: 'Cómo Funciona | Rapicobro',
  description: 'Descubre nuestro proceso de 4 sencillos pasos para recuperar tu dinero por incapacidades y licencias sin trámites enredados.',
};

export default function ComoFunciona() {
  const pasos = [
    {
      numero: "1",
      titulo: "Nos cuentas tu caso",
      descripcion: "Llena nuestro formulario o escríbenos por WhatsApp. Solo necesitamos saber a qué EPS perteneces y qué tipo de incapacidad tienes. ¡Toma 2 minutos!",
      icono: <MessageCircle size={40} className="text-brand-gold" />,
      colorBase: "bg-blue-50"
    },
    {
      numero: "2",
      titulo: "Revisamos tus documentos",
      descripcion: "Nos envías una foto clara o el PDF de tu historia clínica y certificado de incapacidad. Nuestro equipo verifica que todo esté en orden para que la EPS no lo rechace.",
      icono: <FileSearch size={40} className="text-brand-gold" />,
      colorBase: "bg-white"
    },
    {
      numero: "3",
      titulo: "Nosotros hacemos la fila por ti",
      descripcion: "Radicamos los documentos ante la entidad correspondiente. Tú te quedas en casa descansando mientras nosotros lidiamos con las plataformas y la burocracia.",
      icono: <Building size={40} className="text-brand-gold" />,
      colorBase: "bg-blue-50"
    },
    {
      numero: "4",
      titulo: "Recibes tu dinero",
      descripcion: "Hacemos seguimiento diario. Te avisaremos por WhatsApp en el momento exacto en que la EPS apruebe y transfiera el dinero a tu cuenta bancaria.",
      icono: <Wallet size={40} className="text-brand-gold" />,
      colorBase: "bg-white"
    }
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-16 animate-fade-in">
      
      <div className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">
          Un proceso tan fácil que parece magia
        </h1>
        <p className="text-xl text-brand-gray">
          Olvídate de los trámites enredados. Te explicamos cómo recuperamos tu dinero en 4 sencillos pasos.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-8 md:space-y-12 relative">
          
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 bg-brand-gold/30 transform -translate-x-1/2 z-0"></div>

          {pasos.map((paso, index) => (
            <div key={index} className={`relative z-10 flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <div className="w-full md:w-1/2">
                <div className={`${paso.colorBase} p-8 rounded-2xl shadow-sm border border-brand-gold/20 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center shadow-md text-brand-gold font-black text-2xl border-2 border-brand-gold">
                      {paso.numero}
                    </div>
                    <div className="bg-brand-blue p-3 rounded-xl shadow-sm border border-brand-gold/50">
                      {paso.icono}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mb-3">{paso.titulo}</h3>
                  <p className="text-brand-gray text-lg leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>

              <div className="hidden md:flex w-1/2 justify-center">
                <div className="w-6 h-6 rounded-full bg-brand-gold border-4 border-white shadow-sm z-10"></div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl text-center mt-20">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-brand-gold/30">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">¿Ves lo sencillo que es?</h2>
          <p className="text-brand-gray text-lg mb-8">No tienes que ser un experto en sistemas ni en leyes. De eso nos encargamos nosotros.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* href en lugar de to */}
            <Link 
              href="/contacto" 
              className="w-full sm:w-auto bg-brand-gold text-brand-blue font-bold py-4 px-8 rounded-xl shadow-md shadow-brand-gold/20 hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-gold/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              <CheckCircle2 size={24} /> Comenzar ahora mismo
            </Link>
            
            <a 
              href="https://wa.me/573012560585" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-brand-blue text-brand-gold font-bold py-4 px-8 rounded-xl shadow-md hover:bg-brand-blue-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg border border-brand-gold/30"
            >
              <MessageCircle size={24} /> Tengo una duda
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}