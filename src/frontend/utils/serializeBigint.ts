export const bigintToString = (obj: Object): Object => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}

export const bigintToNumber = (obj: Object): Object => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  return JSON.parse(serialized)
}
