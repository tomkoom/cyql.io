export const bigintToNum = (obj: Object) => {
  const serialized = JSON.stringify(obj, (_, v) =>
    typeof v === "bigint" ? Number(v) : v,
  )
  return JSON.parse(serialized)
}
