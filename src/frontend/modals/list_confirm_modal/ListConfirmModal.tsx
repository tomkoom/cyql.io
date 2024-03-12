import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { DataItem } from "./_index"
import { camelCaseToWords } from "@/utils/camelCaseToWords"
import { Btn } from "@/components/btns/_index"
import { useDao } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectListProject } from "@/state/projectProposal"

interface ListConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

const ListConfirmModal: FC<ListConfirmModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const { createProposal } = useDao()
  const project = useAppSelector(selectListProject)

  const submit = async (): Promise<void> => {
    await createProposal(project).then(() => onClose())
  }

  return (
    <RootModal isOpen={isOpen}>
      <ListConfirmModalStyled>
        <CrossIcon onClick={onClose} />
        <h3>Review & Confirm</h3>

        <div className="content">
          <ul>
            {Object.entries(project).map(([key, value]) => (
              <DataItem
                key={key}
                label={camelCaseToWords(key)}
                value={typeof value === "object" ? value.join().toUpperCase() : value}
              />
            ))}
          </ul>
        </div>

        <Btn btnType={"primary"} text={"Confirm"} onClick={submit} style={{ width: "100%" }} />
      </ListConfirmModalStyled>
    </RootModal>
  )
}

const ListConfirmModalStyled = styled.div`
  color: var(--primaryColor);
  background-color: var(--background);
  padding: 1rem 1rem 4rem 1rem;

  /* ... */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 1rem;

  /* overflow */
  max-height: calc(100vh);
  overflow-y: auto;

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

export default ListConfirmModal
