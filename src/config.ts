import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.arguflow.ai/",
  author: "Arguflow Core Team",
  desc: "A blog about Arguflow, a new way for teams to collaborate on complex ideas.",
  title: "Arguflow Blog",
  ogImage: "arguflow-og.png",
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const LOCALE = ["en-EN"];

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 140,
  height: 48,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Discord",
    href: "https://discord.gg/CuJVfgZf54",
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/orgs/arguflow",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/+vUOq6omKOn5lY2Zh",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  },
  {
    name: "Matrix",
    href: "https://matrix.to/#/#arguflow-general:matrix.zerodao.gg",
    linkTitle: `${SITE.title} on Matrix`,
    active: true,
  },
  // {
  //   name: "Instagram",
  //   href: "https://instagram.com/arguflow",
  //   linkTitle: `${SITE.title} on Instagram`,
  //   active: true,
  // },
  {
    name: "Mail",
    href: "contact@arguflow.gg",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/arguflow",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  // {
  //   name: "Twitch",
  //   href: "https://twitch.tv/arguflow",
  //   linkTitle: `${SITE.title} on Twitch`,
  //   active: true,
  // },
  // {
  //   name: "YouTube",
  //   href: "https://youtube.com/@arguflow",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: true,
  // },
];
