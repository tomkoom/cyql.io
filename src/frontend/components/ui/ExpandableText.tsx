import React, { FC, useState } from "react"
import styled from "styled-components"

interface ExpandableTextProps {
  text: string
}

const ExpandableText: FC<ExpandableTextProps> = ({ text }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <ExpandableTextStyled>
      <Content expanded={expanded}>
        <p>{text}</p>
      </Content>
      <Expand onClick={() => setExpanded(!expanded)}>{expanded ? "Read less" : "Read more"}</Expand>
    </ExpandableTextStyled>
  )
}

const ExpandableTextStyled = styled.div`
  font-size: var(--fsText);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  padding: 1rem;
`

const Content = styled.div<{ expanded: boolean }>`
  overflow: hidden;
  transition: max-height 0.2s ease;
  max-height: ${(p) => (p.expanded ? "none" : "1.25rem")};

  > p {
    line-height: 150%;
  }
`

const Expand = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 1.5rem;
  font-weight: var(--fwBold);
  cursor: pointer;
`

export default ExpandableText
