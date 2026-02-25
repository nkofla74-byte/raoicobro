"use client";

import React, { useState } from 'react';
// IMPORTANTE: En Next.js usamos useRouter para navegar mediante código
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [credenciales, setCredenciales] = useState({ correo: '', password: '' });
  const [cargando, setCargando] = useState(false);
  const router = useRouter(); // Instanciamos el router de Next.js

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setCargando(true);
    
    // Simulación de conexión segura. 
    // Aquí luego pondremos el código de Supabase Auth
    setTimeout(() => {
      setCargando(false);
      router.push('/admin-rapicobro'); // Redirección al panel con Next.js
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden animate-fade-in">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue-light rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-brand-gold-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 relative z-10">
        
        {/* Cabecera del Login */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 group">
            <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-brand-gold group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck size={40} className="text-brand-gold" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-brand-blue tracking-tight">Acceso Restringido</h1>
          <p className="text-sm text-brand-gray mt-2">Portal exclusivo para administración</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-gray flex items-center gap-2">
              <Mail size={16} className="text-brand-gold" /> Correo Corporativo
            </label>
            <input 
              type="email" 
              name="correo" 
              value={credenciales.correo} 
              onChange={handleChange} 
              required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              placeholder="admin@rapicobro.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-gray flex items-center gap-2">
              <Lock size={16} className="text-brand-gold" /> Contraseña
            </label>
            <input 
              type="password" 
              name="password" 
              value={credenciales.password} 
              onChange={handleChange} 
              required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-brand-blue text-brand-gold font-bold py-4 rounded-xl shadow-md hover:bg-brand-blue-light hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {cargando ? (
              <span className="animate-pulse">Verificando credenciales...</span>
            ) : (
              <>Ingresar al Sistema <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-brand-blue transition-colors">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}