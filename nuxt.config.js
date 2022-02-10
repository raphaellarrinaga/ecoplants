const env = require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
// const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/14xi3-UP9TpUs6ZfxwhJiluJneqqpXHY27Me5b_NCDo4/values/Content!A1:I1000?key='+ GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/19Pw8bkQBliB997SbT1BvDZiKay_H-_2jH8HNHbDEpLw/values/data!A1:I1000?key='+ GOOGLE_API_KEY

export default {
  // Required by Netlify to work
  // @see https://nuxtjs.org/announcements/going-full-static/
  target: 'static',

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
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Generate static JSON based on data fetched from source.
    '~/modules/cgnData.js',
  ],

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: [400, 500, 700],
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

}
