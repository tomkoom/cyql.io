import React, { FC } from "react"
import styled from "styled-components"
import { NETWORK } from "@/constants/constants"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectNftIdsOwned } from "@/state/user"

const Nfts: FC = (): JSX.Element => {
  const nftsOwned = useAppSelector(selectNftIdsOwned)
  const mockData = [123]
  const data = NETWORK === "local" ? mockData : nftsOwned
  console.log(NETWORK)

  return (
    <NftsStyled>
      <h4>cyql nfts</h4>
      {data.length > 0 ? (
        <ul>
          {data.map((nftId) => (
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
