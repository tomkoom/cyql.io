import React, { FC } from "react"
import styled from "styled-components"
import Modal from "../_Modal"
import { DataItem } from "./_index"
import { camelCaseToWords } from "@/utils/camelCaseToWords"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectListProject } from "@/state/listProject"

interface ListConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

const ListConfirmModal: FC<ListConfirmModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const project = useAppSelector(selectListProject)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content>
        <h3>Confirm Project Data</h3>

        <ul>
          {Object.entries(project).map(([key, value]) => (
            <DataItem
              key={key}
              label={camelCaseToWords(key)}
              value={key === "category" ? value.join().toUpperCase() : value}
            />
          ))}

          <DataItem label={"Category"} value={project.category.join(", ").toUpperCase()} />
          <DataItem label={"Name"} value={project.name} />
          <DataItem label={"Description"} value={project.description} />
          <DataItem label={"Domain"} value={project.domain} />
          <DataItem label={"Frontend Canister Id"} value={project.frontendCanisterId} />
          <DataItem label={"Backend Canister Id"} value={project.backendCanisterId} />
        </ul>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  width: 100%;

  /* overflow */
  max-height: calc(100vh - 10rem);
  overflow-y: auto;

  h3 {
    font-size: var(--fs4);
    text-align: center;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.5rem;
  }
`

export default ListConfirmModal
