import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import remarkReadingTime from "./src/utils/remarkReadingTime";
import cookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    cookieconsent({
      gui_options: {
        consent_modal: {
          layout: "cloud", // box/cloud/bar
          position: "bottom center", // bottom/middle/top + left/right/center
          transition: "slide", // zoom/slide
          swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
          layout: "box", // box/bar
          // position: 'left',           // left/right
          transition: "slide", // zoom/slide
        },
      },
      languages: {
        en: {
          consent_modal: {
            title:
              '<div style="display:flex;flex-direction:column;align-items:center;"><div>Hello, it\'s cookie time!</div></div>',
            description:
              'Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. Please see our <a href="https://mahasak.com/policy" target="_blank">privacy policy</a>.',
            primary_btn: {
              text: "Accept all",
              role: "accept_all", //'accept_selected' or 'accept_all'
            },
            secondary_btn: {
              text: "Preferences",
              role: "settings", //'settings' or 'accept_necessary'
            },
            revision_message:
              "<br><br> Dear user, terms and conditions have changed since the last time you visited!",
          },
          settings_modal: {
            title: "mahasak.com Cookies settings",
            save_settings_btn: "Save current selection",
            accept_all_btn: "Accept all",
            reject_all_btn: "Reject all",
            close_btn_label: "Close",
            cookie_table_headers: [
              { col1: "Name" },
              { col2: "Domain" },
              { col3: "Expiration" },
            ],
            blocks: [
              {
                title: "Cookie usage",
                description:
                  'Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. Please see our <a href="https://mahasak.com/policy" target="_blank">privacy policy</a>.',
              },
              {
                title: "Strictly necessary cookies",
                description:
                  "These cookies are strictly necessary for the website to function. They are usually set to handle only your actions in response to a service request, such as setting your privacy preferences, navigating between pages, and setting your preferred version. You can set your browser to block these cookies or to alert you to their presence, but some parts of the website will not function without them. These cookies do not store any personally identifiable information.",
                toggle: {
                  value: "necessary",
                  enabled: true,
                  readonly: true, //cookie categories with readonly=true are all treated as "necessary cookies"
                },
              },
              {
                title: "Analytics & Performance cookies",
                description:
                  "These cookies are used for analytics and performance metering purposes. They are used to collect information about how visitors use our website, which helps us improve it over time. They do not collect any information that identifies a visitor. The information collected is aggregated and anonymous.",
                toggle: {
                  value: "analytics",
                  enabled: false,
                  readonly: false,
                },
              },
              {
                title: "More information",
                description:
                  'For more information about cookie usage, privacy, and how we use the data we collect, please refer to our <a href="https://mahasak.com/policy" target="_blank">privacy policy</a> and <a href="https://mahasak.com/terms" target="_blank">terms of use</a>.',
              },
            ],
          },
        },
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
