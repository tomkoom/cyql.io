import React, { FC } from "react"
import styled from "styled-components"
import { LEDGERS } from "@/constants/constants"

interface LedgersProps {
  ledgerIdParam: string
  setLedgerIdParam: (ledgerId: string) => void
}

const Ledgers: FC<LedgersProps> = ({ ledgerIdParam, setLedgerIdParam }) => {
  return (
    <LedgersStyled>
      {LEDGERS.map((ledger) => (
        <li
          key={`${ledger.symbol}-${ledger.id}`}
          className={ledger.id === ledgerIdParam ? "active" : null}
          onClick={() => setLedgerIdParam(ledger.id)}
        >
          {ledger.symbol}
        </li>
      ))}
    </LedgersStyled>
  )
}

const LedgersStyled = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-weight: var(--fwBold);

  > li {
    color: var(--secondaryColor);
    background-color: var(--underlay2);
    padding: 0.6rem 0.6rem;
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      color: var(--primaryColor);
      background-color: var(--underlay3);
    }

    &.active {
      color: var(--background);
      background-color: var(--primaryColor);
    }
  }
`

export default Ledgers
