// pages/api/store/collections.js
// Simple curated collections based on tags you choose.
// You can change titles, covers, and order anytime.

const COLLECTIONS = [
  { slug: 'nature', title: 'Nature', tag: 'nature', cover: '/collections/nature.jpg' },
  { slug: 'wildlife', title: 'Wildlife', tag: 'wildlife', cover: '/collections/wildlife.jpg' },
  { slug: 'landscape', title: 'Landscape', tag: 'landscape', cover: '/collections/landscape.jpg' },
  { slug: 'travel', title: 'Travel', tag: 'travel', cover: '/collections/travel.jpg' },
  { slug: 'culture', title: 'Culture', tag: 'culture', cover: '/collections/culture.jpg' },
  { slug: 'history', title: 'History', tag: 'history', cover: '/collections/history.jpg' },
  { slug: 'lifestyle', title: 'Life Style', tag: 'lifestyle', cover: '/collections/lifestyle.jpg' },
  { slug: 'fine-art', title: 'Fine Art', tag: 'fine art', cover: '/collections/fine-art.jpg' },
]

export default async function handler(req, res) {
  return res.status(200).json({ ok: true, collections: COLLECTIONS })
}
