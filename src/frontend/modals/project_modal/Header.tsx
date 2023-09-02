import React, { FC } from "react";
import styled from "styled-components";

// icons
import { CrossIcon } from "@/components/icons/_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProjectDoc, setCloseProjectModal } from "@/state/modals/projectModal/projectModal";

const Header: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectProjectDoc);

  const closeModal = (): void => {
    dispatch(setCloseProjectModal());
  };

  return (
    <HeaderStyled>
      <Title>
        <h4>edit {project.data.name}</h4>
        {project.key && <Id>{project.key}</Id>}
      </Title>

      <CrossIcon onClick={closeModal} />
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > h4 {
    font-size: var(--fs4);
  }
`;

const Id = styled.p`
  font-size: var(--fsText);
  background-color: var(--underlay1);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export default Header;
