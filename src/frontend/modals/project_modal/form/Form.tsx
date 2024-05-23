import React, { FC, ChangeEvent } from "react"
import styled from "styled-components"
import { Categories, Description, Input, Meta, Logo } from "./_index"
import { main, socials, additional, nft } from "./_inputs"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProject, setProjectItem } from "@/state/modals/projectModal"

const Form: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectProject)

  const updateProject = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    dispatch(setProjectItem({ [name]: value }))
  }

  return (
    <FormContentStyled>
      <div className="logo">
        <Logo />
      </div>

      <div className="main">
        <Section>
          <Categories />
        </Section>

        <Section>
          <h6>Main</h6>
          {main.map((input) => (
            <Input
              id={input.id}
              label={input.id}
              type={input.type}
              value={project[input.id]}
              onChange={updateProject}
              key={input.id}
            />
          ))}
          <Description />
          <Meta />
        </Section>

        <Section>
          <h6>social networks</h6>
          {socials.map((input) => (
            <Input
              id={input.id}
              label={input.id}
              type={input.type}
              value={project[input.id]}
              onChange={updateProject}
              key={input.id}
            />
          ))}
        </Section>

        <Section>
          <h6>additional info</h6>
          {additional.map((input) => (
            <Input
              id={input.id}
              label={input.id}
              type={input.type}
              value={project[input.id]}
              onChange={updateProject}
              key={input.id}
            />
          ))}
        </Section>

        {project.category.length > 0 && project.category.includes("NFTs") && (
          <Section>
            <h6>nft data</h6>
            {nft.map((input) => (
              <Input
                id={input.id}
                label={input.id}
                type={input.type}
                value={project[input.id]}
                onChange={updateProject}
                key={input.id}
              />
            ))}
          </Section>
        )}
      </div>
    </FormContentStyled>
  )
}

const FormContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;

  > div.logo {
  }

  > div.main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 16rem;
  margin-top: 1rem;

  > h6 {
    font-weight: var(--fwMedium);
  }
`

export default Form
