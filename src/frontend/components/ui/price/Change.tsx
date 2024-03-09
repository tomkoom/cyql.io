import React, { FC } from "react"
import styled from "styled-components"
import { iArrowUp, iArrowDown } from "@/components/icons/Icons"

interface ChangeProps {
  change: number
}

const Change: FC<ChangeProps> = ({ change }): JSX.Element => {
  const style =
    change > 0
      ? { color: "var(--colorOk)" }
      : change < 0
      ? { color: "var(--colorErr)" }
      : { color: "var(--colorNeutral)" }

  const icon = change > 0 ? iArrowUp : change < 0 ? iArrowDown : ""

  return (
    <ChangeStyled>
      <span className="value" style={style}>
        {icon && <span>{icon}</span>}
        {Number(Math.abs(change)).toFixed(2) + "%"}
      </span>
      <span className="interval">24h</span>
    </ChangeStyled>
  )
}

const ChangeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;

  > span.value {
    display: flex;
    align-items: center;

    > span {
      font-size: 0.75rem;
      margin-right: 0.125rem;
    }
  }

  > span.interval {
    color: var(--tertiaryColor);
  }
`

export default Change
