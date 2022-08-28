// icons

import {
  iDatabase,
  iDiscord,
  iGithub,
  iMediumM,
  iTelegram,
  iTwitter,
} from "../../../../Icons/Icons";

// inputs

const main = [
  {
    id: "name",
    label: "Your project name*",
    hint: "",
    icon: "",
    placeholder: "Project name",
    type: "text",
    required: "required",
  },
  {
    id: "description",
    label: "Please enter a short description of your project",
    hint: "",
    icon: "",
    placeholder: "Tagline",
    type: "text",
    required: null,
  },
];

const links = [
  {
    id: "website",
    label: "Website",
    hint: "",
    icon: "",
    placeholder: "Website URL",
    type: "url",
    required: null,
  },
  {
    id: "appURL",
    label: "App",
    hint: "",
    icon: "",
    placeholder: "App URL",
    type: "url",
    required: null,
  },
  {
    id: "docsURL",
    label: "Docs",
    hint: "",
    icon: "",
    placeholder: "Docs URL",
    type: "url",
    required: null,
  },
];

const linksSoc = [
  {
    id: "twitter",
    label: "Twitter",
    hint: "",
    icon: iTwitter,
    placeholder: "https://twitter.com/yourproject",
    type: "url",
    required: null,
  },
  {
    id: "discord",
    label: "Discord",
    hint: "Make sure the invite link will not expire!",
    icon: iDiscord,
    placeholder: "Discord",
    type: "url",
    required: null,
  },
  {
    id: "telegram",
    label: "Telegram",
    hint: "",
    icon: iTelegram,
    placeholder: "https://t.me/yourproject",
    type: "url",
    required: null,
  },
  {
    id: "github",
    label: "GitHub",
    hint: "",
    icon: iGithub,
    placeholder: "https://github.com/yourproject",
    type: "url",
    required: null,
  },
  {
    id: "medium",
    label: "Medium",
    hint: "",
    icon: iMediumM,
    placeholder: "https://medium.com/yourproject",
    type: "url",
    required: null,
  },
];

const linksIC = [
  {
    id: "canister",
    label: "Frontend canister URL",
    hint: "",
    icon: iDatabase,
    placeholder: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/",
    type: "url",
    required: null,
  },
  {
    id: "dscvr",
    label: "Dscvr",
    hint: "",
    icon: "",
    placeholder: "https://dscvr.one/p/yourproject",
    type: "url",
    required: null,
  },
  {
    id: "distrikt",
    label: "Distrikt",
    hint: "",
    icon: "",
    placeholder: "Distrikt",
    type: "url",
    required: null,
  },
  {
    id: "openChat",
    label: "OpenChat",
    hint: "",
    icon: "",
    placeholder: "OpenChat",
    type: "url",
    required: null,
  },
];

const img = [
  {
    id: "logo",
    label: "Logo image URL",
    hint: "Optimal resolution: 400 x 400px, 1:1",
    icon: "",
    placeholder: "Logo image URL",
    type: "url",
    required: null,
  },
  {
    id: "cover",
    label: "Cover image URL",
    hint: "Optimal resolution: 1500 x 500px, 3:1",
    icon: "",
    placeholder: "Cover image URL",
    type: "url",
    required: null,
  },
];

const notes = [
  {
    id: "notes",
    label: "Any additional notes",
    hint: "",
    icon: "",
    placeholder: "Notes 📝",
    type: "text",
    required: null,
  },
];

// nft

const nft = [
  {
    id: "nftUnits",
    label: "Total NFT items",
    hint: "E.g. 10000",
    icon: "",
    placeholder: "Total NFT items",
    type: "text",
    required: null,
  },
  {
    id: "nftUnitPrice",
    label: "Price per NFT in ICP",
    hint: "E.g. 2.5 ICP",
    icon: "",
    placeholder: "Price per NFT in ICP",
    type: "text",
    required: null,
  },
  {
    id: "nftSaleDate",
    label: "NFT sale date",
    hint: "",
    icon: "",
    placeholder: "NFT sale date",
    type: "date",
    required: null,
  },
];

export { main, links, linksSoc, linksIC, img, notes, nft };
