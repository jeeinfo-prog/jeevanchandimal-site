// pages/sitemap.xml.js
import { createClient } from '@supabase/supabase-js'

function escXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlNode({ loc, lastmod, changefreq, priority }) {
  return `
  <url>
    <loc>${escXml(loc)}</loc>
    ${lastmod ? `<lastmod>${escXml(lastmod)}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${escXml(changefreq)}</changefreq>` : ''}
    ${priority ? `<priority>${escXml(priority)}</priority>` : ''}
  </url>`
}

export async function getServerSideProps({ res, req }) {
  // ✅ Prefer env, but safely fallback to host (for preview deployments)
  const siteUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '') ||
    `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`

  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  // ---- 1) Fetch WP posts (existing behavior) ----
  let posts = []
  try {
    if (wpBase) {
      const r = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`, {
        headers: { 'Cache-Control': 'no-store' },
      })
      posts = await r.json().catch(() => [])
      if (!Array.isArray(posts)) posts = []
    }
  } catch {
    posts = []
  }

  // ---- 2) Fetch Store photos from Supabase ----
  let photos = []
  let collectionTags = new Set()

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY // (some people name it differently)

    // If you don't have service key set on Vercel yet, sitemap will still work (just without photos)
    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey)

      const { data, error } = await supabase
        .from('photos')
        .select('id, created_at, updated_at, tags')
        .eq('status', 'published')

      if (!error && Array.isArray(data)) {
        photos = data

        // collect tags for collections pages
        for (const p of data) {
          if (Array.isArray(p.tags)) {
            for (const t of p.tags) {
              const tag = String(t || '').trim().toLowerCase()
              if (tag) collectionTags.add(tag)
            }
          }
        }
      }
    }
  } catch {
    photos = []
    collectionTags = new Set()
  }

  // ---- 3) Build URLs ----
  const urls = []

  // Home + key pages
  urls.push(
    urlNode({ loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' }),
    urlNode({ loc: `${siteUrl}/store`, changefreq: 'daily', priority: '0.9' }),
    urlNode({ loc: `${siteUrl}/collections`, changefreq: 'weekly', priority: '0.8' })
  )

  // WP project posts
  for (const post of posts) {
    if (!post?.slug) continue
    const lastmod = post?.modified ? new Date(post.modified).toISOString() : null
    urls.push(
      urlNode({
        loc: `${siteUrl}/project/${post.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: '0.7',
      })
    )
  }

  // Store photo pages
  for (const p of photos) {
    if (!p?.id) continue
    const last =
      p.updated_at || p.created_at ? new Date(p.updated_at || p.created_at).toISOString() : null

    urls.push(
      urlNode({
        loc: `${siteUrl}/store/${p.id}`,
        lastmod: last,
        changefreq: 'weekly',
        priority: '0.8',
      })
    )
  }

  // Optional: collection tag pages (only if you have /collections/[tag])
  // If you don't have that page, comment this block out.
  for (const t of Array.from(collectionTags)) {
    urls.push(
      urlNode({
        loc: `${siteUrl}/collections/${encodeURIComponent(t)}`,
        changefreq: 'weekly',
        priority: '0.6',
      })
    )
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=600')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
