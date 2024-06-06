export const trimName = (s: string): string => {
  return s.length > 40 ? `${s.substring(0, 40)}…` : s
}
