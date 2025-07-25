import { CANISTER_IDS } from "@/constants/canisters"
import { APP_NAME_TLD } from "@/constants/constants"
import { Project } from "@/state/types/Project"

export function addSourceParam(url: string) {
  const source = APP_NAME_TLD

  // Handle URLs without protocol by adding https://
  let fullUrl = url
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    fullUrl = `https://${url}`
  }

  try {
    const u = new URL(fullUrl)
    u.searchParams.set("utm_source", source)
    return u.toString()
  } catch (error) {
    console.warn(`Failed to add UTM source to URL: ${url}`, error)
    return url
  }
}

export const getLogoUrl = (project: Project): string => {
  if (project.logoUrl && project.logoUrl.includes(CANISTER_IDS.MAINNET.ASSETS)) {
    return project.logoUrl
  }

  return ""
}

// Utility function to sort collections alphabetically by category ID
export const sortCollectionsByCategory = (collections: any[], categoriesMap: any[]) => {
  return collections.sort((a, b) => {
    const categoryA = categoriesMap.find((cat) => cat.id === a.categoryId)?.lbl || a.categoryId
    const categoryB = categoriesMap.find((cat) => cat.id === b.categoryId)?.lbl || b.categoryId
    return categoryA.localeCompare(categoryB)
  })
}
