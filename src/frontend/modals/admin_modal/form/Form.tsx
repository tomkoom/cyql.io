import React, { FC, ChangeEvent } from "react"
import styled from "styled-components"
import { Categories, Description, Input, Meta, Logo } from "./_index"
import { main, web2Links, web3Links, token, additional, nft } from "./_inputs"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemString } from "@/state/admin/admin"

const Form: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectAdmin).project

  const updateProjectItem = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    dispatch(setAdminProjectItemString({ [name]: value }))
  }

  return (
    <FormContentStyled>
      <div>
        <Logo />
      </div>

      <div className="main">
        <Section>
          <Categories />
        </Section>

        <Section>
          <h6>Core</h6>
          {main.map((input) => (
            <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
          ))}
          <Description />
          <Meta />
        </Section>

        <Section>
          <h6>Web 2 Links</h6>
          {web2Links.map((input) => (
            <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
          ))}
        </Section>

        <Section>
          <h6>Web 3 Links</h6>
          {web3Links.map((input) => (
            <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
          ))}
        </Section>

        <Section>
          <h6>Token</h6>
          {token.map((input) => (
            <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
          ))}
        </Section>

        <Section>
          <h6>Additional Info</h6>
          {additional.map((input) => (
            <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
          ))}
        </Section>

        {project.category.length > 0 && project.category.includes("NFTs") && (
          <Section>
            <h6>NFT Data</h6>
            {nft.map((input) => (
              <Input id={input.id} label={input.id} type={input.type} value={project[input.id]} onChange={updateProjectItem} key={input.id} />
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
  margin: 0 auto;

  > div.main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
    gap: 1rem;
  }
`

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: var(--boxShadow2);
  padding: 2rem;

  > h6 {
    font-weight: var(--fwMedium);
  }
`

export default Form
