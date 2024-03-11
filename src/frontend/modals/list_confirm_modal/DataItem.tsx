import React, { FC } from "react"
import styled from "styled-components"

interface DataItemProps {
  label: string
  value: string
}

const DataItem: FC<DataItemProps> = ({ label, value }): JSX.Element => {
  return (
    <DataItemStyled>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </DataItemStyled>
  )
}

const DataItemStyled = styled.li`
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

  > span.label {
    white-space: nowrap;
  }

  > span.value {
    color: var(--secondaryColor);
  }
`

export default DataItem
