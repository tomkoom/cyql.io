import React, { FC } from "react"
import styled from "styled-components"
import { formatId } from "@/utils/format"
import { useAuth } from "@/context/Auth"
// import { Ids } from "./_index"

const Id: FC = (): JSX.Element => {
  const { userId } = useAuth()

  return (
    <IdStyled>
      <div className="text">
        <div className="principal">
          <h2 className="pageTitle">{formatId(userId)}</h2>
          <p>{userId}</p>
        </div>

        {/* <Ids /> */}
      </div>
    </IdStyled>
  )
}

const IdStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 10rem;

  > div.text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    > div.principal {
      display: flex;
      flex-direction: column;

      > p {
        color: var(--secondaryColor);
      }
    }
  }
`

export default Id
