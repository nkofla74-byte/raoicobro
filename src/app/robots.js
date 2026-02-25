export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-rapicobro/', '/login/'], 
    },
    sitemap: 'https://www.rapicobroincapacidades.com.co/sitemap.xml', 
  }
}