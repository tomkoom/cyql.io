import React, { FC } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

// components
import { Controls, FormContent, Header } from "./_index";
import { Spinner } from "@/components/ui/_index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import {
  selectProjectModalLoadingSet,
  selectProjectModalLoadingDel,
} from "@/state/modals/projectModal/projectModalLoading";
import { selectTheme } from "@/state/ui/theme";

interface ProjectModalProps {
  isOpen: boolean;
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen }): JSX.Element => {
  if (!isOpen) return null;

  const theme = useAppSelector(selectTheme);
  const setIsLoading = useAppSelector(selectProjectModalLoadingSet);
  const delIsLoading = useAppSelector(selectProjectModalLoadingDel);

  return createPortal(
    <ProjectModalStyled className={theme}>
      {setIsLoading || delIsLoading ? (
        <Spinner />
      ) : (
        <Main>
          <Header />

          <Form>
            <FormContent />
            <Controls />
          </Form>
        </Main>
      )}
    </ProjectModalStyled>,
    document.getElementById("modal")
  );
};

const ProjectModalStyled = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  color: var(--primaryColor);
  background-color: var(--background);

  /* overflow */
  height: 100%;
  overflow: auto;
  padding: 2rem;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  margin-top: 1rem;
`;

export default ProjectModal;
