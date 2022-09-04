// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_idl from "../../idl/nft_idl";

// state
import store from "../../State/_store";
import { setRegistry, setSupply, setListingsNum, setFloor } from "../../State/nft/nft";

// host, nft can id
const host = "https://mainnet.dfinity.network";
const nftCanisterId = "dtlqp-nqaaa-aaaak-abwna-cai";

const setNftData = async () => {
  const nft = Actor.createActor(nft_idl, {
    agent: new HttpAgent({ host }),
    canisterId: nftCanisterId,
  });

  await nft
    .getRegistry()
    .then((res) => {
      store.dispatch(setRegistry(res));
    })
    .catch((err) => console.log(err));

  await nft
    .supply("")
    .then((res) => {
      store.dispatch(setSupply(Number(res.ok)));
    })
    .catch((err) => console.log(err));

  await nft
    .listings()
    .then((res) => {
      store.dispatch(setListingsNum(res.length));
      
      // floor
      const prices = [];
      res.forEach((el) => {
        prices.push(Number(el[1].price));
      });
      const floor = Math.min(...prices);
      store.dispatch(setFloor(floor));
    })
    .catch((err) => console.log(err));
};

export { setNftData };
