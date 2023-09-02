import React, { FC } from "react";
import styled from "styled-components";

// icons
import { iAngleRight } from "@/components/icons/Icons";

interface BtnProps {
  label: string;
  logo: string;
  onClick: () => void;
}

const Btn: FC<BtnProps> = ({ label, logo, onClick }): JSX.Element => {
  return (
    <BtnStyled onClick={onClick}>
      <div>
        <img src={logo} alt={`${label} logo"`} />
        <span>{label}</span>
      </div>
      <Icon>{iAngleRight}</Icon>
    </BtnStyled>
  );
};

const BtnStyled = styled.button`
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: var(--fs5);
  padding: 0 1rem;
  border-radius: 1.75rem;

  &:hover {
    background-color: var(--underlay1);
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  > div img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  > div span {
    font-weight: var(--fwBold);
  }
`;

const Icon = styled.span`
  width: 1rem;
  height: 1rem;
  display: grid;
  place-items: center;
  color: var(--secondaryColor);
`;

export default Btn;
