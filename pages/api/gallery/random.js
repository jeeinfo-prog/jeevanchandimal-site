// pages/api/gallery/random.js
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const limit = Math.max(4, Math.min(40, Number(req.query.limit || 12)))

    // ✅ Example: choose random rows
    // If you have a lot of rows, you can optimize later.
    const { data, error } = await supabaseAdmin
      .from('photos')
      .select('id, public_url, delivery_url, title')
      .limit(200)

    if (error) throw error

    const rows = Array.isArray(data) ? data : []
    const urls = rows
      .map((r) => r.delivery_url || r.public_url)
      .filter(Boolean)

    // shuffle
    for (let i = urls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[urls[i], urls[j]] = [urls[j], urls[i]]
    }

    const picked = urls.slice(0, limit)
    return res.status(200).json({ images: picked })
  } catch (e) {
    return res.status(200).json({ images: [] })
  }
}