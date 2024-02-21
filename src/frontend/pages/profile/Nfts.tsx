import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectNftIdsOwned } from "@/state/user"

const Nfts: FC = (): JSX.Element => {
  const nftsOwned = useAppSelector(selectNftIdsOwned)
  return (
    <NftsStyled>
      <h4>cyql nfts</h4>
      {nftsOwned.length > 0 ? (
        <ul>
          {nftsOwned.map((nftId) => (
            <li key={`nft #${nftId}`}>#{nftId.toString()}</li>
          ))}
        </ul>
      ) : (
        <p>no nfts</p>
      )}
    </NftsStyled>
  )
}

const NftsStyled = styled.div`
  > h4 {
    margin-bottom: 0.5rem;
  }
`

export default Nfts
