import React, { FC, useState } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"

const Link: FC = (): JSX.Element => {
  const [copied, setCopied] = useState(false)
  const url = window.location.href

  const copy = (): void => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <LinkStyled>
      <label>or copy url</label>
      <Field>
        <input type="text" value={url} readOnly />
        <Btn
          style={{ width: "100%" }}
          btnType={"secondary"}
          text={copied ? "Copied!" : "Copy"}
          onClick={() => !copied && copy()}
        />
      </Field>
    </LinkStyled>
  )
}

const LinkStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  > label {
    font-weight: var(--fwBold);
  }
`

const Field = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  > input {
    width: 100%;
    height: 3.5rem;
    padding: 0 0.75rem;
    box-sizing: border-box;
    font-size: var(--fs6);
    font-weight: var(--fwMedium);
    color: var(--primaryColor);
    background-color: var(--underlay1);
    caret-color: var(--primaryColor);
    border: none;
    outline: none;
  }
`

export default Link
