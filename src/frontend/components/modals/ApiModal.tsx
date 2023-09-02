import React, { FC, useEffect } from "react";
import styled from "styled-components";
import Modal from "@/components/modals/_Modal";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setApiModalIsOpen } from "@/state/modals/apiModal";

interface ApiModalProps {
  isOpen: boolean;
}

const ApiModalModal: FC<ApiModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setApiModalIsOpen(false));
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
        <h3>cyql.io API</h3>
        <p>Query data from cyql.</p>
        <a
          href="https://github.com/tomkoom/cyql-api-docs"
          target="_blank"
          rel="noreferrer noopener"
        >
          Use API
        </a>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  > h3 {
    color: var(--primaryColor);
  }

  > p {
    color: var(--primaryColor);
  }

  > a {
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    font-size: var(--fsText);
    font-weight: var(--fwBold);
    color: #fff;
    background-color: var(--highlight1);
    border-radius: 1.25rem;
  }
`;

export default ApiModalModal;
