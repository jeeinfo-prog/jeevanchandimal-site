// pages/sitemap.xml.js
import { supabaseAdmin } from '../lib/supabaseAdmin'

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function getServerSideProps({ res }) {
  const siteUrl = 'https://jeevanchandimal.com'
  const wpBase = process.env.NEXT_PUBLIC_WP_BASE_URL

  // ✅ Only include collections that have at least N published photos
  const MIN_TAG_PHOTOS = 3

  // ✅ Optional boost list (only included if they also exist in DB)
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

  // --- 1) WordPress posts ---
  let posts = []
  try {
    const r = await fetch(`${wpBase}/wp-json/wp/v2/posts?per_page=100`)
    const j = await r.json()
    posts = Array.isArray(j) ? j : []
  } catch {
    posts = []
  }

  const wpUrls = posts.map((post) => {
    const lastmod = post?.modified
      ? new Date(post.modified).toISOString()
      : new Date().toISOString()

    return `
      <url>
        <loc>${esc(`${siteUrl}/project/${post.slug}`)}</loc>
        <lastmod>${esc(lastmod)}</lastmod>
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
        <loc>${esc(`${siteUrl}/store/${p.id}`)}</loc>
        <lastmod>${esc(lastmod)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
      </url>
    `
  })

  // --- 3) Collections (AUTO filtered by DB tags) ---
  // We fetch tags from Supabase and count them in JS (safe/simple).
  // With <= 2000 photos this is fine.
  let collectionTags = []
  let collectionsLastmod = null

  try {
    const { data } = await supabaseAdmin
      .from('photos')
      .select('tags, updated_at, created_at')
      .eq('status', 'published')
      .not('thumb_url', 'is', null)
      .not('preview_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(2000)

    const rows = Array.isArray(data) ? data : []

    const counts = new Map()
    let maxDate = 0

    for (const row of rows) {
      const d = new Date(row.updated_at || row.created_at || 0).getTime()
      if (d > maxDate) maxDate = d

      const tags = Array.isArray(row.tags) ? row.tags : []
      for (const t of tags) {
        const tag = String(t || '').trim().toLowerCase()
        if (!tag) continue
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }

    collectionsLastmod = maxDate ? new Date(maxDate).toISOString() : null

    // include tags that meet threshold
    collectionTags = Array.from(counts.entries())
      .filter(([, c]) => c >= MIN_TAG_PHOTOS)
      .map(([tag]) => tag)
  } catch {
    collectionTags = []
    collectionsLastmod = null
  }

  // prefer your curated list first, but only if present in collectionTags
  const preferredSet = new Set(PREFERRED_COLLECTIONS.map((t) => t.toLowerCase()))
  const tagSet = new Set(collectionTags)

  const preferred = PREFERRED_COLLECTIONS.map((t) => t.toLowerCase()).filter((t) => tagSet.has(t))
  const others = collectionTags
    .filter((t) => !preferredSet.has(t))
    .sort((a, b) => a.localeCompare(b))

  const finalCollectionTags = [...preferred, ...others]

  const collectionUrls = finalCollectionTags.map((tag) => `
    <url>
      <loc>${esc(`${siteUrl}/collections/${encodeURIComponent(tag)}`)}</loc>
      ${collectionsLastmod ? `<lastmod>${esc(collectionsLastmod)}</lastmod>` : ''}
      <changefreq>weekly</changefreq>
      <priority>0.75</priority>
    </url>
  `)

  // Top-level lastmod (use newest of store photos / wp / collections)
  const nowIso = new Date().toISOString()
  const storeLastmod = storePhotos[0]?.updated_at || storePhotos[0]?.created_at || null
  const storeLastmodIso = storeLastmod ? new Date(storeLastmod).toISOString() : null

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
    <lastmod>${esc(storeLastmodIso || nowIso)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${esc(`${siteUrl}/collections`)}</loc>
    <lastmod>${esc(collectionsLastmod || nowIso)}</lastmod>
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
