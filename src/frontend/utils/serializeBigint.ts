import type { ProjectV2 } from "@/state/_types/curated_projects_types"

export const bigintToString = (obj: Object): Object => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}

export const bigintToNumber = (obj: Object): Object => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  return JSON.parse(serialized)
}

// projects

export const serializeProjectsToString = (obj: Object): ProjectV2[] => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}
