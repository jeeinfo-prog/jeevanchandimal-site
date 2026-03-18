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

function uniqueTags(tags) {
  const seen = new Set()
  const out = []

  for (const t of tags) {
    const raw = clean(t).toLowerCase()
    if (!raw) continue

    const normalized = raw.startsWith('#') ? raw : `#${raw}`
    if (seen.has(normalized)) continue

    seen.add(normalized)
    out.push(normalized)
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
    'jpg',
    'jpeg',
    'png',
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

function detectLocationTags(title) {
  const words = new Set(extractWords(title))
  const tags = ['#srilanka', '#exploresrilanka', '#travelsrilanka']

  if (words.has('jaffna')) {
    tags.push('#jaffna', '#visitjaffna')
  }

  if (words.has('colombo')) {
    tags.push('#colombo', '#visitcolombo')
  }

  if (words.has('kandy')) {
    tags.push('#kandy', '#visitkandy')
  }

  if (words.has('ella')) {
    tags.push('#ella', '#visitsrilanka')
  }

  if (words.has('sigiriya')) {
    tags.push('#sigiriya', '#culturaltriangle')
  }

  if (words.has('galle')) {
    tags.push('#galle', '#gallefort')
  }

  if (words.has('trincomalee')) {
    tags.push('#trincomalee', '#eastcoastsrilanka')
  }

  if (words.has('nuwara') || words.has('eliya')) {
    tags.push('#nuwaraeliya', '#hillcountrysrilanka')
  }

  if (words.has('lagoon')) {
    tags.push('#lagoon')
  }

  if (words.has('beach')) {
    tags.push('#beach')
  }

  if (words.has('sunset')) {
    tags.push('#sunset')
  }

  if (words.has('sunrise')) {
    tags.push('#sunrise')
  }

  if (words.has('nature')) {
    tags.push('#nature')
  }

  if (words.has('wildlife')) {
    tags.push('#wildlife')
  }

  if (words.has('temple') || words.has('kovil')) {
    tags.push('#temple', '#culture')
  }

  return tags
}

export function generateCaption({ title, description, storeUrl }) {
  const safeTitle = clean(title)
  const safeDescription = clean(description)
  const safeStoreUrl = clean(storeUrl)

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
  const locationTags = detectLocationTags(safeTitle)

  const hashtags = uniqueTags([
    ...dynamicTags,
    ...locationTags,
    ...baseTags,
  ])

  const parts = []

  if (safeTitle) parts.push(safeTitle)
  if (safeDescription) parts.push(safeDescription)

  parts.push('Available as print and digital download.')

  if (safeStoreUrl) {
    parts.push(safeStoreUrl)
  }

  parts.push(hashtags.join(' '))

  return parts.join('\n\n')
}