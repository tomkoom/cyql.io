import React, { FC } from "react"
import styled from "styled-components"
import { IC_LOGO } from "@/constants/constants"
import { Btn } from "./_index"
import { useAuth } from "@/context/Auth"
import { useAuthenticate } from "@/hooks/_index"

const SignInMethods: FC = (): JSX.Element => {
  const { signIn } = useAuthenticate()
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: IC_LOGO,
      click: signIn,
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
  align-items: center;
  gap: 1rem;
`

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Url = styled.a`
  align-self: center;
  color: var(--secondaryColor);
  font-size: var(--fsText);
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
  }
`

export default SignInMethods
