const formatStr8 = (str) => (str.length > 8 ? `${str.substring(0, 8)}…` : str);
const formatStr12 = (str) => (str.length > 12 ? `${str.substring(0, 12)}…` : str);
const formatStr16 = (str) => (str.length > 16 ? `${str.substring(0, 16)}…` : str);
const formatStr20 = (str) => (str.length > 20 ? `${str.substring(0, 20)}…` : str);
const formatStr24 = (str) => (str.length > 24 ? `${str.substring(0, 24)}…` : str);

const formatId = (str) => str.substring(0, 5) + "..." + str.substring(str.length - 3);

const formatProtocol = (url) => {
  // no protocol
  let res = url.replace(/(^\w+:|^)\/\//, "");
  // no trailing slash
  res = res.replace(/\/$/, "");
  return res;
};

const formatNumber = (str) => {
  const regex = /[.,\s]/g;
  const res = str.replace(regex, "");
  return res;
};

const formatWebsite = (url) => {
  let formattedURL = url.replace(/(^\w+:|^)\/\//, "");
  formattedURL = formattedURL.replace(/\/$/, ""); // remove trailing slash
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const getTwitterUsername = (url) => url.split(".com/")[1];

const formatDiscord = (url) => {
  const formattedURL = url.includes("discord.gg/")
    ? url.split("discord.gg/")[1]
    : url.includes("discord.com/")
    ? url.split("discord.com/")[1]
    : url;
  return formattedURL.length > 12 ? `${formattedURL.substring(0, 12)}…` : formattedURL;
};

const formatDate = (timestamp) => {
  const ts = timestamp;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
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
  formatStr16,
  formatStr20,
  formatStr24,
  formatId,
  formatProtocol,
  formatNumber,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
  formatDate,
  formatDate2,
};
