// https://github.com/Toniq-Labs/ext-js/tree/main

import { Principal } from "@dfinity/principal"
import { to32bits } from "./utils"

export const getTokenIdentifier = (principal: string, index: number): string => {
  return tokenIdentifier(principal, index)
}

const tokenIdentifier = (principal: string, index: number): string => {
  // const padding = Buffer("\x0Atid")
  const padding = Buffer.from("\x0Atid")
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(principal).toUint8Array(),
    ...to32bits(index),
  ])
  return Principal.fromUint8Array(array).toText()
}
