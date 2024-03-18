import React, { FC } from "react"
import styled from "styled-components"

interface DataItemProps {
  label: string
  value: string
  isLast: boolean
}

const DataItem: FC<DataItemProps> = ({ label, value, isLast }): JSX.Element => {
  return (
    <DataItemStyled>
      <div className="data">
        <span className="label1">{label}</span>
        <span className="value1">{value || "..."}</span>
      </div>

      {!isLast && <div className="divider" />}
    </DataItemStyled>
  )
}

const DataItemStyled = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;

  > div.data {
    display: flex;
    align-items: flex-start;
    margin: 0.5rem 0;
    gap: 0.25rem;
    font-size: var(--fsText);
    font-weight: var(--fwRegular);
    color: var(--primaryColor);

    > span {
      flex: 1;
    }

    > span.label1 {
      color: var(--secondaryColor);
    }

    > span.value1 {
      color: var(--primaryColor);
    }
  }

  > div.divider {
    height: 1px;
    width: 100%;
    background-color: var(--underlay2);
  }
`

export default DataItem
