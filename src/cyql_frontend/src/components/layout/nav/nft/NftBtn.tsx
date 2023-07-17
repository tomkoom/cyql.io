import React, { FC } from "react";

// components
import { Btn } from "@/components/btns/_index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setNftModal } from "@/state/modals/nftModal";

const NftBtn: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return <Btn btnType="primary" text="cyql nfts" onClick={openNftModal} />;
};

export default NftBtn;
