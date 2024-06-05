import React, { FC } from "react"
import styled from "styled-components"
import { formatId } from "@/utils/_index"
import { useAuth } from "@/context/Auth"

const Header: FC = (): JSX.Element => {
  const { userId } = useAuth()

  return (
    <HeaderStyled>
      <h2 className="pageTitle">{formatId(userId)}</h2>
      <p>{userId}</p>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  > p {
    color: var(--tertiaryColor);
  }
`

export default Header
