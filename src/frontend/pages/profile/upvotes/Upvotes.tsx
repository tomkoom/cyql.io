import { iCaretUp } from "@/components/icons/Icons"
import { ProjectLogoLetter } from "@/components/ui"
import { useNavigation, useProjects } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectProfile } from "@/state/profile/profile"
import { getLogoUrl } from "@/utils/utils"
import { useEffect } from "react"
import styled from "styled-components"

export default function Upvotes() {
  const { refreshUserUpvotedProjects } = useProjects()
  const { toProject } = useNavigation()
  const upvotedProjects = useAppSelector(selectProfile).upvotedProjects

  const nav = (id: string): void => {
    toProject(id)
  }

  useEffect(() => {
    refreshUserUpvotedProjects()
  }, [])

  return (
    <UpvotesStyled>
      <div className="header">
        <h4>Upvotes</h4>
        <p>Recently upvoted</p>
      </div>

      <ul>
        {upvotedProjects.map((p) => {
          const logoUrl = getLogoUrl(p)
          return (
            <li key={p.id} onClick={() => nav(p.id)}>
              <div className="left">
                {logoUrl ? <img src={logoUrl} alt={`${p.name} logo`} /> : <ProjectLogoLetter size="3rem" borderRadius="1.5rem" name={p.name} />}
                <div>
                  <p className="name">{p.name}</p>
                  <p className="description line-clamp-2">{p.description}</p>
                </div>
              </div>

              <div className="right">
                <p>
                  {iCaretUp} {p.upvotedBy.length}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </UpvotesStyled>
  )
}

const UpvotesStyled = styled.div`
  width: 100%;

  > div.header {
    margin-bottom: 2rem;

    > h4 {
      margin-bottom: 0.25rem;
    }

    > p {
      font-size: var(--fsText);
      color: var(--tertiaryColor);
    }
  }

  > ul {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex-wrap: wrap;
      padding: 1rem;
      background-color: var(--underlay1);
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay2);
      }

      > div.left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;

        > img {
          width: 3rem;
          border-radius: 50%;
        }

        > div {
          > p.name {
            font-weight: var(--fwBold);
          }

          > p.description {
            font-size: var(--fsText);
            color: var(--tertiaryColor);
          }
        }
      }
    }
  }
`
