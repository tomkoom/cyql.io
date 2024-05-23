import React, { FC } from "react"
import styled from "styled-components"

interface DescriptionProps {
  name: string
  description: string
}

const Description: FC<DescriptionProps> = ({ name, description }): JSX.Element => {
  if (!description) return null

  return (
    <DescriptionStyled>
      <h4>About {name}</h4>
      <p>{description}</p>
    </DescriptionStyled>
  )
}

const DescriptionStyled = styled.div`
  background-color: var(--underlay1);
  padding: 1rem;

  > h4 {
    font-size: var(--fs5);
    margin-bottom: 0.25rem;
  }

  > p {
    color: var(--secondaryColor);
    font-size: var(--fs6);
    line-height: 150%;
  }
`

export default Description
