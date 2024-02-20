import React, { FC } from "react"
import styled from "styled-components"
import { formatId } from "@/utils/format"
import { useAuth } from "@/context/Auth"
// import { Ids } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectUser } from "@/state/user"

const Id: FC = (): JSX.Element => {
  const { userId } = useAuth()
  const { accountId } = useAppSelector(selectUser)

  return (
    <IdStyled>
      <h2 className="pageTitle">{formatId(userId)}</h2>

      <div className="id_item">
        <p className="label">principal id</p>
        <p className="value">{userId}</p>
      </div>

      <div className="id_item">
        <p className="label">account id</p>
        <p className="value">{accountId || "..."}</p>
      </div>

      {/* <Ids /> */}
    </IdStyled>
  )
}

const IdStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > div.id_item {
    padding: 0.5rem 0.75rem;
    background-color: var(--underlay1);

    > p.label {
      margin-bottom: 0.25rem;
      color: var(--tertiaryColor);
    }
  }
`

export default Id
