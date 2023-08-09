import React, { FC } from "react";
import styled from "styled-components";

// components
import Btn from "./btn/Btn";

interface NftBtnsProps {
  nftMarket: string;
  nftRarity: string;
}

const NftBtns: FC<NftBtnsProps> = ({ nftMarket, nftRarity }): JSX.Element => {
  return (
    <NftBtnsStyled>
      {nftMarket && <Btn label="Trade" url={nftMarket} />}
      {nftRarity && <Btn label="Rarity" url={nftRarity} />}
    </NftBtnsStyled>
  );
};

const NftBtnsStyled = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export default NftBtns;
