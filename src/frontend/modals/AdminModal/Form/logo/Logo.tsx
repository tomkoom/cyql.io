import { Btn } from "@/components/btns"
import { CompressedFile } from "@/state/types/types"
import { formatBytes } from "@/utils/formatBytes"
import { dataUrlToBlob } from "@/utils/process_img/_index"
import Compressor from "compressorjs"
import React, { FC, useEffect, useRef, useState } from "react"
import { ReactCropperElement } from "react-cropper"
import styled from "styled-components"
import { Cropper, UploadBtn } from "./_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemString } from "@/state/admin/admin"

const logoDataUrlkey = "logoDataUrl"

const Logo: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [logo, setLogo] = useState<File>(null)
  const [logoObjectUrl, setLogoObjectUrl] = useState<string>("")
  const [logoDataUrl, setLogoDataUrl] = useState<string>(null)
  // const [logoBlob, setLogoBlob] = useState<Blob>(null)
  const [compressedFile, setCompressedFile] = useState<CompressedFile>(null)
  // ...
  const project = useAppSelector(selectAdmin).project
  const projectLogoDataUrl = project.logoDataUrl
  const cropperRef = useRef<ReactCropperElement>(null)

  const reset = (): void => {
    setLogoObjectUrl("")
    setLogoDataUrl(null)
    setCompressedFile(null)
    dispatch(setAdminProjectItemString({ [logoDataUrlkey]: "" }))
  }

  // compress image after crop
  const crop = async (logoDataUrl: string) => {
    const logoBlob = dataUrlToBlob(logoDataUrl)
    console.log("type initial: ", logoBlob.type)

    const options = {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.7, // not recommended to go below 0.6-0.8
    }

    new Compressor(logoBlob, {
      ...options,
      success: (compressedResult: Blob) => {
        const file = {
          url: URL.createObjectURL(compressedResult),
          name: compressedResult.name,
          size: compressedResult.size,
          // type: compressedResult.type
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
    if (!projectLogoDataUrl) {
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

        reset()
      }
    }
  }, [projectLogoDataUrl, logo])

  // set project logo data url to state
  useEffect(() => {
    if (compressedFile) {
      const sizeCompressed = formatBytes(compressedFile.size)
      console.log("size compressed: ", sizeCompressed)
      console.log("type compressed: ", compressedFile.blob.type)

      // blob to data url
      const reader = new FileReader()
      reader.onload = function (e) {
        const proccessedDataUrl = e.target.result as string
        dispatch(setAdminProjectItemString({ [logoDataUrlkey]: proccessedDataUrl }))
      }
      reader.readAsDataURL(compressedFile.blob)
    }
  }, [compressedFile])

  return (
    <LogoStyled>
      <div>
        <h5 style={{ marginBottom: "0.5rem" }}>Logo</h5>
        <UploadBtn logo={logo} setLogo={setLogo} reset={reset} />
      </div>

      {logoObjectUrl && (
        <div className="crop">
          <p>Crop</p>
          <Cropper logo={logo} setLogoDataUrl={setLogoDataUrl} logoObjectUrl={logoObjectUrl} cropperRef={cropperRef} />
          <Btn btnType={"secondary"} text={"Crop"} onClick={() => crop(logoDataUrl)} />
        </div>
      )}

      {projectLogoDataUrl && (
        <div className="preview">
          <p>Logo preview</p>
          <img className="logo" src={projectLogoDataUrl} alt={`${project.name}-logo`} />
        </div>
      )}
    </LogoStyled>
  )
}

const LogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div.preview {
    > img {
      max-width: 200px;
      border-radius: 50%;
    }
  }
`

export default Logo
