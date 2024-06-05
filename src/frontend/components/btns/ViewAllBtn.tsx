import React, { FC } from "react"
import { Btn } from "@/components/btns/_index"

interface ViewAllBtnProps {
  route: () => void
  text?: string
}

const ViewAllBtn: FC<ViewAllBtnProps> = ({ route, text = "View All" }): JSX.Element => {
  return <Btn btnType={"secondary"} text={text} onClick={route} />
}

export default ViewAllBtn
