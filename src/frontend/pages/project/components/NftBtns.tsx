import styled from "styled-components"
import Btn from "./Btn"

interface NftBtnsProps {
  nftMarket: string
  nftRarity: string
}

export default function NftBtns({ nftMarket, nftRarity }: NftBtnsProps) {
  return (
    <NftBtnsStyled>
      {nftMarket && <Btn label="Trade" url={nftMarket} />}
      {nftRarity && <Btn label="Rarity" url={nftRarity} />}
    </NftBtnsStyled>
  )
}

const NftBtnsStyled = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`
