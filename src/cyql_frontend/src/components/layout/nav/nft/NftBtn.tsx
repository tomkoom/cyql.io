import React from "react";
import styled from "styled-components";

// state
import { useDispatch } from "react-redux";
import { setNftModal } from "@/state/modals/nftModal";

const NftBtn = () => {
  const dispatch = useDispatch();
  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return <NftBtnStyled onClick={openNftModal}>cyql nft</NftBtnStyled>;
};

const NftBtnStyled = styled.button`
  height: 2.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  background-color: var(--highlightColor);
  border-radius: 1.125rem;

  &:hover {
    opacity: 0.8;
  }
`;

export default NftBtn;
