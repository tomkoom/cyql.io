import React, { FC } from "react";
import styled from "styled-components";

interface NavlinkProps {
  label: string;
  route: () => void;
  icon: any;
}

const Navlink: FC<NavlinkProps> = ({ label, route, icon }): JSX.Element => {
  const navigate = () => {
    route();
  };

  return (
    <NavlinkStyled onClick={navigate}>
      {icon && <Icon>{icon}</Icon>}
      <Label>{label}</Label>
    </NavlinkStyled>
  );
};

const NavlinkStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 3rem;
  padding: 0 0.5rem;
  margin: 0 -1rem;
  font-size: var(--fs5);
  font-weight: var(--fwMedium);
  border-radius: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--underlay);
  }
`;

const Label = styled.span`
  white-space: nowrap;
`;

const Icon = styled.span`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: var(--highlightColor3);
`;

export default Navlink;
