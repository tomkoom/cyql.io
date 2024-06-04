import React, { FC } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"
import { iCopy } from "@/components/icons/Icons"
import { notifySuccess } from "@/utils/_index"
import { CopyToClipboard } from "react-copy-to-clipboard"

const Id: FC = (): JSX.Element => {
  const { userId, accounntIdHex } = useAuth()

  const copy = (): void => {
    notifySuccess("Copied.")
  }

  return (
    <IdStyled>
      <li className="id_item">
        <p className="label">Principal Id</p>
        <p className="value">{userId}</p>

        <CopyToClipboard text={userId} onCopy={copy}>
          <button>
            Copy <span className="icon">{iCopy}</span>
          </button>
        </CopyToClipboard>
      </li>

      <li className="id_item">
        <p className="label">Account Id</p>
        <p className="value">{accounntIdHex}</p>

        <CopyToClipboard text={accounntIdHex} onCopy={copy}>
          <button>
            Copy <span className="icon">{iCopy}</span>
          </button>
        </CopyToClipboard>
      </li>
    </IdStyled>
  )
}

const IdStyled = styled.ul`
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > li.id_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.8rem;
    background-color: var(--underlay1);

    > p.label {
      font-size: var(--fsText);
      color: var(--tertiaryColor);
      margin-bottom: 0.25rem;
    }

    > p.value {
      word-break: break-word;
    }

    > button {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-wrap: wrap;
      font-size: var(--fsText);
      color: var(--secondaryColor);
      padding: 0.5rem;
      background-color: var(--underlay2);
      transition: var(--transition1);
      margin-top: 0.5rem;

      &:hover {
        color: var(--primaryColor);
        background-color: var(--underlay3);
      }

      > span.icon {
        color: var(--secondaryColor);
      }
    }
  }
`

export default Id
