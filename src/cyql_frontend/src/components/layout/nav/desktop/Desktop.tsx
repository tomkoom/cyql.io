import React, { FC } from "react";
import styled from "styled-components";

// routes
import { toHome } from "@/routes/routes";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { ProfileBtn, SignInBtn, Socials } from "./_index";
import { Nft } from "../_index";
import { Logo, Price, Theme } from "@/components/ui-elements/_index";

const Desktop: FC = (): JSX.Element => {
  const { userKey } = useAuth();

  return (
    <DesktopStyled>
      <Main>
        <div onClick={toHome}>
          <Logo />
        </div>
        <Socials />
      </Main>

      <Controls>
        <Price />
        <Theme />
        <Nft />
        {userKey === "" ? <SignInBtn /> : <ProfileBtn />}
      </Controls>
    </DesktopStyled>
  );
};

const DesktopStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export default Desktop;
