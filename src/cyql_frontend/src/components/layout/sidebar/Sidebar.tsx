import React, { FC } from "react";
import styled from "styled-components";
import { device } from "@/styles/breakpoints";

// utils
import { verifyAdmin } from "@/utils/verifyAdmin";

// constants
import { iiAdmin1, iiAdmin2 } from "@/constants/constants";

// icons
import { iInfinity, iCube, iPlus, iCircle } from "@/components/icons/Icons";

// hooks
import useNav from "@/hooks/useNav";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { Navlink } from "./_index";

const Sidebar: FC = (): JSX.Element => {
  const { userKey } = useAuth();
  const { toHome, toProjects, toSubmit, toAdmin } = useNav();
  const admins = [iiAdmin1, iiAdmin2];

  return (
    <SidebarStyled>
      <div>
        <Navlink label="explore" route={toHome} icon={iInfinity} />
        <Navlink label="projects" route={toProjects} icon={iCube} />
        <Navlink label="submit" route={toSubmit} icon={iPlus} />
        {verifyAdmin(admins, userKey) === true && (
          <Navlink label="admin" route={toAdmin} icon={iCircle} />
        )}
      </div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  position: sticky;
  top: 64px;
  bottom: 0;
  height: 0;
  max-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${device.laptop} {
    display: none;
  }
`;

export default Sidebar;
