// lib/aiCaptionGenerator.js

function clean(v) {
  return String(v || '').trim()
}

function extractWords(text) {
  return clean(text)
    .toLowerCase()
    .replace(/__.+$/, '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function normalizeHashtagTag(tag) {
  return clean(tag)
    .toLowerCase()
    .replace(/^#+/, '')
    .replace(/[_\s]+/g, '')
    .replace(/[^a-z0-9]/g, '')
}

function uniqueTags(tags, max = 18) {
  const seen = new Set()
  const out = []

  for (const t of tags) {
    const raw = normalizeHashtagTag(t)
    if (!raw) continue

    const normalized = `#${raw}`
    if (seen.has(normalized)) continue

    seen.add(normalized)
    out.push(normalized)

    if (out.length >= max) break
  }

  return out
}

function isUsefulWord(word) {
  const skip = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'into',
    'onto',
    'over',
    'under',
    'this',
    'that',
    'these',
    'those',
    'photo',
    'image',
    'print',
    'digital',
    'download',
    'premium',
    'licensing',
    'available',
    'sri',
    'lanka',
    'jpg',
    'jpeg',
    'png',
    'webp',
    'tif',
    'tiff',
    'jc',
    'lka',
  ])

  return word.length >= 4 && !skip.has(word)
}

function generateDynamicTags(title) {
  const words = extractWords(title)
  const tags = []

  for (const w of words) {
    if (!isUsefulWord(w)) continue
    tags.push(`#${w}`)
  }

  return tags
}

function detectLocationTags(title, tags = []) {
  const words = new Set([
    ...extractWords(title),
    ...tags.flatMap((t) => extractWords(t)),
  ])

  const out = ['#srilanka', '#exploresrilanka', '#travelsrilanka']

  if (words.has('jaffna')) {
    out.push('#jaffna', '#visitjaffna')
  }

  if (words.has('colombo')) {
    out.push('#colombo', '#visitcolombo')
  }

  if (words.has('kandy')) {
    out.push('#kandy', '#visitkandy')
  }

  if (words.has('ella')) {
    out.push('#ella', '#visitsrilanka')
  }

  if (words.has('sigiriya')) {
    out.push('#sigiriya', '#culturaltriangle')
  }

  if (words.has('galle')) {
    out.push('#galle', '#gallefort')
  }

  if (words.has('trincomalee')) {
    out.push('#trincomalee', '#eastcoastsrilanka')
  }

  if (words.has('nuwara') || words.has('eliya') || words.has('nuwaraeliya')) {
    out.push('#nuwaraeliya', '#hillcountrysrilanka')
  }

  if (words.has('lagoon')) {
    out.push('#lagoon')
  }

  if (words.has('beach')) {
    out.push('#beach')
  }

  if (words.has('sunset')) {
    out.push('#sunset')
  }

  if (words.has('sunrise')) {
    out.push('#sunrise')
  }

  if (words.has('nature')) {
    out.push('#nature')
  }

  if (words.has('wildlife')) {
    out.push('#wildlife')
  }

  if (words.has('landscape')) {
    out.push('#landscape')
  }

  if (words.has('travel')) {
    out.push('#travel')
  }

  if (words.has('culture') || words.has('cultural')) {
    out.push('#culture')
  }

  if (words.has('history') || words.has('historical')) {
    out.push('#history')
  }

  if (words.has('lifestyle')) {
    out.push('#lifestyle')
  }

  if (words.has('fineart')) {
    out.push('#fineart')
  }

  if (words.has('temple') || words.has('kovil')) {
    out.push('#temple', '#culture')
  }

  if (words.has('perahera')) {
    out.push('#perahera', '#culture')
  }

  return out
}

export async function generateCaption({ title, description, storeUrl, tags = [] }) {
  const safeTitle = clean(title)
  const safeDescription = clean(description)
  const safeStoreUrl = clean(storeUrl)
  const safeTags = Array.isArray(tags) ? tags.map(clean).filter(Boolean) : []

  const baseTags = [
    '#fineartphotography',
    '#landscapephotography',
    '#naturephotography',
    '#travelphotography',
    '#visualstorytelling',
    '#photography',
    '#beautifuldestinations',
    '#earthpix',
    '#ourplanetdaily',
    '#discoverearth',
    '#jeevanchandimal',
  ]

  const dynamicTags = generateDynamicTags(safeTitle)
  const locationTags = detectLocationTags(safeTitle, safeTags)
  const explicitTags = safeTags.map((t) => `#${normalizeHashtagTag(t)}`)

  const hashtags = uniqueTags(
    [
      ...explicitTags,
      ...dynamicTags,
      ...locationTags,
      ...baseTags,
    ],
    18
  )

  const parts = []

  if (safeTitle) parts.push(safeTitle)
  if (safeDescription) parts.push(safeDescription)

  parts.push('Available as print and digital download.')

  if (safeStoreUrl) {
    parts.push(safeStoreUrl)
  }

  if (hashtags.length) {
    parts.push(hashtags.join(' '))
  }

  return parts.join('\n\n')
}