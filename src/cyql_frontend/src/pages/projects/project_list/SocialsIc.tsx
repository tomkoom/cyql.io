import React, { FC } from "react";
import styled from "styled-components";

interface IcSocialNetwork {
  name: string;
}

interface IcSocialNetworksMap {
  [key: string]: IcSocialNetwork;
}

const SocialsIc: FC<IcSocialNetworksMap> = ({
  dscvr,
  distrikt,
  openchat,
  taggr,
  seers,
  nuance,
  catalyze,
  funded,
}): JSX.Element => {
  return (
    <SocialsIcStyled>
      {dscvr && <li>Dscvr</li>}
      {distrikt && <li>Distrikt</li>}
      {openchat && <li>OpenChat</li>}
      {taggr && <li>#TAGGR</li>}
      {seers && <li>Seers</li>}
      {nuance && <li>Nuance</li>}
      {catalyze && <li>Catalyze</li>}
      {funded && <li>Funded</li>}
    </SocialsIcStyled>
  );
};

const SocialsIcStyled = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: var(--fsText);

  > li {
    height: 1.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.33rem;
    background-color: var(--underlay1);
    border-radius: 0.5rem;
  }
`;

export default SocialsIc;
