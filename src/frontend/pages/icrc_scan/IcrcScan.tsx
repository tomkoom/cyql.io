import React, { FC } from "react"
import styled from "styled-components"
import { Pagination, Table } from "./_index"

const IcrcScan: FC = (): JSX.Element => {
  return (
    <IcrcScanStyled>
      <div>
        <h2 className="pageTitle">ICRC Scan</h2>

        <div>
          <Pagination />
          <Table />
          <Pagination />
        </div>
      </div>
    </IcrcScanStyled>
  )
}

const IcrcScanStyled = styled.div`
  font-size: var(--fs7);
`

export default IcrcScan
