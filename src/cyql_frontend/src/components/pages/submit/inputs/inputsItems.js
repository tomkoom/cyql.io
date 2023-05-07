// icons

import { iDatabase, iDiscord, iGithub, iMedium, iTelegram, iTwitter } from "@icons/Icons";

// inputs, source: @state/submit

const main = [
  {
    id: "name",
    label: "your project name*",
    hint: "",
    icon: "",
    placeholder: "project name",
    type: "text",
    required: "required",
  },
  {
    id: "description",
    label: "please enter a short description of your project",
    hint: "",
    icon: "",
    placeholder: "tagline",
    type: "text",
    required: null,
  },
];

const links = [
  {
    id: "website",
    label: "website",
    hint: "",
    icon: "",
    placeholder: "website url",
    type: "text",
    required: null,
  },
  {
    id: "app",
    label: "app",
    hint: "",
    icon: "",
    placeholder: "app url",
    type: "text",
    required: null,
  },
  {
    id: "docs",
    label: "docs",
    hint: "",
    icon: "",
    placeholder: "docs url",
    type: "text",
    required: null,
  },
];

const linksSoc = [
  {
    id: "twitter",
    label: "twitter",
    hint: "",
    icon: iTwitter,
    placeholder: "https://twitter.com/yourproject",
    type: "text",
    required: null,
  },
  {
    id: "discord",
    label: "discord",
    hint: "make sure the invite link will not expire!",
    icon: iDiscord,
    placeholder: "discord",
    type: "text",
    required: null,
  },
  {
    id: "telegram",
    label: "telegram",
    hint: "",
    icon: iTelegram,
    placeholder: "https://t.me/yourproject",
    type: "text",
    required: null,
  },
  {
    id: "github",
    label: "github",
    hint: "",
    icon: iGithub,
    placeholder: "https://github.com/yourproject",
    type: "text",
    required: null,
  },
  {
    id: "medium",
    label: "medium",
    hint: "",
    icon: iMedium,
    placeholder: "https://medium.com/yourproject",
    type: "text",
    required: null,
  },
];

const linksIC = [
  {
    id: "canister",
    label: "frontend canister url",
    hint: "",
    icon: iDatabase,
    placeholder: "",
    type: "text",
    required: null,
  },
  {
    id: "dscvr",
    label: "Dscvr",
    hint: "",
    icon: "",
    placeholder: "https://dscvr.one/p/yourproject",
    type: "text",
    required: null,
  },
  {
    id: "distrikt",
    label: "Distrikt",
    hint: "",
    icon: "",
    placeholder: "Distrikt",
    type: "text",
    required: null,
  },
  {
    id: "openchat",
    label: "OpenChat",
    hint: "",
    icon: "",
    placeholder: "OpenChat",
    type: "text",
    required: null,
  },
];

const img = [
  {
    id: "logo",
    label: "logo image url",
    hint: "400px x 400px for best perfomance",
    icon: "",
    placeholder: "logo image url",
    type: "text",
    required: null,
  },
];

const notes = [
  {
    id: "notes",
    label: "any additional notes",
    hint: "",
    icon: "",
    placeholder: "notes",
    type: "text",
    required: null,
  },
];

// nft

const nft = [
  {
    id: "nft_units",
    label: "total nft items",
    hint: "e.g. 10000",
    icon: "",
    placeholder: "total nft items in collection",
    type: "text",
    required: null,
  },
  {
    id: "nft_unit_price",
    label: "price per nft in icp",
    hint: "e.g. 2.5 icp",
    icon: "",
    placeholder: "price per nft in icp",
    type: "text",
    required: null,
  },
];

export { main, links, linksSoc, linksIC, img, notes, nft };
