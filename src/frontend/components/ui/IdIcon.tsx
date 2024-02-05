import React, { FC, useMemo } from "react"
import styled from "styled-components"
import { minidenticon } from "minidenticons"

interface MinidenticonImgProps {
  userId: string
}

const MinidenticonImg: FC<MinidenticonImgProps> = ({ userId }): JSX.Element => {
  const svgURI = useMemo(
    () => "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(userId)),
    [userId]
  )
  return <Img src={svgURI} alt={"identicon"} />
}

const Img = styled.img`
  background-color: var(--background);
  height: 2rem;
  width: 2rem;
`

export default MinidenticonImg
