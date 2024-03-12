import React, { FC } from "react"
import styled from "styled-components"

interface DataItemProps {
  label: string
  value: string
}

const DataItem: FC<DataItemProps> = ({ label, value }): JSX.Element => {
  return (
    <DataItemStyled>
      <div>
        <span className="label">{label}</span>
        <span className="value">{value || "-/-"}</span>
      </div>

      <div className="divider" />
    </DataItemStyled>
  )
}

const DataItemStyled = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > div {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.25rem;
    gap: 0.5rem;
    font-size: var(--fsText);
    font-weight: var(--fwRegular);
    color: var(--primaryColor);

    > span {
      flex: 1;
    }

    > span.value {
      color: var(--secondaryColor);
    }
  }

  > div.divider {
    height: 1px;
    width: 100%;
    background-color: var(--underlay2);
  }
`

export default DataItem
