import React, { FC } from "react";
import styled from "styled-components";

// components
import { Btn } from "./_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProject, setProjectGrantee } from "@/state/modals/project_modal/projectModal";

const Grantee: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const projectDoc = useAppSelector(selectProject);

  const setGrantee = (value: boolean) => {
    dispatch(setProjectGrantee(value));
  };

  return (
    <div>
      <SectionName>grantee</SectionName>

      <Btns>
        <Btn
          property={projectDoc.data.grantee}
          value={true}
          label={"true"}
          setProperty={setGrantee}
        />
        <Btn
          property={projectDoc.data.grantee}
          value={false}
          label={"false"}
          setProperty={setGrantee}
        />
      </Btns>
    </div>
  );
};

const SectionName = styled.p`
  font-weight: var(--fwMedium);
  color: var(--tertiaryColor);
  margin-bottom: 0.5rem;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default Grantee;
