import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { WithdrawNftModal } from "@/modals/_index"
import { getTokenIdentifier } from "@/utils/ext_token/getTokenIdentifier"
import { iExternalLink } from "@/components/icons/Icons"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectNftIdsOwned } from "@/state/user"
import {
  setWithdrawNftModalIsOpen,
  selectWithdrawNftModalIsOpen,
  setWithdrawNftModalNftIdx,
} from "@/state/modals/withdrawNftModal"

const Nfts: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const nftsOwned = useAppSelector(selectNftIdsOwned)
  const withdrawNftModalIsOpen = useAppSelector(selectWithdrawNftModalIsOpen)

  const openNftWithdrawModal = (nftIdx: number): void => {
    dispatch(setWithdrawNftModalNftIdx(nftIdx))
    dispatch(setWithdrawNftModalIsOpen(true))
  }

  const closeNftWithdrawModal = (): void => {
    dispatch(setWithdrawNftModalNftIdx(undefined))
    dispatch(setWithdrawNftModalIsOpen(false))
  }

  return (
    <NftsStyled>
      <WithdrawNftModal isOpen={withdrawNftModalIsOpen} onClose={closeNftWithdrawModal} />

      <div>
        <h4>cyql nfts</h4>
        {nftsOwned.length > 0 ? (
          <ul>
            {nftsOwned.map((nftIdx) => (
              <li key={`nft #${nftIdx}`}>
                <span>CYQL NFT #{nftIdx.toString()}</span>
                <span>
                  <a
                    href={`https://dtlqp-nqaaa-aaaak-abwna-cai.raw.icp0.io/?&tokenid=${getTokenIdentifier(
                      nftIdx
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {getTokenIdentifier(nftIdx)} {iExternalLink}
                  </a>{" "}
                </span>
                <span>
                  <Btn
                    btnType={"secondary"}
                    text={"Withdraw"}
                    onClick={() => openNftWithdrawModal(nftIdx)}
                  />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>NFT list is empty</p>
        )}
      </div>
    </NftsStyled>
  )
}

const NftsStyled = styled.div`
  width: 100%;

  > div {
    > h4 {
      margin-bottom: 0.5rem;
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
        font-weight: var(--fwMedium);
        text-align: left;

        > span {
          flex: 1;

          > a {
            color: var(--secondaryColor);
            font-weight: var(--fwRegular);
            transition: var(--transition1);

            &:hover {
              color: var(--primaryColor);
            }
          }
        }
      }
    }
  }
`

export default Nfts
