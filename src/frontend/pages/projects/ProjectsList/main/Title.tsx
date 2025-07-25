import { iCircleNodes, iGithub } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui"
import type { Project } from "@/state/types/Project"
import styled from "styled-components"

interface TitleProps {
  project: Project
}

export default function Title({ project }: TitleProps) {
  const upvotesNum = project.upvotedBy.length

  const format = (description: string): string => {
    return description && description.length > 70 ? `${description.substring(0, 70)}…` : description
  }

  return (
    <div>
      <Main>
        <h4>{project.name}</h4>
        <Icons>
          {project.github && <li id="open">{iGithub}</li>}
          {project.frontendCanisterId && <li id="onchain">{iCircleNodes}</li>}
        </Icons>
        <UpvotesNum upvotesNum={upvotesNum} />
      </Main>

      <Description>{format(project.description)}</Description>
    </div>
  )
}

const Main = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;

  > h4 {
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    word-wrap: break-word;
    line-height: 120%;
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
  line-height: 140%;
`
