import React, { FC } from "react"
import { Input } from "../_index"
import { token } from "../_inputs"
import { Standard } from "./_index"

const Token: FC = (): JSX.Element => {
  return (
    <div>
      <Input input={token[0]} />
      <Standard />
    </div>
  )
}

export default Token
