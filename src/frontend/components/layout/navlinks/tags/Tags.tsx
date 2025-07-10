import { useNav, useProjects, useQueryParams } from "@/hooks"
import { LoadingModal } from "@/modals"
import React, { FC } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Tag } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectCategories } from "@/state/categories/categories"
import { selectPaginatedIsLoading } from "@/state/projects/paginated"

const Tags: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { toProjects } = useNav()
  const { refreshPaginated } = useProjects()
  const { queryParams, queryParamsString } = useQueryParams()
  const categories = useAppSelector(selectCategories).categoriesWithSize
  const isLoading = useAppSelector(selectPaginatedIsLoading)

  const route = async (category: string): Promise<void> => {
    try {
      await refreshPaginated({
        ...queryParams,
        category,
      })
      navigate({
        pathname: "projects",
        search: `?${createSearchParams({
          ...queryParamsString,
          category,
        })}`,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <TagsStyled>
      <LoadingModal isOpen={isLoading} />
      <ul>
        {categories.slice(0, 12).map((c) => {
          return <Tag key={c.category.id} label={c.category.lbl} size={c.size} route={() => route(c.category.lbl)} />
        })}
        <Tag label={"..."} size={null} route={toProjects} />
      </ul>
    </TagsStyled>
  )
}

const TagsStyled = styled.div`
  > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
  }
`

export default Tags
