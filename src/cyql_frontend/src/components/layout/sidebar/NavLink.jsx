import React from "react";
import styled from "styled-components";

const NavLink = ({ label, to, icon }) => {
  const navigate = () => {
    to();
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
  font-weight: var(--fwBold);
  border-radius: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--underlay);
  }
`;

const Label = styled.p`
  white-space: nowrap;
`;

const Icon = styled.span`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: var(--highlightColor3);
`;

export default NavLink;
