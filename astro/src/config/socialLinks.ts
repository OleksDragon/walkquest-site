export const SOCIAL_LINKS = {
  youtube: {
    url: "https://www.youtube.com/@WalkQuestApp",
    handle: "@WalkQuestApp",
  },
  tiktok: {
    url: "https://www.tiktok.com/@walkquest",
    handle: "@walkquest",
  },
} as const;

export const SOCIAL_LINKS_BY_KEY = {
  socialYouTube: SOCIAL_LINKS.youtube,
  socialTikTok: SOCIAL_LINKS.tiktok,
} as const;
