import React from 'react';
import { Award, TrendingUp, HeartHandshake, MapPin, Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Nosotros | Rapicobro',
  description: 'Conoce la historia de Rapicobro y nuestro equipo. Devolvemos la tranquilidad a los colombianos peleando por sus derechos económicos ante las EPS y ARL.',
};

export default function Nosotros() {
  return (
    <div className="bg-brand-bg min-h-screen py-16 animate-fade-in">
      
      {/* 1. Hero / Historia de Origen */}
      <div className="container mx-auto px-6 max-w-6xl mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-brand-blue-light/20 text-brand-blue text-sm font-bold px-4 py-2 rounded-full mb-6 border border-brand-light/30">
              <HeartHandshake size={16} className="text-brand-blue" /> Nuestro Propósito
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue leading-tight mb-6">
              Devolvemos la tranquilidad a los colombianos.
            </h1>
            <p className="text-lg text-brand-gray mb-6 leading-relaxed">
              Todo comenzó en nuestra sede principal en Bogotá. Observamos cómo trabajadores y empresas de todo el país perdían semanas enteras, e incluso renunciaban a su dinero, debido a los laberintos burocráticos de las EPS y ARL.
            </p>
            <p className="text-lg text-brand-gray leading-relaxed mb-8">
              Decidimos crear <strong>RAPICOBRO</strong> no solo como una firma de gestión, sino como un aliado estratégico para nivelar la balanza. Tu salud y tu flujo de caja son tu prioridad; pelear por tus derechos económicos es la nuestra.
            </p>
            <div className="flex items-center gap-4 text-brand-blue font-bold">
              <MapPin className="text-brand-gold" size={24} />
              <span>Operación nacional con sede principal en Bogotá.</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/20 relative z-10">
              {/* Usamos etiqueta img estándar para URLs externas sin necesidad de configurar next.config.js de inmediato */}
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Equipo de Rapicobro" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-brand-gold/10 rounded-3xl z-0 border border-brand-gold/20 hidden md:block"></div>
          </div>
        </div>
      </div>

      {/* 2. Métricas de Autoridad */}
      <div className="bg-brand-blue py-16 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A646_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-blue-light/50">
            <div className="text-center md:px-6 py-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4"><Award size={40} className="text-brand-gold" /></div>
              <h3 className="text-4xl font-extrabold text-white mb-2">+98%</h3>
              <p className="text-brand-gold-light font-medium">Tasa de casos resueltos a favor del usuario</p>
            </div>
            <div className="text-center md:px-6 py-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4"><TrendingUp size={40} className="text-brand-gold" /></div>
              <h3 className="text-4xl font-extrabold text-white mb-2">15.000+</h3>
              <p className="text-brand-gold-light font-medium">Incapacidades radicadas exitosamente</p>
            </div>
            <div className="text-center md:px-6 py-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex justify-center mb-4"><HeartHandshake size={40} className="text-brand-gold" /></div>
              <h3 className="text-4xl font-extrabold text-white mb-2">24/7</h3>
              <p className="text-brand-gold-light font-medium">Tiempo de respuesta y atención constante</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Testimonios */}
      <div className="container mx-auto px-6 max-w-6xl mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-blue mb-16">
          Lo que dicen quienes ya confiaron en nosotros
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gold/20 relative hover:shadow-lg transition-shadow">
            <Quote className="absolute top-6 right-6 text-brand-bg" size={40} />
            <div className="flex text-brand-gold mb-4">
              <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
            </div>
            <p className="text-brand-gray mb-6 italic">"Llevaba 3 meses peleando una licencia de maternidad que la EPS me negaba por un error en el sistema. Ellos redactaron la tutela y en 10 días tenía el dinero en mi cuenta. Mil gracias."</p>
            <div className="font-bold text-brand-blue">Diana M.</div>
            <div className="text-sm text-brand-gold-dark font-medium">Independiente</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gold/20 relative hover:shadow-lg transition-shadow">
            <Quote className="absolute top-6 right-6 text-brand-bg" size={40} />
            <div className="flex text-brand-gold mb-4">
              <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
            </div>
            <p className="text-brand-gray mb-6 italic">"Tercerizar la radicación masiva de las incapacidades de nuestros empleados fue la mejor decisión. Redujimos el ausentismo no justificado y mejoramos nuestro flujo de caja con RAPICOBRO."</p>
            <div className="font-bold text-brand-blue">Carlos R.</div>
            <div className="text-sm text-brand-gold-dark font-medium">Director RRHH</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gold/20 relative hover:shadow-lg transition-shadow">
            <Quote className="absolute top-6 right-6 text-brand-bg" size={40} />
            <div className="flex text-brand-gold mb-4">
              <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
            </div>
            <p className="text-brand-gray mb-6 italic">"Después de un accidente laboral, la ARL no quería responder por mis terapias. El equipo de Asesoría Jurídica me apoyó y lograron que me aprobaran todo."</p>
            <div className="font-bold text-brand-blue">Javier G.</div>
            <div className="text-sm text-brand-gold-dark font-medium">Asesoría Jurídica</div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-brand-gold/30">
          <p className="text-sm font-bold text-brand-gray uppercase tracking-widest mb-8">Empresas que respaldan nuestra gestión</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black font-serif text-brand-blue">AgroTienda La Floresta</div>
            <div className="text-2xl font-black text-brand-blue tracking-tighter">LOGÍSTICA<span className="text-brand-gold">EXPRESS</span></div>
            <div className="text-xl font-bold text-brand-blue border-2 border-brand-blue p-2">CONSTRUCTORA C&M</div>
            <div className="text-2xl font-bold text-brand-blue flex items-center gap-1"><TrendingUp size={24} className="text-brand-gold"/> FinanCorp</div>
          </div>
        </div>
      </div>

      {/* 4. CTA Final */}
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-brand-blue p-10 md:p-14 rounded-3xl shadow-xl text-white border border-brand-blue-light">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">No dejes tu dinero en manos del sistema</h2>
          <p className="text-brand-gold-light text-lg mb-8">Únete a los miles de colombianos que ya recuperaron lo que les pertenece por derecho.</p>
          
          <Link 
            href="/contacto" 
            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-blue font-bold py-4 px-10 rounded-xl shadow-md shadow-brand-gold/20 hover:bg-brand-gold-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-gold/40 transition-all duration-300 text-lg"
          >
            Hablemos de tu caso hoy <ArrowRight size={20} />
          </Link>
        </div>
      </div>

    </div>
  );
}