export const HOME_CONSTANTS = {
  SECTIONS: {
    NEW: "Newly Listed",
    MOST_UPVOTED: "Most Upvoted",
    HIGHLIGHTED: "New in",
  },
  ERRORS: {
    GENERIC: "Something went wrong. Please try again.",
    LOADING_FAILED: "Unable to load homepage data",
    RETRY_BUTTON: "Try Again",
    NO_NEW_PROJECTS: "No new projects found",
    NO_UPVOTED_PROJECTS: "No upvoted projects found",
    NO_CATEGORY_PROJECTS: "No projects found in",
  },
  LOADING: {
    CATEGORIES: "Loading Categories...",
  },
} as const

export const CATEGORY_DISPLAY_NAMES = {
  "Social Networks": "Social dApps",
} as const

export const getCategoryDisplayName = (categoryLabel: string): string => {
  return CATEGORY_DISPLAY_NAMES[categoryLabel as keyof typeof CATEGORY_DISPLAY_NAMES] || categoryLabel
}
