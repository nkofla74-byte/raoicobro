export default function sitemap() {
  // Cuando compres tu dominio, cambiarás esta URL
  const baseUrl = 'https://www.rapicobro.com';

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];
}