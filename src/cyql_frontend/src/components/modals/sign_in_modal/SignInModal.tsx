import React, { FC, useEffect } from "react";
import styled from "styled-components";
import Modal from "../_Modal";

// components
import { SignInMethods } from "./_index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";

interface SingInModalProps {
  isOpen: boolean;
}

const SignInModal: FC<SingInModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    dispatch(setSignInModal(false));
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
