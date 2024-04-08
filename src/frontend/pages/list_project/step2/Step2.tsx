import React, { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { camelCaseToWords, notifyErr, notifySuccess } from "@/utils/_index"
import { Btn } from "@/components/btns/_index"
import { useNav, useProposals } from "@/hooks/_index"
import { DataItem } from "./_index"
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectListProject, setClearProposedProject } from "@/state/projectProposal"
import { setIsLoading } from "@/state/loading"

interface Step2Props {
  setStep: Dispatch<SetStateAction<number>>
}

const Step2: FC<Step2Props> = ({ setStep }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const { createProposal, refreshProposals } = useProposals()
  const { toProposals } = useNav()
  const proposalPayload = useAppSelector(selectListProject)

  const previousStep = (): void => {
    if (isAuthenticated) {
      setStep(1)
    }
  }

  const submit = async (): Promise<void> => {
    try {
      dispatch(setIsLoading(true))
      await createProposal(proposalPayload)
      await refreshProposals()
      dispatch(setClearProposedProject())
      notifySuccess("Proposal submitted.")
      toProposals()
    } catch (e) {
      notifyErr(e.message || "Err")
      throw new Error(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <Step2Styled className="wrapper1280">
      <div className="title">
        <h3>2. Review and Submit</h3>
        <p>Review project data and submit proposal</p>
      </div>

      <ul>
        {Object.entries(proposalPayload).map(([key, value]) => (
          <DataItem
            key={key}
            label={camelCaseToWords(key)}
            value={Array.isArray(value) ? value.join().toUpperCase() : value}
          />
        ))}
      </ul>

      <div className="actions">
        <Btn btnType={"secondary"} text={"Back"} onClick={previousStep} />
        <Btn btnType={"primary"} text={"Submit Proposal"} onClick={submit} />
      </div>
    </Step2Styled>
  )
}

const Step2Styled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div.title {
    text-align: center;

    > h3 {
      font-size: var(--fs4);
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--tertiaryColor);
    }
  }

  > ul {
    font-size: var(--fsText);
    font-weight: var(--fwRegular);
    color: var(--primaryColor);

    > li:nth-child(even) {
      background-color: var(--underlay1);
    }
  }

  > div.actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > button {
      flex: 1;
    }
  }
`

export default Step2
