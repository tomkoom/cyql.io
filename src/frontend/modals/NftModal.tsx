import React, { FC } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"
import { LinkBtn } from "@/components/btns/_index"
import { iExternalLink } from "@/components/icons/Icons"
import { CYQL_NFT_FUNDED_URL, CYQL_NFT_STATS_URL } from "@/constants/constants"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setNftModal } from "@/state/modals/nftModal"

interface NftModalProps {
  isOpen: boolean
}

const NftModal: FC<NftModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch()
  const text =
    "cyql NFT is the main asset of the project which represents its development progress and will carry a number of utilities which can be used on the platform"

  const closeModal = (): void => {
    dispatch(setNftModal(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <h3>cyql NFT</h3>
        <p>{text}</p>
        <div className="links">
          <LinkBtn
            btnType={"secondary"}
            url={CYQL_NFT_STATS_URL}
            text={"Collection Stats"}
            icon={iExternalLink}
          />

          <LinkBtn
            btnType={"primary"}
            url={CYQL_NFT_FUNDED_URL}
            text={"Buy"}
            icon={iExternalLink}
          />
        </div>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > h3 {
    color: var(--primaryColor);
  }

  > p {
    text-align: center;
    font-size: var(--fsText);
    color: var(--secondaryColor);
  }

  > div.links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`

export default NftModal
