export const trimDescription = (s: string, length: number = 40): string => {
  const maxLength = length

  // trim the string to the maximum length
  let trimmed = s.substring(0, maxLength)

  // re-trim if we are in the middle of a word
  trimmed = trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")))

  // remove comma in the end
  // trimmed = trimmed.replace(/,(?=[^,]*$)/, "")

  // remove symbols in the end of string
  if (trimmed.charAt(trimmed.length - 1) === ",") trimmed = trimmed.slice(0, -1)
  if (trimmed.charAt(trimmed.length - 1) === ":") trimmed = trimmed.slice(0, -1)

  return trimmed + "…"
}
