import { Btn } from "@/components/btns"
import { useLogoUploader } from "@/hooks/assets/useLogoUploader"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminGenerateProjectId, setAdminProjectItemString } from "@/state/admin/admin"
import { CompressedFile } from "@/state/types/types"
import { formatBytes } from "@/utils/formatBytes"
import { dataUrlToBlob } from "@/utils/process-img/_index"
import Compressor from "compressorjs"
import { useEffect, useRef, useState } from "react"
import { ReactCropperElement } from "react-cropper"
import styled from "styled-components"
import { Cropper, UploadBtn } from "."

export default function Logo() {
  const dispatch = useAppDispatch()
  const { uploadLogo } = useLogoUploader()

  const [logo, setLogo] = useState<File>(null)
  const [logoObjectUrl, setLogoObjectUrl] = useState<string>("")
  const [logoDataUrl, setLogoDataUrl] = useState<string>(null)
  const [compressedFile, setCompressedFile] = useState<CompressedFile>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")

  const { project, projectId } = useAppSelector(selectAdmin)
  const projectLogoUrl = project.logoUrl
  const cropperRef = useRef<ReactCropperElement>(null)

  // Generate project ID if not exists when a logo is first selected
  useEffect(() => {
    if (logo && !projectId) {
      dispatch(setAdminGenerateProjectId())
    }
  }, [logo, projectId, dispatch])

  const reset = (): void => {
    setLogoObjectUrl("")
    setLogoDataUrl(null)
    setCompressedFile(null)
    setUploadError("")
    dispatch(setAdminProjectItemString({ logoUrl: "" }))
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
        const file = new File([compressedResult], logo.name, {
          type: compressedResult.type,
          lastModified: Date.now(),
        })

        setCompressedFile({
          url: URL.createObjectURL(compressedResult),
          size: compressedResult.size,
          blob: compressedResult,
          file: file,
        })
      },
      error: (err) => {
        console.log(err)
        setUploadError("Failed to compress image")
      },
    })
  }

  // Upload compressed file to assets canister
  const uploadToAssetsCanister = async () => {
    if (!compressedFile?.file || !projectId) return

    setIsUploading(true)
    setUploadError("")

    try {
      // Use the project ID as the logo ID for consistency
      const logoUrl = await uploadLogo(compressedFile.file, projectId)

      // Update project state with the logo URL
      dispatch(setAdminProjectItemString({ logoUrl }))

      console.log("Logo uploaded successfully:", logoUrl)
    } catch (error: any) {
      console.error("Upload failed:", error)
      setUploadError(error.message || "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  // create object url
  useEffect(() => {
    if (!projectLogoUrl) {
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
  }, [projectLogoUrl, logo])

  return (
    <LogoStyled>
      <div>
        <h5 style={{ marginBottom: "0.5rem" }}>Logo</h5>
        <UploadBtn logo={logo} setLogo={setLogo} reset={reset} />
        {projectId && <p style={{ fontSize: "0.75rem", color: "var(--secondaryColor)" }}>Project ID: {projectId}</p>}
      </div>

      {logoObjectUrl && (
        <div className="crop">
          <p>Crop</p>
          <Cropper logo={logo} setLogoDataUrl={setLogoDataUrl} logoObjectUrl={logoObjectUrl} cropperRef={cropperRef} />
          <Btn btnType={"secondary"} text={"Crop"} onClick={() => crop(logoDataUrl)} />
        </div>
      )}

      {compressedFile && !projectLogoUrl && (
        <div className="compressed">
          <p>Compressed preview ({formatBytes(compressedFile.size)})</p>
          <img className="logo" src={compressedFile.url} alt="compressed-logo" />
          <Btn
            btnType={"primary"}
            text={isUploading ? "Uploading..." : "Upload to Assets Canister"}
            onClick={uploadToAssetsCanister}
            disabled={isUploading || !projectId}
          />
          {uploadError && <p style={{ color: "var(--colorErr)", fontSize: "0.875rem" }}>Error: {uploadError}</p>}
          {!projectId && <p style={{ color: "var(--colorWarn)", fontSize: "0.875rem" }}>Project ID will be generated automatically</p>}
        </div>
      )}

      {projectLogoUrl && (
        <div className="preview">
          <p>Logo uploaded successfully!</p>
          <img className="logo" src={projectLogoUrl} alt={`${project.name}-logo`} />
          <p style={{ fontSize: "0.75rem", color: "var(--secondaryColor)", wordBreak: "break-all" }}>URL: {projectLogoUrl}</p>
          <Btn btnType={"secondary"} text={"Change Logo"} onClick={reset} />
        </div>
      )}
    </LogoStyled>
  )
}

const LogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div.compressed,
  > div.preview {
    > img {
      max-width: 200px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
  }
`
