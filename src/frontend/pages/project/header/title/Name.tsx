import { device } from "@/styles/breakpoints"
import styled from "styled-components"

interface NameProps {
  name: string
}

export default function Name({ name }: NameProps) {
  return <NameStyled>{name}</NameStyled>
}

const NameStyled = styled.h3`
  font-weight: var(--fwBlack);
  word-break: break-all;

  @media ${device.mobileL} {
    font-size: var(--fs4);
  }
`
