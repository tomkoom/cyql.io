import { Principal } from "@dfinity/principal";
import { sha224 } from "@dfinity/principal/lib/cjs/utils/sha224.js";
import { getCrc32 } from "@dfinity/principal/lib/cjs/utils/getCrc.js";

export function getShortPrincipal(p) {
  return p.substring(0, 5) + '...' + p.substring(60);
}


const getAccountIdentifier = (principal, subaccount) => {
  const padding = Buffer("\x0Aaccount-id");

  const array = new Uint8Array([
    ...padding,
    ...principal.toUint8Array(),
    ...getSubAccountArray(subaccount)
  ]);

  const hash = sha224(array);
  const checksum = to32bits(getCrc32(hash));
  const array2 = new Uint8Array([
    ...checksum,
    ...hash
  ]);
  return toHexString(array2);
};
const getSubAccountArray = (s) => {
  if (Array.isArray(s)) {
    return s.concat(Array(32 - s.length).fill(0));
  } else {
    //32 bit number only
    return Array(28).fill(0).concat(to32bits(s ? s : 0))
  }
};

const to32bits = num => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
}

const toHexString = (byteArray) => {
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
const fromHexString = (hex) => {
  if (hex.substr(0, 2) === "0x") hex = hex.substr(2);
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

const isHex = (h) => {
  var regexp = /^[0-9a-fA-F]+$/;
  return regexp.test(h);
};
const validateAddress = (a) => {
  return (isHex(a) && a.length === 64)
}
const validatePrincipal = (p) => {
  try {
    return (p === Principal.fromText(p).toText());
  } catch (e) {
    return false;
  }
}
export {
  getAccountIdentifier,
  getSubAccountArray,
  toHexString,
  fromHexString,
  isHex,
  validateAddress,
  validatePrincipal
};