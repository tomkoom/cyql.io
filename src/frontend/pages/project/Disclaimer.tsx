import React, { FC } from "react"
import { ExpandableText } from "@/components/ui/_index"

const Disclaimer: FC = (): JSX.Element => {
  const text =
    "The information presented on this site has been provided by third parties and is made available solely for general information purposes. cyql.io does not warrant the accuracy of given information. The information should not be construed as professional or financial advice of any kind."

  return <ExpandableText text={text} />
}

export default Disclaimer
