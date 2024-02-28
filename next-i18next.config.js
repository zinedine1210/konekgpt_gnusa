module.exports = {
  i18n: {
    defaultLocale: "id",
    locales: ['en', 'id'],
    localeDetection:false,
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
      },
      {
        domain: 'example.id',
        defaultLocale: 'id',
      }
    ],
  },
};