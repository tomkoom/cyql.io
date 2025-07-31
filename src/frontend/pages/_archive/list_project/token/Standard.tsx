import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setListProject } from "@/state/listProject"

const Standard: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const inputs = [
    {
      id: "icrc_1",
      label: "ICRC-1",
      name: "token_standard",
      value: "icrc_1",
    },
    {
      id: "icrc_2",
      label: "ICRC-2",
      name: "token_standard",
      value: "icrc_2",
    },
    {
      id: "ext",
      label: "EXT",
      name: "token_standard",
      value: "ext",
    },
    {
      id: "dip20",
      label: "DIP20",
      name: "token_standard",
      value: "dip20",
    },
  ]

  const updateTokenStandard = (value: string): void => {
    dispatch(setListProject({ token_standard: value }))
  }

  return (
    <StandardStyled>
      <span>Token standard</span>

      <ul>
        {inputs.map((input) => (
          <li key={input.id}>
            <input
              type="radio"
              id={input.id}
              name={input.name}
              value={input.value}
              onClick={() => updateTokenStandard(input.value)}
            />
            <label htmlFor={input.id}>{input.label}</label>
          </li>
        ))}
      </ul>
    </StandardStyled>
  )
}

const StandardStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > span {
    font-size: var(--fsText);
  }

  > ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    > li input[type="radio"]:checked + label {
      background-color: var(--primaryColor);
      color: var(--background);
    }

    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      > input {
        display: none;
      }

      > label {
        font-size: var(--fsText);
        font-weight: var(--fwMedium);
        background-color: var(--underlay2);
        padding: 0.4rem 0.5rem;
        cursor: pointer;
        transition: var(--transition1);

        &:hover {
          background-color: var(--underlay3);
        }
      }
    }
  }
`

export default Standard
