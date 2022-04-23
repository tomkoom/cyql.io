import { iFire } from "../Icons/Icons";
import { toApps, toSubmit, toUpcoming, toAdmin } from "./routes";

const navLinks = [
  { name: "Projects", link: toApps, icon: "" },
  { name: "Upcoming NFT Sales", link: toUpcoming, icon: iFire },
  { name: "Submit", link: toSubmit, icon: "" },
];

export { navLinks };
