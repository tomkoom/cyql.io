import React, { FC } from "react"
import styled from "styled-components"

// components
import { Logo, Title } from "./_index"

interface MainProps {
  logo: string
  name: string
  description: string
  github: string
  canister: string
  grantee: boolean
}

const Main: FC<MainProps> = ({
  logo,
  name,
  description,
  github,
  canister,
  grantee,
}): JSX.Element => {
  return (
    <MainStyled>
      <Logo logo={logo} name={name} />
      <Title
        name={name}
        description={description}
        github={github}
        canister={canister}
        grantee={grantee}
      />
    </MainStyled>
  )
}

const MainStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export default Main
