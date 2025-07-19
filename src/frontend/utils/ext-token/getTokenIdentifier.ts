// https://github.com/Toniq-Labs/ext-js/tree/main

import { Principal } from "@dfinity/principal"
import { to32bits } from "./utils"
import { NFT_CANISTER_ID_IC } from "@/constants/constants"

export const getTokenIdentifier = (nftIdx: number): string => {
  return tokenIdentifier(nftIdx)
}

const tokenIdentifier = (index: number): string => {
  // const padding = Buffer("\x0Atid")
  const padding = Buffer.from("\x0Atid")
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(NFT_CANISTER_ID_IC).toUint8Array(),
    ...to32bits(index),
  ])
  return Principal.fromUint8Array(array).toText()
}
