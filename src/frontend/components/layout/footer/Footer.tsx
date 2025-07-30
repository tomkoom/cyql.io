import { device } from "@/styles/breakpoints"
import styled from "styled-components"
import { FooterBottom, FooterTop } from "."

export default function Footer() {
  return (
    <FooterStyled>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <FooterTop />
        <FooterBottom />
      </div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  width: 100%;
  padding: 3rem 2rem;
  margin-top: 1rem;
  background-color: var(--underlay1);

  @media ${device.laptop} {
    padding: 3rem 1rem;
  }
`
