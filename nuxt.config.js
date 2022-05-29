const env = require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')

export default {
  // Required by Netlify to work
  // @see https://nuxtjs.org/announcements/going-full-static/
  // @see https://nuxtjs.org/deployments/netlify/
  // target: 'static',

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  /*
  ** Merge environment variables.
  */
  env: env.parsed,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ecoplants',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', property: 'og:title', content: 'Ecoplants' },
      { hid: 'og:image', property: 'og:image', content: 'https://ecoplants.netlify.app/cgn-og-cover.png' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes:"32x32", href: '/favicon-32x32.png' },
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/directives.js',
    '~/plugins/lightGallery.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-analytics',
    '@nuxt/image',
  ],

  styleResources: {
    scss: [
      './assets/sass/abstracts/_abstracts.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // 'nuxt-lazy-load',
    // Generate static JSON based on data fetched from source.
    '~/modules/cgnData.js',
    // Get pictures from Google Drive.
    // '~/modules/driveData.js',
    // ['~/modules/driveData', { token: '123' }]
  ],

  // @see https://image.nuxtjs.org/getting-started/installation
  image: {
    // @see https://image.nuxtjs.org/api/options#domains
    domains: ['drive.google.com']
  },

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: [400, 500, 700],
    }
  },

  googleAnalytics: {
    id: 'UA-17609068-7'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

}
