const formatStr8 = (str: string): string => {
  return str.length > 8 ? `${str.substring(0, 8)}…` : str;
};
const formatStr12 = (str: string): string => {
  return str.length > 12 ? `${str.substring(0, 12)}…` : str;
};

const formatStr16 = (str: string): string => {
  return str.length > 16 ? `${str.substring(0, 16)}…` : str;
};

const formatId = (str: string): string => {
  return str.substring(0, 5) + "..." + str.substring(str.length - 3);
};

const formatProtocol = (url: string): string => {
  // no protocol
  let formatted = url.replace(/(^\w+:|^)\/\//, "");
  // no trailing slash
  formatted = formatted.replace(/\/$/, "");
  return formatted;
};

const formatNumber = (str: string): string => {
  const regex = /[.,\s]/g;
  const formatted = str.replace(regex, "");
  return formatted;
};

const formatWebsite = (url: string): string => {
  let formattedURL = url.replace(/(^\w+:|^)\/\//, "");
  formattedURL = formattedURL.replace(/\/$/, ""); // remove trailing slash
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const formatDiscord = (url: string): string => {
  const formattedURL = url.includes("discord.gg/")
    ? url.split("discord.gg/")[1]
    : url.includes("discord.com/")
    ? url.split("discord.com/")[1]
    : url;
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const formatDate = (timestamp: string): string => {
  const ts = timestamp;
  const date = new Date(ts);
  return date.toDateString();
};

export {
  formatStr8,
  formatStr12,
  formatStr16,
  formatId,
  formatProtocol,
  formatNumber,
  formatWebsite,
  formatDiscord,
  formatDate,
};
