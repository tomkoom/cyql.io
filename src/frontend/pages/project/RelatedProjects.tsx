import { LogoLetter } from "@/components/ui"
import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import type { Project } from "@/state/_types/curated_projects_types"
import { selectProject } from "@/state/project"
import { trimDescription, trimName } from "@/utils/index"
import { FC } from "react"
import styled from "styled-components"

const RelatedProjects: FC = (): JSX.Element => {
  const { toProject } = useNav()
  const related = useAppSelector(selectProject).relatedProjects

  if (related.length < 1) {
    return null
  }

  return (
    <RelatedProjectsStyled>
      <h4>More Related Projects</h4>

      <ul className="grid">
        {related.slice(0, 12).map((p: Project) => (
          <li key={p.id} onClick={() => toProject(p.id)}>
            <div>
              {p.logoDataUrl ? <img src={p.logoDataUrl} alt={`${p.name} logo`} /> : <LogoLetter size="4.5rem" borderRadius="2.25rem" name={p.name} />}

              <div>
                <p className="name">{trimName(p.name)}</p>
                <p className="category">{p.category.join(", ").toLowerCase()}</p>
                <p className="description">{trimDescription(p.description)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </RelatedProjectsStyled>
  )
}

const RelatedProjectsStyled = styled.div`
  > h4 {
    text-align: center;
    font-size: var(--fs5);
    margin-bottom: 2rem;
  }

  > ul.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;

    > li {
      cursor: pointer;
      transition: var(--transition1);

      > div {
        display: flex;
        align-items: center;
        gap: 1rem;

        > img {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 50%;
          flex-shrink: 0;
          object-fit: cover;
        }

        > div {
          > p.name {
            font-weight: var(--fwBold);
            line-height: 150%;
          }

          > p.category {
            font-size: var(--fs7);
            font-weight: var(--fwMedium);
            color: var(--secondaryColor);
            line-height: 150%;
          }

          > p.description {
            font-size: var(--fsText);
            color: var(--tertiaryColor);
            word-break: break-word;
            line-height: 150%;
          }
        }
      }
    }
  }
`

export default RelatedProjects
