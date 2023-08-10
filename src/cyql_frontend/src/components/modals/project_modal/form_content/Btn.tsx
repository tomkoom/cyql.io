import React, { FC } from "react";
import styled from "styled-components";

interface BtnProps {
  property: boolean;
  value: boolean;
  label: string;
  setProperty: (value: boolean) => void;
}

const Btn: FC<BtnProps> = ({ property, value, label, setProperty }): JSX.Element => {
  const active = {
    color: "var(--background)",
    backgroundColor: "var(--primaryColor)",
  };

  return (
    <BtnStyled style={property === value ? active : null} onClick={() => setProperty(value)}>
      {label}
    </BtnStyled>
  );
};

const BtnStyled = styled.button`
  font-size: var(--fsText);
  font-weight: var(--fwBold);
  padding: 0.5rem;
  background-color: var(--underlay1);
  border-radius: 0.5rem;
`;

export default Btn;
