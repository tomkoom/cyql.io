import type { IcrcMetadata } from "@/hooks/useIcrcScan"
import { formatNumber, trimZeroes } from "@/utils/index"
import { FC } from "react"
import styled from "styled-components"

interface DashboardProps {
  icrcMetadata: IcrcMetadata
}

const Dashboard: FC<DashboardProps> = ({ icrcMetadata }): JSX.Element => {
  const totalSupply = +icrcMetadata?.icrc1_total_supply / 10 ** +icrcMetadata?.icrc1_decimals
  const fee = +icrcMetadata?.icrc1_fee / 10 ** +icrcMetadata?.icrc1_decimals

  return (
    <DashboardStyled>
      <ul>
        <li>
          <p className="label">Total Supply</p>
          {icrcMetadata?.icrc1_symbol && (
            <p className="value">{icrcMetadata.icrc1_symbol === "ckBTC" || icrcMetadata.icrc1_symbol === "ckETH" ? "..." : formatNumber(totalSupply)}</p>
          )}
        </li>

        <li>
          <p className="label">Name</p>
          {icrcMetadata?.icrc1_name && <p className="value">{icrcMetadata.icrc1_name}</p>}
        </li>

        <li>
          <p className="label">Symbol</p>
          {icrcMetadata?.icrc1_symbol && <p className="value">{icrcMetadata.icrc1_symbol}</p>}
        </li>

        <li>
          <p className="label">Decimals</p>
          {icrcMetadata?.icrc1_decimals && <p className="value">{icrcMetadata.icrc1_decimals}</p>}
        </li>

        <li>
          <p className="label">Transaction Fee</p>
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
