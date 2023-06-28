import React from "react";
import styled from "styled-components";

const Link = ({ label, url, logo }) => {
  return (
    <LinkStyled href={url} target="_blank" rel="noreferrer noopener">
      <Logo src={logo} />
      <Label>{label}</Label>
    </LinkStyled>
  );
};

const LinkStyled = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 3rem;
  padding: 0 0.5rem;
  margin: 0 -1rem;
  font-size: var(--fs5);
  border-radius: 1.5rem;

  &:hover {
    background-color: var(--underlay);
  }
`;

const Logo = styled.img`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  padding: 0.25rem;
  color: var(--highlightColor2);
`;

const Label = styled.span`
  font-weight: var(--fwBold);
`;

export default Link;
