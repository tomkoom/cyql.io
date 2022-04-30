const formatStr8 = (str) => (str.length > 8 ? `${str.substring(0, 8)}…` : str);
const formatStr16 = (str) => (str.length > 16 ? `${str.substring(0, 16)}…` : str);

const formatWebsite = (url) => {
  let formattedURL = url.replace(/(^\w+:|^)\/\//, "");
  formattedURL = formattedURL.replace(/\/$/, ""); // remove trailing slash

  return formattedURL.length > 16 ? `${formattedURL.substring(0, 16)}…` : formattedURL;
};

const getTwitterUsername = (url) => {
  const username = url.split(".com/")[1];
  return username;
};

const formatDiscord = (url) => {
  if (url.includes("discord.gg/")) {
    return url.split("discord.gg/")[1];
  }
  if (url.includes("discord.com/")) {
    return url.split("discord.com/")[1].length > 16
      ? `${url.split("discord.com/")[1].substring(0, 16)}…`
      : url.split("discord.com/")[1];
  }
  return url;
};

const formatDate = (timestamp) => {
  const ts = timestamp;
  const date = new Date(ts);
  return date.toLocaleString("en-GB");
};

const formatString = (string) => {
  const str = string.replace(/(^\w+:|^)\/\//, "");
  return str.length > 8 ? `${str.substring(0, 8)}…` : str;
};

export {
  formatStr8,
  formatStr16,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
  formatDate,
  formatString,
};
