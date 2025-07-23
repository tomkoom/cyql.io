import type { Project } from "@/state/types/Project"

/**
 * Converts BigInt values to strings to preserve precision for large numbers.
 * Use this for project IDs and other large numeric values that exceed JavaScript's
 * Number.MAX_SAFE_INTEGER (2^53 - 1).
 *
 * @example
 * // For collections with project IDs:
 * const collections = bigintToString(backendResponse)
 */
export const bigintToString = (obj: Object) => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? String(v) : v))
  return JSON.parse(serialized)
}

/**
 * Converts BigInt values to numbers.
 * WARNING: This can cause precision loss for large numbers (> 2^53 - 1).
 * Avoid using this for project IDs - use bigintToString instead.
 *
 * @deprecated For project IDs, use bigintToString to prevent precision loss
 */
export const bigintToNumber = (obj: Object) => {
  const serialized = JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  return JSON.parse(serialized)
}
