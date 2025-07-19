// https://github.com/Toniq-Labs/ext-js/blob/main/src/utils.js

export const to32bits = (num) => {
  let b = new ArrayBuffer(4)
  new DataView(b).setUint32(0, num)
  return Array.from(new Uint8Array(b))
}
