import React, { FC } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"
import { iCopy } from "@/components/icons/Icons"
import { notifySuccess } from "@/utils/_index"
import { CopyToClipboard } from "react-copy-to-clipboard"

const Id: FC = (): JSX.Element => {
  const { userId, accounntIdHex } = useAuth()

  const copy = () => {
    notifySuccess("Copied")
  }

  return (
    <IdStyled>
      <div className="id_item">
        <span className="label">Principal Id</span>
        <span className="value">{userId}</span>

        <CopyToClipboard text={userId} onCopy={copy}>
          <span className="icon">{iCopy}</span>
        </CopyToClipboard>
      </div>

      <div className="id_item">
        <span className="label">Account Id</span>
        <span className="value">{accounntIdHex}</span>

        <CopyToClipboard text={accounntIdHex} onCopy={copy}>
          <span className="icon">{iCopy}</span>
        </CopyToClipboard>
      </div>
    </IdStyled>
  )
}

const IdStyled = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > div.id_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    background-color: var(--underlay1);

    > span.label {
      font-size: var(--fsText);
      color: var(--tertiaryColor);
      margin-bottom: 0.25rem;
    }

    > span.value {
      word-break: break-word;
    }

    > span.icon {
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      color: var(--secondaryColor);
      background-color: var(--underlay2);
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        color: var(--primaryColor);
        background-color: var(--underlay3);
      }
    }
  }
`

export default Id
