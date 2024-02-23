import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { useNft } from "@/hooks/useNft"
import { getTokenIdentifier } from "@/utils/ext_token/getTokenIdentifier"
import { NFT_CANISTER_ID_IC } from "@/constants/constants"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectNftIdsOwned } from "@/state/user"

const Nfts: FC = (): JSX.Element => {
  const { sendNft } = useNft()
  const nftsOwned = useAppSelector(selectNftIdsOwned)

  const withdrawTest = async (nftIdx: number): Promise<void> => {
    console.log(getTokenIdentifier(NFT_CANISTER_ID_IC, nftIdx))
  }

  const openNftWithdrawModal = () => {}

  const closeNftWithdrawModal = () => {}

  return (
    <NftsStyled>
      <h4>cyql nfts</h4>
      {nftsOwned.length > 0 ? (
        <ul>
          {nftsOwned.map((nftIdx) => (
            <li key={`nft #${nftIdx}`}>
              <span>cyql nft #{nftIdx.toString()}</span>{" "}
              <Btn btnType={"secondary"} text={"withdraw"} onClick={() => withdrawTest(nftIdx)} />
            </li>
          ))}
        </ul>
      ) : (
        <p>no nfts</p>
      )}
    </NftsStyled>
  )
}

const NftsStyled = styled.div`
  width: 100%;
  > h4 {
    margin-bottom: 1rem;
  }

  > ul {
    > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      background-color: var(--underlay1);
      padding: 0.5rem 0.75rem;
      font-weight: var(--fwBold);
    }
  }
`

export default Nfts
