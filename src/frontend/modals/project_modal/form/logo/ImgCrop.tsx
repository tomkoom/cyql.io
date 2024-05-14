import React, { FC, MutableRefObject, SetStateAction, Dispatch } from "react"
import styled from "styled-components"

// cropper
import Cropper, { ReactCropperElement } from "react-cropper"
import "cropperjs/dist/cropper.css"

interface ImgCropProps {
  logo: File
  setLogoDataUrl: Dispatch<SetStateAction<string>>
  // setLogoBlob: Dispatch<SetStateAction<Blob>>
  logoObjectUrl: string
  cropperRef: MutableRefObject<ReactCropperElement>
}

const ImgCrop: FC<ImgCropProps> = ({
  logo,
  setLogoDataUrl,
  // setLogoBlob,
  logoObjectUrl,
  cropperRef,
}) => {
  const onCrop = (): void => {
    const cropper = cropperRef.current?.cropper
    const url = cropper.getCroppedCanvas().toDataURL(logo.type)
    // const blob = cropper.getCroppedCanvas().toBlob(logo.type)
    setLogoDataUrl(url)
    // setLogoBlob(blob)
  }

  if (!logoObjectUrl) return null
  if (!cropperRef) return null

  return (
    <ImgCropStyled>
      <Cropper
        src={logoObjectUrl}
        style={{ height: 400, width: "100%" }}
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
