import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://mahasak.github.io/", // replace this with your deployed domain
  author: "Max Pijittum",
  desc: "A journey through endless learning",
  title: "mahasak.com",
  ogImage: "mahasak-text-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const LOCALE = ["en-EN","th-TH"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/mahasak",
    linkTitle: `Me on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/mahasak.pijittum",
    linkTitle: `Me on Facebook`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mahasakpijittum/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/maxpijittum",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
];
