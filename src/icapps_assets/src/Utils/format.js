const formatStr8 = (str) => (str.length > 8 ? `${str.substring(0, 8)}…` : str);
const formatStr12 = (str) => (str.length > 12 ? `${str.substring(0, 12)}…` : str);
const formatStr24 = (str) => (str.length > 24 ? `${str.substring(0, 24)}…` : str);

const formatWebsite = (url) => {
  let formattedURL = url.replace(/(^\w+:|^)\/\//, "");
  formattedURL = formattedURL.replace(/\/$/, ""); // remove trailing slash
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const getTwitterUsername = (url) => {
  const username = url.split(".com/")[1];
  return username;
};

const formatDiscord = (url) => {
  const formattedURL = url.includes("discord.gg/")
    ? url.split("discord.gg/")[1]
    : url.includes("discord.com/")
    ? url.split("discord.com/")[1]
    : url;
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const formatDate = (timestamp) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const ts = timestamp;
  const date = new Date(ts);
  return date.toLocaleString("en-GB", options);
};

const formatDate2 = (timestamp) => {
  const ts = timestamp;
  const date = new Date(ts);
  return date.toDateString();
};

export {
  formatStr8,
  formatStr12,
  formatStr24,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
  formatDate,
  formatDate2,
};
