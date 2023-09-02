import React, { FC } from "react";

// components
import { NftBtn } from "./_index";
import { NftModal } from "@/modals/_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectNftModal } from "@/state/modals/nftModal";

const Nft: FC = (): JSX.Element => {
  const isOpen = useAppSelector(selectNftModal);

  return (
    <div>
      <NftModal isOpen={isOpen} />
      <NftBtn />
    </div>
  );
};

export default Nft;
