import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface ChangeProps {
  change: number;
  icon: ReactNode;
  color: string;
}

const Change: FC<ChangeProps> = ({ change, icon, color }): JSX.Element => {
  return (
    <ChangeStyled>
      <Value style={{ color }}>
        {icon && <span>{icon}</span>}
        {Number(Math.abs(change)).toFixed(2) + "%"}
      </Value>
      <Interval>24h</Interval>
    </ChangeStyled>
  );
};

const ChangeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
`;

const Value = styled.span`
  display: flex;
  align-items: center;

  > span {
    font-size: 0.75rem;
    margin-right: 0.125rem;
  }
`;

const Interval = styled.span`
  color: var(--tertiaryColor);
`;

export default Change;
