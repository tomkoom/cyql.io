import React, { FC, useEffect } from "react";
import styled from "styled-components";
import Modal from "./_Modal";
import type { PromoModalData } from "@/state/_types/promoModalData";

// icons
import { CrossIcon } from "@/components/icons";
import { iExternalLink } from "@/components/icons/Icons";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  setPromoModal,
  selectPromoModal,
  setClearPromoModalData,
  selectPromoModalData,
} from "@/state/modals/promoModal";

interface PromoModalProps {
  isOpen: boolean;
}

const PromoModal: FC<PromoModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch();
  const promoModalData: PromoModalData = useAppSelector(selectPromoModalData);

  const closeModal = () => {
    dispatch(setPromoModal(false));
    dispatch(setClearPromoModalData());
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
        <h3>{promoModalData.title}</h3>
        <p>{promoModalData.text}</p>

        <Cta
          href={promoModalData.ctaUrl}
          color={promoModalData.color}
          backgroundColor={promoModalData.backgroundColor}
          target="_blank"
          rel="noreferrer noopener"
        >
          {promoModalData.ctaText} {iExternalLink}
        </Cta>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  > p {
    line-height: 150%;
  }
`;

const Cta = styled.a<{ color: string; backgroundColor: string }>`
  color: ${(p) => p.color};
  background-color: ${(p) => p.backgroundColor};
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: var(--fwBold);
  padding: 0 1rem;
  border-radius: 1.5rem;
`;

export default PromoModal;
