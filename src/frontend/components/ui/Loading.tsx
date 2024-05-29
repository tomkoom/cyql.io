import React, { FC } from "react"
import styled from "styled-components"
import { Spinner } from "@/components/ui/_index"

const Loading: FC = (): JSX.Element => {
  return (
    <LoadingStyled>
      <Spinner />
    </LoadingStyled>
  )
}

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`

export default Loading
