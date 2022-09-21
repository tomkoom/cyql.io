import React from "react";
import css from "./Holders.module.css";

// components
import { LoadMoreBtn2 } from "../../../Components/index";

// state
import { useSelector } from "react-redux";
import { selectHoldersOwnedNftsNum } from "../../../State/nft/nft";
import { selectItemsVisibleNftHolders, setItemsVisibleNftHolders } from "../../../State/loadMore";

const Holders = () => {
  const holdersOwnedNftsNum = useSelector(selectHoldersOwnedNftsNum);
  const holdersOwnedNftsNumCopy = [...holdersOwnedNftsNum];
  const itemsVisibleNftHolders = useSelector(selectItemsVisibleNftHolders);

  return holdersOwnedNftsNumCopy.length > 0 ? (
    <div>
      <h3 className={css.title}>Gang</h3>
      <ul className={css.holderList}>
        {holdersOwnedNftsNumCopy
          .sort((a, b) => b.nftsOwned - a.nftsOwned)
          .slice(0, itemsVisibleNftHolders)
          .map((h) => (
            <li key={h.accountId}>
              <div className={css.row}>
                <p className={css.address}>{h.accountId}</p>
                <p>{h.nftsOwned}</p>
              </div>
            </li>
          ))}
      </ul>
      {holdersOwnedNftsNumCopy.length > itemsVisibleNftHolders && (
        <LoadMoreBtn2 label={"addresses"} size={48} setItemsVisible={setItemsVisibleNftHolders} />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Holders;
