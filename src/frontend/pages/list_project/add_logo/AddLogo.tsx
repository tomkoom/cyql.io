import React, { FC, useState, ChangeEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import { getImageSize, Dimensions } from "react-image-size"
import { compressLogo, blobToDataUrl } from "@/utils/process_img/_index"
import { CompressedFile } from "@/state/_types/types"
import { formatBytes } from "@/utils/formatBytes"
import { ImgCrop } from "./_index"
import { ReactCropperElement } from "react-cropper"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectListProject } from "@/state/projectProposal"
import { setListProjectLogo } from "@/state/projectProposal"

const AddLogo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  // cropper
  const cropperRef = useRef<ReactCropperElement>(null)

  // ...
  const [logo, setLogo] = useState<File>(null)
  const [logoDataUrl, setLogoDataUrl] = useState<string>(null)
  const [compressedFile, setCompressedFile] = useState<CompressedFile>(null)
  const [logoDimensions, setLogoDimensions] = useState<Dimensions>()
  const project = useAppSelector(selectListProject)
  const projectLogo = project.logo

  const resetLogo = () => {
    setLogo(null)
  }

  const setDimensions = async (fileUrl: string) => {
    try {
      const dimensions = await getImageSize(fileUrl)
      setLogoDimensions(dimensions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (logo) {
      // ...
      const sizeInitial = formatBytes(logo.size)
      console.log("size initial:", sizeInitial)

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
      dispatch(setListProjectLogo(""))
    }
  }, [logo])

  useEffect(() => {
    if (compressedFile && compressedFile.blob) {
      const sizeCompressed = formatBytes(compressedFile.size)
      console.log("size compressed:", sizeCompressed)
      blobToDataUrl(compressedFile.blob, setLogoDataUrl)
      setDimensions(compressedFile.url)
    }
  }, [compressedFile])

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const logo = e.target.files[0]
      setLogo(logo)

      try {
        const logoObjectUrl = URL.createObjectURL(logo)
        const dimensions = await getImageSize(logoObjectUrl)
        compressLogo(logo, dimensions, setCompressedFile)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <AddLogoStyled>
      <p>Logo will be cropped to 400x400 pixels</p>

      <div>
        {!logo ? (
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/png, image/jpeg"
            onChange={(e) => onImageChange(e)}
          />
        ) : (
          <div>
            <p>{logo.name}</p>
            <button onClick={resetLogo}>Reset</button>
            {/* <CrossIcon onClick={resetLogo} /> */}
          </div>
        )}
      </div>

      <div className="input">
        {compressedFile && (
          <div className="crop">
            <p>Crop</p>
            <ImgCrop
              compressedFile={compressedFile}
              logoDimensions={logoDimensions}
              cropperRef={cropperRef}
            />
            {logoDimensions && (
              <p className="hint">
                {logoDimensions.width}x{logoDimensions.height}px
              </p>
            )}
          </div>
        )}

        {projectLogo && (
          <div>
            <p>Preview</p>
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
  gap: 1rem;

  > div.input {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &.crop {
        > p.hint {
          font-size: var(--fs7);
          color: var(--tertiaryColor);
        }
      }

      > img.logo {
        width: 100%;
        max-width: 200px;
      }
    }
  }
`

export default AddLogo
