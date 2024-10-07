import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Use mdi-svg for SVG icons
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "vuetify/styles"; // Vuetify styles
import "@mdi/font/css/materialdesignicons.css"; // Ensure you import the CSS

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi", // Default icon set
      aliases,
      sets: {
        mdi,
      },
    },
  });
  app.vueApp.use(vuetify);
});
