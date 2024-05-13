import React, { FC, useEffect, useRef, MutableRefObject } from "react"
import styled from "styled-components"
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"
import { CompressedFile } from "@/state/_types/types"
import { Dimensions } from "react-image-size"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setListProjectLogoDataUrl } from "@/state/listProject"

interface ImgCropProps {
  isLogoCompressLoading: boolean
  compressedFile: CompressedFile
  logoDimensions: Dimensions
  cropperRef: MutableRefObject<ReactCropperElement>
}

const ImgCrop: FC<ImgCropProps> = ({
  isLogoCompressLoading,
  compressedFile,
  logoDimensions,
  cropperRef,
}) => {
  const dispatch = useAppDispatch()

  const onCrop = (): void => {
    const cropper = cropperRef.current?.cropper
    const url = cropper.getCroppedCanvas().toDataURL()
    dispatch(setListProjectLogoDataUrl(url))
  }

  if (isLogoCompressLoading) return <p>Loading...</p>
  if (!compressedFile) return null
  if (!logoDimensions) return null
  if (!cropperRef) return null

  return (
    <ImgCropStyled>
      <Cropper
        src={compressedFile.url}
        // style={{ height: 400, width: "100%" }}
        style={{ height: logoDimensions.height, width: "100%" }}
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

const ImgCropStyled = styled.div``

export default ImgCrop
