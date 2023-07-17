import React, { FC } from "react";
import styled from "styled-components";
import type { PromoModalData } from "@/state/_types/promoModalData";

// icons
import { CrossIcon } from "@/components/icons";
import { iExternalLink } from "@/components/icons/Icons";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  setPromoModal,
  setClearPromoModalData,
  selectPromoModalData,
} from "@/state/modals/promoModal";

const PromoModal: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const promoModalData: PromoModalData = useAppSelector(selectPromoModalData);
  const text = "";

  const closeModal = () => {
    dispatch(setPromoModal(false));
    dispatch(setClearPromoModalData());
  };

  return (
    <PromoModalStyled>
      <Content>
        <CrossIcon onClick={closeModal} />
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
    </PromoModalStyled>
  );
};

const PromoModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--backgroundColor);
`;

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  color: var(--primaryColor);
  padding: 1rem;
  margin: 1rem;

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
