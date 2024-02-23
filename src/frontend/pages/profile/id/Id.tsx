import React, { FC } from "react"
import styled from "styled-components"
import { formatId } from "@/utils/format"
import { useAuth } from "@/context/Auth"
// import { Ids } from "./_index"

const Id: FC = (): JSX.Element => {
  const { userId, accounntIdHex } = useAuth()

  return (
    <IdStyled>
      <h2 className="pageTitle">{formatId(userId)}</h2>

      <div className="id_item">
        <p className="label">principal id</p>
        <p className="value">{userId}</p>
      </div>

      <div className="id_item">
        <p className="label">account id</p>
        <p className="value">{accounntIdHex}</p>
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

    > p.value {
      word-break: break-word;
    }
  }
`

export default Id
