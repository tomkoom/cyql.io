export const formatStr8 = (str: string): string => {
  return str.length > 8 ? `${str.substring(0, 8)}…` : str
}

export const formatStr12 = (str: string): string => {
  return str.length > 12 ? `${str.substring(0, 12)}…` : str
}

export const formatStr16 = (str: string): string => {
  return str.length > 16 ? `${str.substring(0, 16)}…` : str
}

export const formatId = (str: string): string => {
  return str.substring(0, 2) + "..." + str.substring(str.length - 3)
}

export const formatWebsite = (url: string): string => {
  let formattedURL = url.replace(/(^\w+:|^)\/\//, "")
  formattedURL = formattedURL.replace(/\/$/, "") // remove trailing slash
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL
}

export const formatDiscord = (url: string): string => {
  const formattedURL = url.includes("discord.gg/")
    ? url.split("discord.gg/")[1]
    : url.includes("discord.com/")
    ? url.split("discord.com/")[1]
    : url
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL
}
