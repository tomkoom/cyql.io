import React, { FC } from "react";
import styled from "styled-components";

// constants
import { IC_LOGO } from "@/constants/constants";

// components
import { Btn } from "./_index";

// auth
import { useAuth } from "@/context/AuthContext";

const SignInMethods: FC = (): JSX.Element => {
  const { signInWithII, signInWithNfid } = useAuth();
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: IC_LOGO,
      click: signInWithII,
      aboutUrl: "https://identity.ic0.app/",
    },
    {
      id: "nfid",
      label: "NFID",
      logo: "https://ipfs.io/ipfs/QmYPARhAF8ig8kEEP6C81Du5S1spcsGcgRv8GC7SZ9CrrG?filename=nfid-logo.png",
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
