import React, { FC } from "react";
import styled from "styled-components";

// icons
import { iExternalLink } from "@/components/icons/Icons";

const Promo: FC = (): JSX.Element => {
  return (
    <PromoStyled>
      <li id="juno">
        <a href="https://juno.build/" target="_blank" rel="noreferrer noopener">
          Build with Juno {iExternalLink}
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/messages/compose?recipient_id=1386304698358116354&text=Hi!%20I%20would%20like%20to%20promote%20my%20project%20on%20cyql.io."
          target="_blank"
          rel="noreferrer noopener"
        >
          Promote {iExternalLink}
        </a>
      </li>
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
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    padding: 0 0.75rem;
    white-space: nowrap;
    border-radius: 1rem;
    background-color: var(--underlay);

    > a {
      color: var(--primaryColor);
    }
  }

  > li#juno {
    background-color: #7888ff;
    > a {
      color: var(--background);
    }
  }
`;

export default Promo;
