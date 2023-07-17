import React, { FC } from "react";

// components
import { NftBtn, NftModal } from "./_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectNftModal } from "@/state/modals/nftModal";

const Nft: FC = (): JSX.Element => {
  const nftModal = useAppSelector(selectNftModal);

  return (
    <div>
      <NftBtn />
      {nftModal === true && <NftModal />}
    </div>
  );
};

export default Nft;
