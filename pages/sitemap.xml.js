export async function getServerSideProps({ res }) {
  const siteUrl = "https://jeevanchandimal.com"
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  let posts = []

  try {
    const response = await fetch(
      `${wpBase}/wp-json/wp/v2/posts?per_page=100`
    )
    posts = await response.json()
  } catch (error) {
    posts = []
  }

  const urls = posts.map((post) => {
    return `
      <url>
        <loc>${siteUrl}/project/${post.slug}</loc>
        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls.join("")}
</urlset>`

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap() {
  return null
}
