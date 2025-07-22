import { ReactNode } from "react"
import styled from "styled-components"

interface BtnProps {
  icon: ReactNode
  onClick: () => void
}

export default function Btn({ icon, onClick }: BtnProps) {
  return (
    <BtnStyled onClick={onClick}>
      <span>{icon}</span>
    </BtnStyled>
  )
}

const BtnStyled = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  background-color: var(--underlay1);
  border-radius: 1.75rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--underlay2);
  }

  > span {
    font-size: var(--fs5);
    color: var(--secondaryColor);
  }
`
