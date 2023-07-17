import React, { FC } from "react";
import styled from "styled-components";
import type { PromoModalData } from "@/state/_types/promoModalData";

// icons
import { iAngleDown } from "@/components/icons/Icons";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setPromoModal, setPromoModalData } from "@/state/modals/promoModal";

const Promo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const openModal = (promoModalData: PromoModalData): void => {
    dispatch(setPromoModalData(promoModalData));
    dispatch(setPromoModal(true));
  };

  const promoItems = [
    {
      color: "var(--backgroundColor)",
      backgroundColor: "#7888ff",
      title: "Build with Juno",
      text: "Juno is an open-source, blockchainless platform that offers developers all the necessary features to build any Web3 application. Start building your decentralized app with the same ease as Web2.",
      ctaUrl: "https://juno.build/",
      ctaText: "Try Juno",
    },
    {
      color: "var(--primaryColor)",
      backgroundColor: "var(--underlay1)",
      title: "Promote",
      text: "Promote your project by highlighting on cyql.io",
      ctaUrl:
        "https://twitter.com/messages/compose?recipient_id=1386304698358116354&text=Hi!%20I%20would%20like%20to%20promote%20my%20project%20on%20cyql.io.",
      ctaText: "Contact for promotion",
    },
  ];

  return (
    <PromoStyled>
      {promoItems.map((promoItem, i) => (
        <li
          style={{ color: promoItem.color, backgroundColor: promoItem.backgroundColor }}
          onClick={() => openModal(promoItem)}
          key={i}
        >
          {promoItem.title} {iAngleDown}
        </li>
      ))}
    </PromoStyled>
  );
};

const PromoStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  > li {
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    white-space: nowrap;
    padding: 0 0.75rem;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

export default Promo;
