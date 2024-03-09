import React, { FC } from "react"
import styled from "styled-components"
import { TextInputLabel } from "./_index"

const Primary: FC = (): JSX.Element => {
  const inputs = [
    { id: "name", label: "Project/dApp Name", placeholder: "..." },
    { id: "description", label: "Description [up to 140 symbols]", placeholder: "..." },
    { id: "domain", label: "Domain", placeholder: "app.io" },
    {
      id: "backendCanisterId",
      label: "Backend Canister Id",
      placeholder: "nrkmt-haaaa-aaaai-qagmq-cai",
    },
    {
      id: "frontendCanisterId",
      label: "Frontend Canister Id",
      placeholder: "n7ib3-4qaaa-aaaai-qagnq-cai",
    },
  ]

  return (
    <PrimaryStyled>
      {inputs.map((input) => (
        <TextInputLabel id={input.id} label={input.label} placeholder={input.placeholder} />
      ))}
    </PrimaryStyled>
  )
}

const PrimaryStyled = styled.div``

export default Primary
