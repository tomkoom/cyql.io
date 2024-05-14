import React, { FC, Dispatch, SetStateAction, ChangeEvent, useRef } from "react"
import styled from "styled-components"
import { compressLogo } from "@/utils/process_img/_index"
import { CompressedFile } from "@/state/_types/types"
import { getImageSize } from "react-image-size"
import { iPlus, iTimes } from "@/components/icons/Icons"

interface FileBtnProps {
  logo: File
  setLogo: Dispatch<SetStateAction<File>>
}

const FileBtn: FC<FileBtnProps> = ({ logo, setLogo }): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>()

  const clickInput = (): void => {
    fileInputRef.current.click()
  }

  const resetLogo = (): void => {
    setLogo(null)
  }

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files && e.target.files[0]) {
      const logo = e.target.files[0]
      setLogo(logo)
    }
  }

  return (
    <FileBtnStyled>
      {!logo ? (
        <div>
          <button onClick={clickInput}>{iPlus} Choose Image</button>
          <p>No image chosen</p>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/png, image/jpeg"
            onChange={(e) => onImageChange(e)}
            ref={fileInputRef}
          />
        </div>
      ) : (
        <div>
          <p>{logo.name}</p>
          <button onClick={resetLogo}>{iTimes} Reset Image</button>
        </div>
      )}
    </FileBtnStyled>
  )
}

const FileBtnStyled = styled.div`
  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    > button {
      padding: 0.7rem;
      background-color: var(--underlay2);
      transition: var(--transition1);
      font-size: var(--fsText);
      font-weight: var(--fwMedium);

      &:hover {
        background-color: var(--underlay3);
      }
    }

    > p {
      font-size: var(--fsText);
      color: var(--secondaryColor);
    }

    > input#logo {
      display: none;
    }
  }
`

export default FileBtn
