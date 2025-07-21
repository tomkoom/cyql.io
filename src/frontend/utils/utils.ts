import { CANISTER_IDS } from "@/constants/canisters"
import { APP_NAME_TLD } from "@/constants/constants"
import { Project } from "@/state/types/Project"

export function addSourceParam(url: string) {
  const source = APP_NAME_TLD
  const u = new URL(url)
  u.searchParams.set("utm_source", source)
  return u.toString()
}

// Utility function to get the correct logo URL
export const getLogoUrl = (project: Project): string => {
  // Check if logoUrl contains the assets canister ID
  if (project.logoUrl && project.logoUrl.includes(CANISTER_IDS.MAINNET.ASSETS)) {
    return project.logoUrl
  }

  // Fallback to logoDataUrl if available
  if (project.logoDataUrl) {
    return project.logoDataUrl
  }

  // Return empty string if no logo available
  return ""
}
