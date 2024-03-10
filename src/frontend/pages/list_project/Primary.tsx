import React, { FC } from "react"
import { Input } from "./_index"
import { primary } from "./_inputs"

const Primary: FC = (): JSX.Element => {
  return (
    <div>
      {primary.map((input) => (
        <Input key={input.id} id={input.id} label={input.label} placeholder={input.placeholder} />
      ))}
    </div>
  )
}

export default Primary
