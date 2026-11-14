export const SOCIAL_LINKS = {
  youtube: {
    url: "https://www.youtube.com/@WalkQuestApp",
    handle: "@WalkQuestApp",
  },
  instagram: {
    url: "https://www.instagram.com/walkquest_app/",
    handle: "@walkquest_app",
  },
  tiktok: {
    url: "https://www.tiktok.com/@walkquest",
    handle: "@walkquest",
  },
} as const;

export const SOCIAL_LINKS_BY_KEY = {
  socialYouTube: SOCIAL_LINKS.youtube,
  socialInstagram: SOCIAL_LINKS.instagram,
  socialTikTok: SOCIAL_LINKS.tiktok,
} as const;
