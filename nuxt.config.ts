 import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// PWA Config
const title = "MovieBox";
const shortTitle = "Rent Movie";
const description = "Rent movies from here";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["vuetify/styles",'@mdi/font/css/materialdesignicons.css'],

  devtools: { enabled: true },

  // enable takeover mode
  typescript: { shim: false },

  build: { transpile: ["vuetify"] },

  // Based on docs found here - https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/test-utils/module',
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
  ],
  supabase: { redirect: false },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  

  app: {
    head: {
      title: "MovieBox",
      titleTemplate: "%s | Rent Movies Online",
      meta: [
        {
          hid: "",
          name: "",
          content: description,
        },
      ],
    },
  },
  compatibilityDate: "2024-10-02",
});