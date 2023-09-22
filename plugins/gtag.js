// Add Google Analytics 4 tag
// Necessary for vue-gtag
// @see https://kuroco.app/docs/faq/how-do-i-set-up-google-analytics-4-in-nuxtjs/
// @see also, if it does not work https://github.com/johannschopplich/nuxt-gtag
import Vue from 'vue';
import VueGtag from 'vue-gtag';
Vue.use(VueGtag, {
  config: { id: 'G-XRBTSZ56M9' }
});
