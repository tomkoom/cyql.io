import { iPlus, iTimes } from "@/components/icons/Icons"
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef } from "react"
import styled from "styled-components"

interface FileBtnProps {
  logo: File
  setLogo: Dispatch<SetStateAction<File>>
  reset: () => void
}

const FileBtn: FC<FileBtnProps> = ({ logo, setLogo, reset }): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>()

  const clickInput = (): void => {
    fileInputRef.current.click()
  }

  const resetLogo = (): void => {
    setLogo(null)
    reset()
  }

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files && e.target.files[0]) {
      const logo = e.target.files[0]
      setLogo(logo)
    }
  }

  return (
    <FileBtnStyled>
      <div>
        <button onClick={clickInput}>
          <span>{iPlus}</span> Choose Image
        </button>

        <p>No image chosen</p>

        <input type="file" id="logo" name="logo" accept="image/png, image/jpeg" onChange={(e) => onImageChange(e)} ref={fileInputRef} />
      </div>

      <div>
        {logo?.name && <p>{logo.name}</p>}
        <button onClick={resetLogo}>
          <span>{iTimes}</span> Reset Image
        </button>
      </div>
    </FileBtnStyled>
  )
}

const FileBtnStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    > button {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      padding: 0.7rem;
      background-color: var(--underlay2);
      transition: var(--transition1);
      font-size: var(--fsText);
      font-weight: var(--fwMedium);

      &:hover {
        background-color: var(--underlay3);
      }

      > span {
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
