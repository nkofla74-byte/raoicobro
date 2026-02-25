import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';

export const metadata = {
  title: {
    template: '%s | RAPICOBRO',
    default: 'Rapicobro - Gestión de Incapacidades y Asesoría Jurídica',
  },
  description: 'Recuperación de prestaciones económicas, cobro de incapacidades y asesorías jurídicas en salud ante EPS y ARL en Colombia.',
  keywords: ['incapacidades', 'EPS', 'ARL', 'licencia de maternidad', 'abogados salud colombia', 'tutelas salud'],
  openGraph: {
    title: 'Rapicobro - Expertos en Prestaciones Económicas',
    description: 'Recuperamos la cartera que dabas por perdida.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Rapicobro',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-brand-bg flex flex-col font-sans relative overflow-x-hidden text-brand-gray">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}