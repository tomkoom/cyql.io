import React, { FC, useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { UploadBtn, ImgCrop } from "./_index"
import { ReactCropperElement } from "react-cropper"
import { CompressedFile } from "@/state/_types/types"
import { dataUrlToBlob } from "@/utils/process_img/_index"
import { formatBytes } from "@/utils/formatBytes"
import { Btn } from "@/components/btns/_index"
import Compressor from "compressorjs"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectProject,
  setProjectLogoDataUrl,
  selectProjectModalMode,
} from "@/state/modals/projectModal"

const Logo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [logo, setLogo] = useState<File>(null)
  const [logoObjectUrl, setLogoObjectUrl] = useState<string>("")
  const [logoDataUrl, setLogoDataUrl] = useState<string>(null)
  // const [logoBlob, setLogoBlob] = useState<Blob>(null)
  const [compressedFile, setCompressedFile] = useState<CompressedFile>(null)
  // ...
  const mode = useAppSelector(selectProjectModalMode)
  const project = useAppSelector(selectProject)
  const projectLogo = project.logoDataUrl
  const cropperRef = useRef<ReactCropperElement>(null)
  console.log(projectLogo)

  // compress image after crop
  const crop = async (logoDataUrl: string) => {
    const logoBlob = dataUrlToBlob(logoDataUrl)
    console.log(logoBlob.type)

    const options = {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.7, // not recommended to go below 0.6-0.8
    }

    new Compressor(logoBlob, {
      ...options,
      success: (compressedResult: Blob) => {
        // const type = compressedResult.type
        const file = {
          url: URL.createObjectURL(compressedResult),
          name: compressedResult.name,
          size: compressedResult.size,
          // type
          blob: compressedResult,
        }
        setCompressedFile(file)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  // create object url
  useEffect(() => {
    if (mode === "add") {
      if (logo) {
        const logoObjUrl = URL.createObjectURL(logo)
        setLogoObjectUrl(logoObjUrl)

        const sizeInitial = formatBytes(logo.size)
        console.log("size initial: ", sizeInitial)
      } else {
        // reset cropper
        if (cropperRef) {
          const cropper = cropperRef.current?.cropper
          cropper?.clear()
        }

        setLogoObjectUrl("")
        setLogoDataUrl(null)
        setCompressedFile(null)
        dispatch(setProjectLogoDataUrl(""))
      }
    }
  }, [logo])

  // set project logo data url to state
  useEffect(() => {
    if (compressedFile) {
      const sizeCompressed = formatBytes(compressedFile.size)
      console.log("size compressed: ", sizeCompressed)
      console.log("blob type: ", compressedFile.blob.type)

      // blob to data url
      const reader = new FileReader()
      reader.onload = function (e) {
        const proccessedDataUrl = e.target.result as string
        dispatch(setProjectLogoDataUrl(proccessedDataUrl))
      }
      reader.readAsDataURL(compressedFile.blob)
    }
  }, [compressedFile])

  return (
    <LogoStyled>
      <div>
        <p>Choose logo</p>
        <UploadBtn logo={logo} setLogo={setLogo} />
      </div>

      {logoObjectUrl && (
        <div className="crop">
          <p>Crop</p>
          <ImgCrop
            logo={logo}
            setLogoDataUrl={setLogoDataUrl}
            logoObjectUrl={logoObjectUrl}
            cropperRef={cropperRef}
          />
          <Btn btnType={"secondary"} text={"Crop"} onClick={() => crop(logoDataUrl)} />
        </div>
      )}

      {projectLogo && (
        <div className="preview">
          <p>Logo preview</p>
          <img className="logo" src={projectLogo} alt={`${project.name}-logo`} />
        </div>
      )}
    </LogoStyled>
  )
}

const LogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    p {
      margin-bottom: 0.5rem;
    }
  }

  > div.preview {
    > img {
      max-width: 200px;
      border-radius: 50%;
    }
  }
`

export default Logo
