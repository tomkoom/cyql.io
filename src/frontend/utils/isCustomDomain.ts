import { APP_ALTERNATIVE_ORIGIN } from "@/constants/constants"

export const isCustomDomain = (): boolean => {
  return location.origin === APP_ALTERNATIVE_ORIGIN
}
