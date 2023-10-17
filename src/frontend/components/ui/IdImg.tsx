import React, { FC } from "react"
import { toSvg } from "jdenticon"
import { useAuth } from "@/context/Auth"
import { formatId } from "@/utils/format"

interface IdImgProps {
  sizePx: string
}

const IdImg: FC<IdImgProps> = ({ sizePx }): JSX.Element => {
  const { userId } = useAuth()
  const svgString = toSvg(userId, 100)

  const style = {
    borderRadius: "50%",
    height: `${sizePx}px`,
    width: `${sizePx}px`,
  }

  return (
    <img
      style={style}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
      alt={`${formatId(userId)} user image`}
    />
  )
}

export default IdImg
