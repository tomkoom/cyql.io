import React, { FC } from "react"
import { device } from "@/styles/breakpoints"
import styled from "styled-components"

// components
import { FooterTop, FooterMid } from "./_index"

const Footer: FC = (): JSX.Element => {
  return (
    <FooterStyled>
      <Content>
        <FooterTop />
        <FooterMid />
      </Content>
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

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export default Footer
