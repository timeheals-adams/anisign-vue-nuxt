// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  "compatibilityDate": "2025-07-15",
  "devtools"         : { "enabled": true },

  "modules": [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@peterbud/nuxt-query",
  ],
  "image": {
    // Allow Nuxt Image (IPX) to fetch, resize and cache remote images.
    "domains": [
      "45.153.71.157",
      "shikimori.one",
    ],
  },
  "fonts": {
    // What font weights, styles and subsets to load for each font
    "defaults": {
      "weights": [400],
      "styles" : ["normal", "italic"],
      "subsets": [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },

    /*
     * Load Montserrat as the main font for the entire site
     */
    "families": [
      {
        "name"    : "Montserrat",
        "provider": "google",
        "weights" : [400, 500, 600, 700],
      },
    ],
  },
});