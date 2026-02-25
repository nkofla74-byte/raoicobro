export default function sitemap() {
  // DEBE ser rapicobroincapacidades.com.co
  const baseUrl = 'https://rapicobroincapacidades.com.co';

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), priority: 0.9 },
  ];
}