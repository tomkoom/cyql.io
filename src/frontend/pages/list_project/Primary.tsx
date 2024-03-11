import React, { FC } from "react"
import { Input } from "./_index"
import { primary } from "./_inputs"

const Primary: FC = (): JSX.Element => {
  return (
    <div>
      {primary.map((input) => (
        <Input key={input.id} input={input} />
      ))}
    </div>
  )
}

export default Primary
