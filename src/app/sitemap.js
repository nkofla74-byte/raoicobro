export default function sitemap() {
  // Agregamos el 'www' para que coincida con la redirección de Vercel
  const baseUrl = 'https://www.rapicobroincapacidades.com.co';

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), priority: 0.9 },
  ];
}