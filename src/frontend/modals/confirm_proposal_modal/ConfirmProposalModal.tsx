import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { DataItem } from "./_index"
import { camelCaseToWords } from "@/utils/camelCaseToWords"
import { Btn } from "@/components/btns/_index"
import { useDao } from "@/hooks/_index"
import { notifyErr, notifySuccess } from "@/utils/notify"
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
  const { createProposal } = useDao()
  const project = useAppSelector(selectListProject)

  const submit = async (): Promise<void> => {
    dispatch(setIsLoading(true))

    await createProposal(project)
      .then(() => {
        dispatch(setClearProposedProject())
        onClose()
        dispatch(setIsLoading(false))
        notifySuccess("Proposal submitted.")
      })
      .catch((err) => {
        dispatch(setIsLoading(false))
        notifyErr(err.message || "Err")
      })
  }

  return (
    <RootModal isOpen={isOpen}>
      <ConfirmProposalModalStyled>
        <CrossIcon onClick={onClose} />
        <h3>Review & Confirm</h3>

        <div className="content">
          <ul>
            {Object.entries(project).map(([key, value]) => (
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
