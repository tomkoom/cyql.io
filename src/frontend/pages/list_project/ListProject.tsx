import React, { FC, useState } from "react"
import styled from "styled-components"
import { Steps, Step1, Step2 } from "./_index"

const ListProject: FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(1)

  return (
    <ListProjectStyled>
      <div className="content">
        <div className="header">
          <h2 className="pageTitle">List New #ic Project</h2>
          <p>Under dev</p>
          {/* <p>
            The project will be listed as a proposal and will be voted and moderated by the
            community
          </p>
          <Steps step={step} /> */}
        </div>

        {/* {step === 1 ? <Step1 setStep={setStep} /> : step === 2 ? <Step2 setStep={setStep} /> : null} */}
      </div>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  > div.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 4rem;

    > div.header {
      > p {
        font-weight: var(--fwMedium);
        color: var(--tertiaryColor);
        text-align: center;
      }
    }
  }
`

export default ListProject
