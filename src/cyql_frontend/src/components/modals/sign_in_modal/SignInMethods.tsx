import React, { FC } from "react";
import styled from "styled-components";

// components
import { Btn } from "./_index";

// auth
import { useAuth } from "@/context/AuthContext";

const SignInMethods: FC = () => {
  const { signInWithII, signInWithNfid } = useAuth();
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/ic-logo.svg",
      click: signInWithII,
      aboutUrl: "https://identity.ic0.app/about",
    },
    {
      id: "nfid",
      label: "NFID",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/nfid/nfid-logo.png",
      click: signInWithNfid,
      aboutUrl: "https://nfid.one/#FAQ",
    },
  ];

  return (
    <SignInMethodsStyled>
      {signInMethods.map((signInMethod) => (
        <Item key={signInMethod.id}>
          <Btn label={signInMethod.label} logo={signInMethod.logo} onClick={signInMethod.click} />
          <Url href={signInMethod.aboutUrl} rel="noreferrer noopener" target="_blank">
            About {signInMethod.label}
          </Url>
        </Item>
      ))}
    </SignInMethodsStyled>
  );
};

const SignInMethodsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Url = styled.a`
  display: inline-block;
  color: var(--secondaryColor);
  font-size: var(--fsText);

  &:hover {
    color: var(--primaryColor);
  }
`;

export default SignInMethods;
