import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks"

interface NotFoundProps {
  text: string
}

const NotFound: FC<NotFoundProps> = ({ text }): JSX.Element => {
  const { toHome } = useNav()

  return (
    <NotFoundStyled>
      <p>
        {text}. <span onClick={toHome}>Go to the homepage</span>
      </p>
    </NotFoundStyled>
  )
}

const NotFoundStyled = styled.div`
  text-align: center;

  > p {
    padding: 1rem;
    margin: 8rem 0;
  }

  > p span {
    text-decoration: underline;
    cursor: pointer;
  }
`

export default NotFound
