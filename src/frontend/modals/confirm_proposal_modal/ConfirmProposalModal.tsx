import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { DataItem } from "./_index"
import { camelCaseToWords, notifyErr, notifySuccess } from "@/utils/_index"
import { Btn } from "@/components/btns/_index"
import { useNav, useProposals } from "@/hooks/_index"
import { modalStyles } from "../_modalStyles"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectListProject, setClearProposedProject } from "@/state/projectProposal"
import { setIsLoading } from "@/state/loading"

interface ConfirmProposalModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfirmProposalModal: FC<ConfirmProposalModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { createProposal, refreshProposals } = useProposals()
  const { toProposals } = useNav()
  const proposalPayload = useAppSelector(selectListProject)

  const submit = async (): Promise<void> => {
    try {
      dispatch(setIsLoading(true))
      await createProposal(proposalPayload)
      await refreshProposals()
      dispatch(setClearProposedProject())
      onClose()
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
    <RootModal isOpen={isOpen}>
      <ConfirmProposalModalStyled>
        <CrossIcon onClick={onClose} />
        <h3>Review & Confirm</h3>

        <div className="content">
          <ul>
            {Object.entries(proposalPayload).map(([key, value]) => (
              <DataItem
                key={key}
                label={camelCaseToWords(key)}
                value={Array.isArray(value) ? value.join().toUpperCase() : value}
              />
            ))}
          </ul>
        </div>

        <Btn btnType={"primary"} text={"Confirm"} onClick={submit} style={{ width: "100%" }} />
      </ConfirmProposalModalStyled>
    </RootModal>
  )
}

const ConfirmProposalModalStyled = styled.div`
  ${modalStyles}

  > h3 {
    font-size: var(--fs5);
    text-align: center;
  }

  > div.content {
    width: 100%;
    background-color: var(--underlay1);
    padding: 1rem;
    margin-bottom: 1rem;

    > ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }
  }
`

export default ConfirmProposalModal
