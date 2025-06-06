// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts'
  ],

  app: {
    head: {
      title: 'Personal Portfolio',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap' },
        { rel: 'icon', type: 'image/x-icon', href: '/assets/images/logo.ico' }
      ]
    }
  },

  css: ['~/assets/css/style.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'ion-icon'
    }
  },

  content: {
    
  }
})
