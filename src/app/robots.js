export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://vivekkumar-portfolio.vercel.app/sitemap.xml',
  }
}
