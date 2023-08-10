import React, { FC, ChangeEvent } from "react";
import styled from "styled-components";

// components
import { Categories, Description, Grantee, Input, Meta } from "./_index";

// inputs
import { main, socials, additional, nft } from "./inputs";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProjectDoc, setProjectDocData } from "@/state/modals/projectModal/projectModal";

const FormContent: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectProjectDoc);

  const updateProject = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch(setProjectDocData({ [name]: value }));
  };

  return (
    <FormContentStyled>
      <Section>
        <Categories />
      </Section>

      <Section>
        <h5>main</h5>
        {main.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={project.data[input.id]}
            onChange={updateProject}
            key={input.id}
          />
        ))}
        <Description />
        <Grantee />
        <Meta />
      </Section>

      <Section>
        <h5>social networks</h5>
        {socials.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={project.data[input.id]}
            onChange={updateProject}
            key={input.id}
          />
        ))}
      </Section>

      <Section>
        <h5>additional info</h5>
        {additional.map((input) => (
          <Input
            id={input.id}
            label={input.id}
            type={input.type}
            value={project.data[input.id]}
            onChange={updateProject}
            key={input.id}
          />
        ))}
      </Section>

      {project.data.categories && project.data.categories.includes("NFTs") && (
        <Section>
          <h5>nft data</h5>
          {nft.map((input) => (
            <Input
              id={input.id}
              label={input.id}
              type={input.type}
              value={project.data[input.id]}
              onChange={updateProject}
              key={input.id}
            />
          ))}
        </Section>
      )}
    </FormContentStyled>
  );
};

const FormContentStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 16rem;
  margin-top: 1rem;

  > h5 {
    font-weight: var(--fwMedium);
  }
`;

export default FormContent;
