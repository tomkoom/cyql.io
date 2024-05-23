import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLink,
  faBars,
  faTh,
  faTimes,
  faFireAlt,
  faSun,
  faMoon,
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faArrowLeft,
  faDatabase,
  faPlus,
  faPlusSquare,
  faComments,
  faHeart,
  faExternalLinkAlt,
  faSearch,
  faEdit,
  faTrash,
  faCaretUp,
  faCaretRight,
  faCaretDown,
  faCaretLeft,
  faCheck,
  faAngleUp,
  faAngleRight,
  faAngleDown,
  faAngleLeft,
  faSignInAlt,
  faSignOutAlt,
  faRocket,
  faBook,
  faWallet,
  faGlobe,
  faCheckCircle,
  faSort,
  faList,
  faEye,
  faChartArea,
  faChartBar,
  faMeteor,
  faShare,
  faShareSquare,
  faCircleNodes,
  faScroll,
  faCircle,
  faCircleDot,
  faCoins,
  faUser,
  faHashtag,
  faInfinity, // unused
  faBolt,
  faRightLeft,
  faLeaf,
  faCopy,
} from "@fortawesome/free-solid-svg-icons"
import {
  faXTwitter,
  faTwitter,
  faTelegramPlane,
  faDiscord,
  faMedium,
  faGithub,
  faFacebook,
  faLinkedin,
  faReddit,
  faRedditAlien,
} from "@fortawesome/free-brands-svg-icons"

// solid
const iLink = <FontAwesomeIcon icon={faLink} />
const iBars = <FontAwesomeIcon icon={faBars} />
const iTh = <FontAwesomeIcon icon={faTh} />
const iTimes = <FontAwesomeIcon icon={faTimes} />
const iSun = <FontAwesomeIcon icon={faSun} />
const iMoon = <FontAwesomeIcon icon={faMoon} />
const iArrowUp = <FontAwesomeIcon icon={faArrowUp} />
const iArrowRight = <FontAwesomeIcon icon={faArrowRight} />
const iArrowDown = <FontAwesomeIcon icon={faArrowDown} />
const iArrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
const iDatabase = <FontAwesomeIcon icon={faDatabase} />
const iPlus = <FontAwesomeIcon icon={faPlus} />
const iPlusSquare = <FontAwesomeIcon icon={faPlusSquare} />
const iComments = <FontAwesomeIcon icon={faComments} />
const iHeart = <FontAwesomeIcon icon={faHeart} />
const iSearch = <FontAwesomeIcon icon={faSearch} />
const iEdit = <FontAwesomeIcon icon={faEdit} />
const iTrash = <FontAwesomeIcon icon={faTrash} />
const iCaretUp = <FontAwesomeIcon icon={faCaretUp} />
const iCaretRight = <FontAwesomeIcon icon={faCaretRight} />
const iCaretDown = <FontAwesomeIcon icon={faCaretDown} />
const iCaretLeft = <FontAwesomeIcon icon={faCaretLeft} />
const iAngleUp = <FontAwesomeIcon icon={faAngleUp} />
const iAngleRight = <FontAwesomeIcon icon={faAngleRight} />
const iAngleDown = <FontAwesomeIcon icon={faAngleDown} />
const iAngleLeft = <FontAwesomeIcon icon={faAngleLeft} />
const iSignIn = <FontAwesomeIcon icon={faSignInAlt} />
const iSignOut = <FontAwesomeIcon icon={faSignOutAlt} />
const iRocket = <FontAwesomeIcon icon={faRocket} />
const iWallet = <FontAwesomeIcon icon={faWallet} />
const iGlobe = <FontAwesomeIcon icon={faGlobe} />
const iCheckCircle = <FontAwesomeIcon icon={faCheckCircle} />
const iSort = <FontAwesomeIcon icon={faSort} />
const iList = <FontAwesomeIcon icon={faList} />
const iEye = <FontAwesomeIcon icon={faEye} />
const iChartArea = <FontAwesomeIcon icon={faChartArea} />
const iChartBar = <FontAwesomeIcon icon={faChartBar} />
const iShare = <FontAwesomeIcon icon={faShare} />
const iShareSquare = <FontAwesomeIcon icon={faShareSquare} />
const iCircleNodes = <FontAwesomeIcon icon={faCircleNodes} />

// unused
const iBook = <FontAwesomeIcon icon={faBook} />
const iMeteor = <FontAwesomeIcon icon={faMeteor} />
const iScroll = <FontAwesomeIcon icon={faScroll} />

// ...
export const iCircle = <FontAwesomeIcon icon={faCircle} />
export const iCircleDot = <FontAwesomeIcon icon={faCircleDot} />
export const iCoins = <FontAwesomeIcon icon={faCoins} />
export const iUser = <FontAwesomeIcon icon={faUser} />
export const iHashtag = <FontAwesomeIcon icon={faHashtag} />
export const iInfinity = <FontAwesomeIcon icon={faInfinity} />
export const iBolt = <FontAwesomeIcon icon={faBolt} />
export const iRightLeft = <FontAwesomeIcon icon={faRightLeft} />
export const iFire = <FontAwesomeIcon icon={faFireAlt} />
export const iCheck = <FontAwesomeIcon icon={faCheck} />
export const iLeaf = <FontAwesomeIcon icon={faLeaf} />
export const iExternalLink = <FontAwesomeIcon icon={faExternalLinkAlt} />
export const iCopy = <FontAwesomeIcon icon={faCopy} />

// brands
export const iX = <FontAwesomeIcon icon={faXTwitter} />
export const iTwitter = <FontAwesomeIcon icon={faTwitter} />
export const iTelegram = <FontAwesomeIcon icon={faTelegramPlane} />
export const iDiscord = <FontAwesomeIcon icon={faDiscord} />
export const iGithub = <FontAwesomeIcon icon={faGithub} />
export const iMedium = <FontAwesomeIcon icon={faMedium} />
export const iFacebook = <FontAwesomeIcon icon={faFacebook} />
export const iLinkedin = <FontAwesomeIcon icon={faLinkedin} />
export const iReddit = <FontAwesomeIcon icon={faReddit} />
export const iRedditAlien = <FontAwesomeIcon icon={faRedditAlien} />

export {
  // solid
  iLink,
  iBars,
  iTh,
  iTimes,
  iSun,
  iMoon,
  iArrowUp,
  iArrowRight,
  iArrowDown,
  iArrowLeft,
  iDatabase,
  iPlus,
  iPlusSquare,
  iComments,
  iHeart,
  iSearch,
  iEdit,
  iTrash,
  iCaretUp,
  iCaretRight,
  iCaretDown,
  iCaretLeft,
  iAngleUp,
  iAngleRight,
  iAngleDown,
  iAngleLeft,
  iSignIn,
  iSignOut,
  iRocket,
  iWallet,
  iGlobe,
  iCheckCircle,
  iSort,
  iList,
  iEye,
  iChartArea,
  iChartBar,
  iShare,
  iShareSquare,
  iCircleNodes,
}
