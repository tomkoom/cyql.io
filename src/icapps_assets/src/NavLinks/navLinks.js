import {
  toHome,
  toApps,
  toUpcoming,
  toNft,
  toSubmit,
} from "../Routes/routes";

const navLinks = [
  { name: "Home", link: toHome, description: "To homepage" },
  { name: "Apps", link: toApps, description: "Discover new projects" },
  { name: "Upcoming NFT Sales", link: toUpcoming, description: "Track upcoming NFT sales" },
  { name: "NFT Stats", link: toNft, description: "Compare NFT collections" },
  { name: "Submit Your Project", link: toSubmit, description: "Add your project to the site" },
]

export { navLinks };