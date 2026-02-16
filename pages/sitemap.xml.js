// pages/sitemap.xml.js

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function getServerSideProps({ res }) {
  const siteUrl = 'https://jeevanchandimal.com'
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  // ✅ Only allow high-value collections in sitemap
  const ALLOWED_COLLECTIONS = [
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

  // --- 1) WordPress posts ---
  let posts = []
  try {
    const r = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`)
    posts = await r.json()
    if (!Array.isArray(posts)) posts = []
  } catch {
    posts = []
  }

  const wpUrls = posts.map((post) => {
    const lastmod = post?.modified ? new Date(post.modified).toISOString() : new Date().toISOString()
    return `
      <url>
        <loc>${siteUrl}/project/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
  })

  // --- 2) Store photos ---
  let storePhotos = []
  try {
    const { data } = await supabaseAdmin
      .from('photos')
      .select('id, updated_at, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(2000)

    storePhotos = Array.isArray(data) ? data : []
  } catch {
    storePhotos = []
  }

  const storeUrls = storePhotos.map((p) => {
    const lastmod = new Date(p.updated_at || p.created_at || Date.now()).toISOString()
    return `
      <url>
        <loc>${siteUrl}/store/${p.id}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
      </url>
    `
  })

  // --- 3) Collections (filtered) ---
  const collectionUrls = ALLOWED_COLLECTIONS.map((tag) => `
    <url>
      <loc>${siteUrl}/collections/${tag}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.75</priority>
    </url>
  `)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

  ${collectionUrls.join('')}
  ${storeUrls.join('')}
  ${wpUrls.join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
