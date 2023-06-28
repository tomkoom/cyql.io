import React from "react";
import styled from "styled-components";
import { device } from "@/styles/breakpoints";

// utils
import { verifyAdmin } from "@/utils/verifyAdmin";

// constants
import { iiAdmin1, iiAdmin2 } from "@/constants/constants";

// icons
import { iCube, iPlus, iCircle } from "@/components/icons/Icons";

// routes
import { toApps, toSubmit, toAdmin } from "@/routes/routes";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { Link, NavLink } from "./_index";

const Sidebar = () => {
  const { userKey } = useAuth();
  const admins = [iiAdmin1, iiAdmin2];

  return (
    <SidebarStyled>
      <div>
        <NavLink label="projects" route={toApps} icon={iCube} />
        <NavLink label="submit" route={toSubmit} icon={iPlus} />
        {verifyAdmin(admins, userKey) === true && (
          <NavLink label="admin" route={toAdmin} icon={iCircle} />
        )}

        {/* links */}
        <Link
          label={"streak"}
          url={"https://th2z2-caaaa-aaaai-qnn2a-cai.ic0.app/"}
          logo={"https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/streak/logo.svg"}
        />
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

  @media ${device.tablet} {
    display: none;
  }
`;

export default Sidebar;
