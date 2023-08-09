import React, { FC } from "react";
import styled from "styled-components";
import Modal from "../_Modal";

// components
import { Btns, Link } from "./_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setShareModal, selectShareModal } from "@/state/modals/shareModal";

interface ShareModalProps {
  slug: string;
  name: string;
  categories: string[];
  description: string;
}

const ShareModal: FC<ShareModalProps> = ({ slug, name, categories, description }): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectShareModal);

  const closeModal = () => {
    dispatch(setShareModal(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <h3>Share {name} via</h3>
        <Btns slug={slug} name={name} categories={categories} description={description} />
        <Link />
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default ShareModal;
