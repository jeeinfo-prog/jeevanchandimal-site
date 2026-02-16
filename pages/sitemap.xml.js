// pages/sitemap.xml.js

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function getServerSideProps({ req, res }) {
  const siteUrl = 'https://jeevanchandimal.com'
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  const MIN_TAG_PHOTOS = 3
  const PREFERRED_COLLECTIONS = [
    'landscape',
    'wildlife',
    'nature',
    'culture',
    'history',
    'lifestyle',
    'sri-lanka',
    'colombo',
    'yala',
    'wilpattu',
    'dambulla',
    'kandy',
    'galle',
    'sigiriya',
    'ampara',
    'wellawaya',
    'batticaloa',
    'hatton',
  ]

  // Detect current host/proto (works on Vercel + local)
  const proto = (req.headers['x-forwarded-proto'] || 'https')
    .toString()
    .split(',')[0]
    .trim()
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '')
    .toString()
    .split(',')[0]
    .trim()
  const base = host ? `${proto}://${host}` : siteUrl

  /* ---------------- WORDPRESS POSTS ---------------- */
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
              : new Date().toISOString()

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

  /* ---------------- STORE PHOTOS (via API) ---------------- */
  // This avoids service-role env issues in sitemap runtime.
  let storePhotos = []
  try {
    const r = await fetch(`${base}/api/store/photos`, {
      headers: { 'Cache-Control': 'no-store' },
    })
    const j = await r.json().catch(() => null)
    storePhotos = Array.isArray(j?.photos) ? j.photos : []
  } catch {
    storePhotos = []
  }

  // Build store URLs
  const nowIso = new Date().toISOString()
  const storeUrls = storePhotos
    .map((p) => {
      const id = String(p?.id || '').trim()
      if (!id) return ''

      // We don't get updated_at from /api/store/photos; use nowIso (acceptable)
      return `
  <url>
    <loc>${esc(`${siteUrl}/store/${id}`)}</loc>
    <lastmod>${esc(nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
    })
    .filter(Boolean)
    .join('')

  /* ---------------- COLLECTIONS (from tags in API) ---------------- */
  let collectionUrls = ''
  let collectionsLastmod = nowIso

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

    const collectionTags = Array.from(counts.entries())
      .filter(([, c]) => c >= MIN_TAG_PHOTOS)
      .map(([tag]) => tag)

    const preferredSet = new Set(PREFERRED_COLLECTIONS.map((t) => t.toLowerCase()))
    const tagSet = new Set(collectionTags)

    const preferred = PREFERRED_COLLECTIONS.map((t) => t.toLowerCase()).filter((t) =>
      tagSet.has(t)
    )
    const others = collectionTags
      .filter((t) => !preferredSet.has(t))
      .sort((a, b) => a.localeCompare(b))

    const finalCollectionTags = [...preferred, ...others]

    collectionUrls = finalCollectionTags
      .map(
        (tag) => `
  <url>
    <loc>${esc(`${siteUrl}/collections/${encodeURIComponent(tag)}`)}</loc>
    <lastmod>${esc(collectionsLastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`
      )
      .join('')
  } catch {
    collectionUrls = ''
    collectionsLastmod = nowIso
  }

  /* ---------------- SITEMAP XML ---------------- */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

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
    <lastmod>${esc(collectionsLastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>

  ${collectionUrls}
  ${storeUrls}
  ${wpUrls}

</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
