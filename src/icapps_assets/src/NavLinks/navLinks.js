import {
  toHome,
  toApps,
  toUpcoming,
  toNft,
  toSubmit,
} from "../Routes/routes";

const navLinks = [
  { name: "Home", link: toHome },
  { name: "Apps", link: toApps },
  { name: "Upcoming", link: toUpcoming },
  { name: "NFT Stats", link: toNft },
  { name: "Submit", link: toSubmit },
]

export { navLinks };