/** @type {import('next').NextConfig} */
const {i18n} = require("./next-i18next.config")
const prod = process.env.NODE_ENV === "production"
const runtimeCaching = require("next-pwa/cache")

const withPWA = require("next-pwa")({
  dest: 'public',
  disable: prod ? false : true,
  runtimeCaching
},)


const nextConfig = {
  // images:{
  //   domains: ['source.unsplash.com']
  // },
  env:{
    customKey:"my-value"
  },
  reactStrictMode: true,
  swcMinify:true,
  compress:true,
  trailingSlash:false,
  eslint: {
    ignoreDuringBuilds: true
  },
  optimizeFonts:true,
  i18n
}

module.exports = withPWA(nextConfig)
