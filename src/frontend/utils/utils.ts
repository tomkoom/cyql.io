import { APP_NAME_TLD } from "@/constants/constants"

export function addSourceParam(url: string) {
  const source = APP_NAME_TLD
  const u = new URL(url)
  u.searchParams.set("utm_source", source)
  return u.toString()
}
