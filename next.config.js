module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle sharp; keep it as a runtime dependency in node_modules
      config.externals = config.externals || []
      config.externals.push('sharp')
    }
    return config
  },
}
