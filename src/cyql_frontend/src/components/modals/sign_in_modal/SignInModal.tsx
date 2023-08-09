import React, { FC } from "react";
import styled from "styled-components";
import Modal from "../_Modal";

// components
import { SignInMethods } from "./_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal, selectSignInModal } from "@/state/modals/modals";

const SignInModal: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSignInModal);

  const closeModal = (): void => {
    dispatch(setSignInModal(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h3>choose your sign-in method</h3>
        <SignInMethods />
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default SignInModal;
