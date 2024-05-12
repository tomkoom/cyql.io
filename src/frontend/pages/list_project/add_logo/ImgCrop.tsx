import React, { FC, useEffect, useRef, MutableRefObject } from "react"
import styled from "styled-components"
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"
import { CompressedFile } from "@/state/_types/types"
import { Dimensions } from "react-image-size"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setListProjectLogo } from "@/state/projectProposal"

interface ImgCropProps {
  compressedFile: CompressedFile
  logoDimensions: Dimensions
  cropperRef: MutableRefObject<ReactCropperElement>
}

const ImgCrop: FC<ImgCropProps> = ({ compressedFile, logoDimensions, cropperRef }) => {
  const dispatch = useAppDispatch()

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    const url = cropper.getCroppedCanvas().toDataURL()
    // console.log(url)
    dispatch(setListProjectLogo(url))
  }

  if (!compressedFile) return null
  if (!logoDimensions) return null
  if (!cropperRef) return null

  return (
    <ImgCropStyled>
      <Cropper
        src={compressedFile.url}
        // style={{ height: 400, width: "100%" }}
        style={{ height: logoDimensions.height, width: logoDimensions.width }}
        // Cropper.js options
        autoCrop={true}
        autoCropArea={1}
        minContainerWidth={400}
        minCropBoxHeight={400}
        viewMode={1}
        highlight={true}
        // image
        zoomable={false}
        rotatable={false}
        scalable={false}
        movable={false}
        // ...
        // guides={false}
        aspectRatio={1 / 1}
        initialAspectRatio={1 / 1}
        crop={onCrop}
        ref={cropperRef}
      />
    </ImgCropStyled>
  )
}

const ImgCropStyled = styled.div`
  > img {
    max-width: 400px;
  }
`

export default ImgCrop
