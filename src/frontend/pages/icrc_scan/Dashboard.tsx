import React, { FC } from "react"
import styled from "styled-components"
import type { IcrcMetadata } from "@/hooks/useIcrcScan"
import { trimZeroes } from "@/utils/_index"
import { formatNumber } from "@/utils/_index"

interface DashboardProps {
  icrcMetadata: IcrcMetadata
}

const Dashboard: FC<DashboardProps> = ({ icrcMetadata }): JSX.Element => {
  const totalSupply = +icrcMetadata.icrc1_total_supply / 10 ** +icrcMetadata.icrc1_decimals
  const fee = +icrcMetadata.icrc1_fee / 10 ** +icrcMetadata.icrc1_decimals
  console.log(icrcMetadata)

  return (
    <DashboardStyled>
      <ul>
        <li>
          <p className="label">Total Supply</p>
          <p className="value">
            {icrcMetadata.icrc1_symbol === "ckBTC" || icrcMetadata.icrc1_symbol === "ckETH"
              ? "..."
              : formatNumber(totalSupply)}
          </p>
        </li>

        <li>
          <p className="label">Name</p>
          <p className="value">{icrcMetadata.icrc1_name}</p>
        </li>

        <li>
          <p className="label">Symbol</p>
          <p className="value">{icrcMetadata.icrc1_symbol}</p>
        </li>

        <li>
          <p className="label">Decimals</p>
          <p className="value">{icrcMetadata.icrc1_decimals}</p>
        </li>

        <li>
          <p className="label">Fee</p>
          <p className="value">{trimZeroes(fee.toFixed(8))}</p>
        </li>
      </ul>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  margin: 2rem 0;

  > ul {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 0.5rem;

    > li {
      flex: 1;
      background-color: var(--underlay1);
      padding: 1rem;

      > p.label {
        color: var(--tertiaryColor);
        font-size: var(--fsText);
      }

      > p.value {
        font-size: var(--fs3);
      }
    }
  }
`

export default Dashboard
