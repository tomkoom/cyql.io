import React, { FC, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { getImageSize, Dimensions } from "react-image-size"
import { blobToDataUrl } from "@/utils/process_img/_index"
import { CompressedFile } from "@/state/_types/types"
// import { formatBytes } from "@/utils/formatBytes"
import { ImgCrop, FileBtn } from "./_index"
import { ReactCropperElement } from "react-cropper"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectListProject } from "@/state/listProject"
import {
  setListProjectLogoDataUrl,
  selectListProjectIsLogoCompressLoading,
} from "@/state/listProject"

const AddLogo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [logo, setLogo] = useState<File>(null)
  const [logoDataUrl, setLogoDataUrl] = useState<string>(null)
  const [compressedFile, setCompressedFile] = useState<CompressedFile>(null)
  const [logoDimensions, setLogoDimensions] = useState<Dimensions>()
  const project = useAppSelector(selectListProject)
  const projectLogo = project.logo_data_url
  const isLogoCompressLoading = useAppSelector(selectListProjectIsLogoCompressLoading)
  const cropperRef = useRef<ReactCropperElement>(null)

  const setDimensions = async (fileUrl: string): Promise<void> => {
    try {
      const dimensions = await getImageSize(fileUrl)
      setLogoDimensions(dimensions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (logo) {
      // const sizeInitial = formatBytes(logo.size)
      // console.log("size initial:", sizeInitial)

      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoDataUrl(reader.result as string)
      }
      reader.readAsDataURL(logo)
    } else {
      // reset cropper
      if (cropperRef) {
        const cropper = cropperRef.current?.cropper
        cropper?.clear()
      }

      setLogoDataUrl(null)
      setCompressedFile(null)
      setLogoDimensions(null)
      dispatch(setListProjectLogoDataUrl(""))
    }
  }, [logo])

  useEffect(() => {
    if (compressedFile && compressedFile.blob) {
      // const sizeCompressed = formatBytes(compressedFile.size)
      // console.log("size compressed:", sizeCompressed)

      blobToDataUrl(compressedFile.blob, setLogoDataUrl)
      setDimensions(compressedFile.url)
    }
  }, [compressedFile])

  return (
    <AddLogoStyled>
      {/* <p>Logo will be cropped to 400x400 pixels</p> */}
      <FileBtn
        logo={logo}
        compressedFile={compressedFile}
        setLogo={setLogo}
        setCompressedFile={setCompressedFile}
      />

      <div className="input">
        {compressedFile && (
          <div className="crop">
            <p>Crop</p>
            <ImgCrop
              isLogoCompressLoading={isLogoCompressLoading}
              compressedFile={compressedFile}
              logoDimensions={logoDimensions}
              cropperRef={cropperRef}
            />
          </div>
        )}

        {projectLogo && (
          <div>
            <p>Logo preview</p>
            <img className="logo" src={projectLogo} alt={`${project.name}-logo`} />
          </div>
        )}
      </div>
    </AddLogoStyled>
  )
}

const AddLogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > div.input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-wrap: wrap;

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: var(--fsText);

      > img.logo {
        width: 100%;
        max-width: 200px;
        border-radius: 50%;
      }
    }
  }
`

export default AddLogo
