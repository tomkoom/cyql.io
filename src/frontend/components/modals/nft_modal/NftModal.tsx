import React, { FC, useEffect } from "react";
import styled from "styled-components";
import Modal from "@/components/modals/_Modal";

// components
import { Links } from "./_index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setNftModal } from "@/state/modals/nftModal";

interface NftModalProps {
  isOpen: boolean;
}

const NftModal: FC<NftModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch();
  const text =
    "cyql nft is the main asset of the project which represents its development progress and will carry a number of utilities which can be used on the platform.";

  const closeModal = () => {
    dispatch(setNftModal(false));
  };

  // hide scrollbar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <h3>cyql nft</h3>
        <p>{text}</p>
        <Links />
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    color: var(--primaryColor);
  }

  > p {
    color: var(--primaryColor);
  }
`;

export default NftModal;
