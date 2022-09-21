// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_idl from "../../idl/nft_idl";

// utils
import { getAccountIdentifier } from "../../Context/Utils/Principal.utils";

// state
import store from "../../State/_store";
import { setOwnsNFT } from "../../State/profile";

// host, nft can id
import { host } from "../../Context/host";
const nftCanisterId = "dtlqp-nqaaa-aaaak-abwna-cai";

const setProfileNftData = async (principalId) => {
  const nft = Actor.createActor(nft_idl, {
    agent: new HttpAgent({ host }),
    canisterId: nftCanisterId,
  });

  await nft
    .principalOwnsOne(principalId)
    .then((res) => {
      store.dispatch(setOwnsNFT(res));
    })
    .catch((err) => console.log(err));

  // const accountId = getAccountIdentifier(principalId);
  // await nft
  //   .getRegistry()
  //   .then((res) => {
  //     let nftIdsOwned = [];
  //     res.forEach((item) => {
  //       if (item[1] === accountId) {
  //         nftIdsOwned.push(item[0]);
  //       }
  //     });
  //     dispatch(setNFTIdsOwned(nftIdsOwned));
  //   })
  //   .catch((err) => console.log(err));
};

export { setProfileNftData };
