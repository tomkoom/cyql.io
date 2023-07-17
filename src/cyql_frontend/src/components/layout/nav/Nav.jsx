import React from "react";
import styled from "styled-components";
import { device, size } from "@/styles/breakpoints";

// utils
import { useWindowSize } from "@/hooks/useWindowSize";

// components
import { Desktop, Mobile } from "./_index";

const Nav = () => {
  const { width } = useWindowSize();

  return (
    <NavStyled>
      <Main>{width > size.laptop ? <Desktop /> : <Mobile />}</Main>
    </NavStyled>
  );
};

const NavStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: var(--backgroundColor);
  height: 64px;
  padding: 0.5rem 2rem;

  @media ${device.laptop} {
    padding: 0.5rem 1rem;
  }
`;

export default Nav;
