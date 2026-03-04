/** @type {import('next').NextConfig} */

const nextConfig = {
  // ✅ Keep next-intl minimal config
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // ✅ Disable Next image optimizer (removes several audit vulnerabilities)
  // You are mostly using <img> tags anyway
  images: {
    unoptimized: true,
  },

  // ✅ Ensure sharp loads correctly on Vercel (Linux runtime)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('sharp')
    }
    return config
  },
}

module.exports = nextConfig