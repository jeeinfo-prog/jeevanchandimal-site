/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,

  // ✅ Pages router i18n (works fine with next-intl usage)
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // ✅ Disable Next Image Optimizer (no sharp required)
  images: {
    unoptimized: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)