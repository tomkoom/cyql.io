import React, { FC } from "react"
import styled from "styled-components"
import { iHashtag } from "@/components/icons/Icons"
import { getCategoryNum } from "@/utils/getCategoryNum"
import { useNav } from "@/hooks/_index"
import { useNavigate, createSearchParams } from "react-router-dom"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjects } from "@/state/projects"
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

interface TagProps {
  label: string
  route: () => void
}

const Tag: FC<TagProps> = ({ label, route }): JSX.Element => {
  const projects = useAppSelector(selectActiveProjects)

  return (
    <TagStyled onClick={route}>
      <span className="icon">{iHashtag}</span>
      <span className="label">
        {label} <span className="num">{getCategoryNum(projects, label) || ""}</span>
      </span>
    </TagStyled>
  )
}

const Tags: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const navigate = useNavigate()
  const categories = useAppSelector(selectCategoriesSortedByNum)

  const route = (categoryLabel: string): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: categoryLabel,
        q: "",
      })}`,
    })
  }

  return (
    <TagsStyled>
      {categories.slice(0, 12).map((c) => {
        return <Tag key={c.id} label={c.label} route={() => route(c.label)} />
      })}
      <Tag label={"..."} route={toProjects} />
    </TagsStyled>
  )
}

const TagStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.5rem;
  font-size: var(--fsText);
  font-weight: var(--fwRegular);
  color: var(--tertiaryColor);
  box-shadow: var(--boxShadow1Inset);
  border-radius: 0.4rem;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
    background-color: var(--underlay1);
  }

  > span.icon {
    font-size: 0.8rem;
    color: var(--highlight3);
  }

  > span.label {
    white-space: nowrap;

    > span.num {
      color: var(--tertiaryColor);
      font-size: 0.7rem;
    }
  }
`

const TagsStyled = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export default Tags
