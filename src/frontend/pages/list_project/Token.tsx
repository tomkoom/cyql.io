import React, { FC } from "react"
import styled from "styled-components"
import { Input } from "./_index"

const Token: FC = (): JSX.Element => {
  return (
    <TokenStyled>
      <Input
        id={"tokenLedgerId"}
        label={"Token ledger id"}
        placeholder={"ryjl3-tyaaa-aaaaa-aaaba-cai"}
      />

      <div className="token_standard">
        <span>Token standard</span>

        <ul>
          <li>
            <input type="radio" id="icrc_1" name="token_standard" value="icrc_1" />
            <label htmlFor="icrc_1">ICRC-1</label>
          </li>

          <li>
            <input type="radio" id="icrc_2" name="token_standard" value="icrc_2" />
            <label htmlFor="icrc_2">ICRC-2</label>
          </li>

          <li>
            <input type="radio" id="ext" name="token_standard" value="ext" />
            <label htmlFor="ext">EXT</label>
          </li>

          <li>
            <input type="radio" id="dip20" name="token_standard" value="dip20" />
            <label htmlFor="dip20">DIP20</label>
          </li>
        </ul>
      </div>
    </TokenStyled>
  )
}

const TokenStyled = styled.div`
  > div.token_standard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > span {
      font-size: var(--fsText);
    }

    > ul {
      display: flex;
      justify-content: center;
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
          background-color: var(--underlay1);
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          transition: var(--transition1);

          &:hover {
            background-color: var(--underlay2);
          }
        }
      }
    }
  }
`

export default Token
