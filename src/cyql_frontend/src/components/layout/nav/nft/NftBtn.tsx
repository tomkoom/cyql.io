import React from "react";
import styled from "styled-components";
import mark10 from "../../../../../assets/logo/cyql-mark-coolgray10.svg";

// state
import { useDispatch } from "react-redux";
import { setNftModal } from "@/state/modals/nftModal";

const NftBtn = () => {
  const dispatch = useDispatch();
  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return (
    <NftBtnStyled onClick={openNftModal}>
      <img src={mark10} alt="cyql mark" />
      nft
    </NftBtnStyled>
  );
};

const NftBtnStyled = styled.button`
  height: 2.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  color: var(--coolGray10);
  background-color: var(--highlightColor);
  border-radius: 1.125rem;

  &:hover {
    opacity: 0.8;
  }

  > img {
    width: 0.9rem;
  }
`;

export default NftBtn;
