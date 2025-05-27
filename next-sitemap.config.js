/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://artichekt.com',
  generateRobotsTxt: true, // génère aussi robots.txt automatiquement
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/private'] // chemins à exclure (si besoin)
}
