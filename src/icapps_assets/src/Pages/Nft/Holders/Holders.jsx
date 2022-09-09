import React from "react";
import css from "./Holders.module.css";

// state
import { useSelector } from "react-redux";
import { selectHoldersOwnedNftsNum } from "../../../State/nft/nft";
import { selectItemsVisible2 } from "../../../State/loadMore";
import LoadMoreBtn2 from "../../../Components/Btns/LoadMoreBtn2/LoadMoreBtn2";

const Holders = () => {
  const holdersOwnedNftsNum = useSelector(selectHoldersOwnedNftsNum);
  const holdersOwnedNftsNumCopy = [...holdersOwnedNftsNum];
  const itemsVisible = useSelector(selectItemsVisible2);

  return holdersOwnedNftsNumCopy.length > 0 ? (
    <div>
      <h3 className={css.title}>Gang</h3>
      <ul className={css.holderList}>
        {holdersOwnedNftsNumCopy
          .sort((a, b) => b.nftsOwned - a.nftsOwned)
          .slice(0, itemsVisible)
          .map((h) => (
            <li key={h.accountId}>
              <div className={css.row}>
                <p>{h.accountId}</p>
                <p>{h.nftsOwned}</p>
              </div>
            </li>
          ))}
      </ul>
      {holdersOwnedNftsNumCopy.length > itemsVisible && (
        <LoadMoreBtn2 label={"addresses"} size={48} />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Holders;
