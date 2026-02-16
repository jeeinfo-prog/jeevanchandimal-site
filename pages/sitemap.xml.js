// pages/sitemap.xml.js
import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps({ res }) {
  const siteUrl = 'https://jeevanchandimal.com'
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  // ✅ Only allow REAL collection pages here (avoid thin/keyword-spam pages)
  const COLLECTION_TAGS = [
    'sri-lanka',
    'nature',
    'wildlife',
    'landscape',
    'travel',
    'culture',
    'history',
    'lifestyle',
    'fineart',
  ]

  // WordPress posts
  let posts = []
  try {
    const response = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`)
    posts = await response.json()
  } catch {
    posts = []
  }

  // ✅ Store photos (published) — include /store/<id> in sitemap
  let photos = []
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data } = await supabaseAdmin
      .from('photos')
      .select('id, created_at, updated_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(5000)

    photos = data || []
  } catch {
    photos = []
  }

  // Build URL entries
  const baseUrls = [
    { loc: `${siteUrl}`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/store`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}/collections`, changefreq: 'weekly', priority: '0.85' },
  ]

  const collectionUrls = COLLECTION_TAGS.map((tag) => ({
    loc: `${siteUrl}/collections/${encodeURIComponent(tag)}`,
    changefreq: 'weekly',
    priority: '0.75',
  }))

  const postUrls = (posts || [])
    .filter((p) => p?.slug)
    .map((post) => ({
      loc: `${siteUrl}/project/${post.slug}`,
      lastmod: post?.modified ? new Date(post.modified).toISOString() : null,
      changefreq: 'monthly',
      priority: '0.7',
    }))

  const photoUrls = (photos || [])
    .filter((p) => p?.id)
    .map((p) => ({
      loc: `${siteUrl}/store/${p.id}`,
      lastmod: (p.updated_at || p.created_at) ? new Date(p.updated_at || p.created_at).toISOString() : null,
      changefreq: 'weekly',
      priority: '0.8',
    }))

  const all = [
    ...baseUrls,
    ...collectionUrls,
    ...postUrls,
    ...photoUrls,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map((u) => {
    const lastmod = u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''
    return `<url>
  <loc>${u.loc}</loc>
  ${lastmod}
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
  })
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
