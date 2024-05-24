import React, { FC } from "react"
import { Btn } from "@/components/btns/_index"

interface ViewAllBtnProps {
  route: () => void
}

const ViewAllBtn: FC<ViewAllBtnProps> = ({ route }): JSX.Element => {
  return <Btn btnType={"secondary"} text={"View All"} onClick={route} />
}

export default ViewAllBtn
