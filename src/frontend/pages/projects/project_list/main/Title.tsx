import React, { FC } from "react"
import styled from "styled-components"
import { iGithub, iCircleNodes, iMeteor } from "@/components/icons/Icons"

interface TitleProps {
  name: string
  description: string
  github: string
  canister: string
  grantee: boolean
}

const Title: FC<TitleProps> = ({ name, description, github, canister, grantee }): JSX.Element => {
  const format = (description: string) => {
    return description && description.length > 70 ? `${description.substring(0, 70)}…` : description
  }

  return (
    <div>
      <Main>
        <h3>{name}</h3>
        <Icons>
          {github && <li id="open">{iGithub}</li>}
          {canister && <li id="onchain">{iCircleNodes}</li>}
          {grantee && <li id="grantee">{iMeteor}</li>}
        </Icons>
      </Main>

      <Description>{format(description)}</Description>
    </div>
  )
}

const Main = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.125rem;

  > h3 {
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    word-wrap: break-word;
  }
`

const Icons = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > li {
    &#open {
      color: var(--primaryColor);
    }

    &#onchain {
      color: var(--highlight3);
    }

    &#grantee {
      color: var(--colorOk);
    }
  }
`

const Description = styled.p`
  font-size: var(--fsText);
  color: var(--tertiaryColor);
  margin-top: 0.25rem;
  line-height: 140%;
`

export default Title
