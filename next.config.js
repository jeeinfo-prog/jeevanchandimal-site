/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Keep sharp external so it loads native binary at runtime (Vercel Linux)
      config.externals = config.externals || []
      config.externals.push('sharp')
    }
    return config
  },
}
