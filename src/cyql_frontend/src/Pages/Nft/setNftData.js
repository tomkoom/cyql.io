// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_idl from "../../idl/nft_idl";

// state
import store from "../../State/_store";
import {
  setHoldersNum,
  setHoldersOwnedNftsNum,
  setSupply,
  setListingsNum,
  setFloor,
} from "../../State/nft/nft";

// canisters
import { cyqlNftCanId } from "../../Context/canisterIds";

// host
import { host } from "../../Context/host";

// const setNftData = async () => {
//   const nft = Actor.createActor(nft_idl, {
//     agent: new HttpAgent({ host }),
//     canisterId: cyqlNftCanId,
//   });

//   // holders
//   await nft
//     .getRegistry()
//     .then((registry) => {
//       const holders = [];
//       registry.forEach((el) => holders.push(el[1]));
//       const uniqHolders = [...new Set(holders)];
//       const uniqHoldersNum = uniqHolders.length;

//       const holdersOwnedNftsNum = {};
//       holders.forEach((h) => {
//         holdersOwnedNftsNum[h] = (holdersOwnedNftsNum[h] || 0) + 1;
//       });

//       const holdersOwnedNftsNumArr = [];
//       for (const [key, value] of Object.entries(holdersOwnedNftsNum)) {
//         holdersOwnedNftsNumArr.push({ accountId: key, nftsOwned: value });
//       }
//       store.dispatch(setHoldersNum(uniqHoldersNum));
//       store.dispatch(setHoldersOwnedNftsNum(holdersOwnedNftsNumArr));
//     })
//     .catch((err) => console.log(err));

//   await nft
//     .supply("")
//     .then((res) => {
//       store.dispatch(setSupply(Number(res.ok)));
//     })
//     .catch((err) => console.log(err));

//   await nft
//     .listings()
//     .then((res) => {
//       store.dispatch(setListingsNum(res.length));

//       // floor
//       const prices = [];
//       res.forEach((el) => {
//         prices.push(Number(el[1].price));
//       });
//       const floor = Math.min(...prices);
//       store.dispatch(setFloor(floor));
//     })
//     .catch((err) => console.log(err));
// };

// export { setNftData };
