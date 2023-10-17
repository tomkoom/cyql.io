import React, { FC } from "react"
import styled from "styled-components"

// constants
import { IC_LOGO } from "@/constants/constants"

// components
import { Btn } from "./_index"

// auth
import { useAuth } from "@/context/Auth"

const SignInMethods: FC = (): JSX.Element => {
  const { login } = useAuth()
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: IC_LOGO,
      click: login,
      aboutUrl: "https://identity.ic0.app/",
    },
  ]

  return (
    <SignInMethodsStyled>
      {signInMethods.map((signInMethod) => (
        <Item key={signInMethod.id}>
          <Btn label={signInMethod.label} logo={signInMethod.logo} onClick={signInMethod.click} />
          <Url href={signInMethod.aboutUrl} rel="noreferrer noopener" target="_blank">
            About {signInMethod.label}
          </Url>
        </Item>
      ))}
    </SignInMethodsStyled>
  )
}

const SignInMethodsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Url = styled.a`
  align-self: flex-start;
  color: var(--secondaryColor);
  font-size: var(--fsText);

  &:hover {
    color: var(--primaryColor);
  }
`

export default SignInMethods
