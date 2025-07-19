import type { Project } from "@/state/types/Project"

export const bigintToString = (obj: Object): Object => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}

export const bigintToNumber = (obj: Object) => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  return JSON.parse(serialized)
}

export const serializeProjectsToString = (obj: Object): Project[] => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}
