export const PHOTOS = [
  {
    id: 'sigiriya-sunrise-001',
    title: 'Sigiriya Sunrise',
    tags: ['Sri Lanka', 'Sigiriya', 'Sunrise', 'Landscape'],
    orientation: 'landscape',
    previewUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    // later you’ll store R2 keys here (private originals)
    originalJpgKey: 'private/originals/sigiriya-sunrise-001.jpg',
    originalRawKey: 'private/originals/sigiriya-sunrise-001.raw',
  },
  {
    id: 'colombo-night-002',
    title: 'Colombo Night Streets',
    tags: ['Sri Lanka', 'Colombo', 'Night', 'Street'],
    orientation: 'landscape',
    previewUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    originalJpgKey: 'private/originals/colombo-night-002.jpg',
    originalRawKey: 'private/originals/colombo-night-002.raw',
  },
  {
    id: 'portrait-003',
    title: 'Portrait Study',
    tags: ['Portrait', 'Studio', 'Moody'],
    orientation: 'portrait',
    previewUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    originalJpgKey: 'private/originals/portrait-003.jpg',
    originalRawKey: 'private/originals/portrait-003.raw',
  },
]

export function getPhotoById(id) {
  return PHOTOS.find((p) => p.id === id) || null
}
