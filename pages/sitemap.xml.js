// pages/sitemap.xml.js

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function getServerSideProps({ res }) {
  const siteUrl = 'https://www.jeevanchandimal.com'
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL
  const nowIso = new Date().toISOString()
  const MIN_TAG_PHOTOS = 3

  /* ---------------- FETCH STORE PHOTOS ---------------- */
  let storePhotos = []
  try {
    const r = await fetch(`${siteUrl}/api/store/photos`, {
      headers: { 'Cache-Control': 'no-store' },
    })
    const j = await r.json().catch(() => null)
    storePhotos = Array.isArray(j?.photos) ? j.photos : []
  } catch {
    storePhotos = []
  }

  /* ---------------- STORE URLS + IMAGE TAGS ---------------- */
  const storeUrls = storePhotos
    .map((p) => {
      const id = String(p?.id || '').trim()
      if (!id) return ''

      const pageUrl = `${siteUrl}/store/${id}`
      const imageUrl = `${siteUrl}/api/photo/${encodeURIComponent(id)}/preview`

      const title = p?.title || 'Photograph by Jeevan Chandimal'
      const caption =
        (p?.description && String(p.description).trim()) ||
        title ||
        'Sri Lanka photography by Jeevan Chandimal'

      return `
  <url>
    <loc>${esc(pageUrl)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>

    <image:image>
      <image:loc>${esc(imageUrl)}</image:loc>
      <image:title>${esc(title)}</image:title>
      <image:caption>${esc(caption)}</image:caption>
      <image:license>${esc(pageUrl)}</image:license>
    </image:image>
  </url>`
    })
    .filter(Boolean)
    .join('')

  /* ---------------- COLLECTIONS (FROM TAGS) ---------------- */
  let collectionUrls = ''
  try {
    const counts = new Map()

    for (const row of storePhotos) {
      const tags = Array.isArray(row?.tags) ? row.tags : []
      for (const t of tags) {
        const tag = String(t || '').trim().toLowerCase()
        if (!tag) continue
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }

    collectionUrls = Array.from(counts.entries())
      .filter(([, c]) => c >= MIN_TAG_PHOTOS)
      .map(
        ([tag]) => `
  <url>
    <loc>${esc(`${siteUrl}/collections/${encodeURIComponent(tag)}`)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`
      )
      .join('')
  } catch {
    collectionUrls = ''
  }

  /* ---------------- WORDPRESS PROJECTS ---------------- */
  let wpUrls = ''
  try {
    if (wpBase) {
      const r = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`)
      const posts = await r.json().catch(() => [])

      if (Array.isArray(posts)) {
        wpUrls = posts
          .map((post) => {
            const lastmod = post?.modified
              ? new Date(post.modified).toISOString()
              : nowIso

            return `
  <url>
    <loc>${esc(`${siteUrl}/project/${post.slug}`)}</loc>
    <lastmod>${esc(lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
          })
          .join('')
      }
    }
  } catch {
    wpUrls = ''
  }

  /* ---------------- ROOT URLS ---------------- */
  const rootUrls = `
  <url>
    <loc>${esc(siteUrl)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${esc(`${siteUrl}/store`)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${esc(`${siteUrl}/collections`)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  `

  /* ---------------- FINAL XML ---------------- */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  ${rootUrls}
  ${collectionUrls}
  ${storeUrls}
  ${wpUrls}

</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
