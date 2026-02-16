export async function getServerSideProps({ res }) {
  const siteUrl = "https://jeevanchandimal.com"
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  let posts = []
  let photos = []
  let tags = new Set()

  // -------------------------
  // 1️⃣ Fetch WordPress posts
  // -------------------------
  try {
    const response = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`)
    posts = await response.json()
  } catch {
    posts = []
  }

  const wpUrls = posts.map((post) => `
    <url>
      <loc>${siteUrl}/project/${post.slug}</loc>
      <lastmod>${new Date(post.modified).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `)

  // -------------------------
  // 2️⃣ Fetch published photos from store API
  // -------------------------
  try {
    const resp = await fetch(`${siteUrl}/api/store/photos`)
    const data = await resp.json()

    photos = Array.isArray(data?.photos) ? data.photos : []

    photos.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => tags.add(t))
      }
    })
  } catch {
    photos = []
  }

  // -------------------------
  // 3️⃣ Store photo URLs
  // -------------------------
  const photoUrls = photos.map((p) => `
    <url>
      <loc>${siteUrl}/store/${p.id}</loc>
      <lastmod>${new Date(p.created_at).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `)

  // -------------------------
  // 4️⃣ Collection tag URLs
  // -------------------------
  const collectionUrls = Array.from(tags).map((tag) => `
    <url>
      <loc>${siteUrl}/collections/${encodeURIComponent(tag)}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.75</priority>
    </url>
  `)

  // -------------------------
  // 5️⃣ Static core pages
  // -------------------------
  const staticUrls = `
    <url>
      <loc>${siteUrl}</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>${siteUrl}/store</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>

    <url>
      <loc>${siteUrl}/collections</loc>
      <changefreq>weekly</changefreq>
      <priority>0.85</priority>
    </url>
  `

  // -------------------------
  // 6️⃣ Final XML
  // -------------------------
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${wpUrls.join("")}
  ${collectionUrls.join("")}
  ${photoUrls.join("")}
</urlset>`

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
