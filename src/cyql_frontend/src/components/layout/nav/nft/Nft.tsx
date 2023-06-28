import React, { FC } from "react";

// components
import { NftBtn, NftModal } from "./_index";

// state
import { useSelector } from "react-redux";
import { selectNftModal } from "@/state/modals/nftModal";

const Nft: FC = (): JSX.Element => {
  const nftModal = useSelector(selectNftModal);

  return (
    <div>
      <NftBtn />
      {nftModal && <NftModal />}
    </div>
  );
};

export default Nft;
