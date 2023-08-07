import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.arguflow.ai/",
  author: "Arguflow Core Team",
  desc: "A blog about Arguflow, a new way for teams to collaborate on complex ideas.",
  title: "Arguflow",
  ogImage: "arguflow-og.png",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 140,
  height: 48,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/orgs/arguflow/repositories",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/arguflow",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
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
  {
    name: "Twitch",
    href: "https://twitch.tv/arguflow",
    linkTitle: `${SITE.title} on Twitch`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@arguflow",
    linkTitle: `${SITE.title} on YouTube`,
    active: true,
  },
];
