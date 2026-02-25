export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-rapicobro/', '/login/'], // Evita que Google indexe tu panel privado
    },
    sitemap: 'https://www.rapicobro.com/sitemap.xml', // Cambia esto por tu dominio futuro
  }
}