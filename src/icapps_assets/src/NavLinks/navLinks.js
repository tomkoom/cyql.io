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
  { name: "Upcoming", link: toUpcoming, description: "Track future NFT sales" },
  { name: "NFT Stats", link: toNft, description: "Compare NFT collections" },
  { name: "Submit", link: toSubmit, description: "Add your project to the site" },
]

export { navLinks };