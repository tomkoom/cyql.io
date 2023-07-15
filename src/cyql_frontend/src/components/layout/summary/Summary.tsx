import React, { FC } from "react";
import styled from "styled-components";

// redux
import { useSelector } from "react-redux";
import { selectProjectsDocsActiveNum } from "@/state/projects";

const Summary: FC = (): JSX.Element => {
  const projectsNum = useSelector(selectProjectsDocsActiveNum);

  return (
    <SummaryStyled>
      <ul>
        <li>
          all projects: <Highlight>{projectsNum}</Highlight>
        </li>
      </ul>
    </SummaryStyled>
  );
};

const SummaryStyled = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fontSize7);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  background-color: var(--underlay);
`;

const Highlight = styled.span`
  font-family: var(--monospace);
  font-size: var(--fontSize6);
  font-weight: var(--fwBold);
  color: var(--highlightColor3);
`;

export default Summary;
