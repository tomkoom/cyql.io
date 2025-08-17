import type { Project } from "@/state/types/Project"
import styled from "styled-components"

interface NftPreviewsProps {
  project: Project
}

export default function NftPreviews({ project }: NftPreviewsProps) {
  const { name, nftImg1, nftImg2, nftImg3, nftImg4 } = project

  if (nftImg1 || nftImg2 || nftImg3 || nftImg4) {
    return (
      <NftPreviewsStyled>
        {nftImg1 && <img src={nftImg1} alt={`${name} NFT preview 1`} />}
        {nftImg2 && <img src={nftImg2} alt={`${name} NFT preview 2`} />}
        {nftImg3 && <img src={nftImg3} alt={`${name} NFT preview 3`} />}
        {nftImg4 && <img src={nftImg4} alt={`${name} NFT preview 4`} />}
      </NftPreviewsStyled>
    )
  }

  return null
}

const NftPreviewsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 0.5rem;
  margin: 0.5rem 0;

  > img {
    width: 100%;
    vertical-align: middle;
  }
`
