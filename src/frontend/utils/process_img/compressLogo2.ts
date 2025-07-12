import { CompressedFile } from "@/state/types/types"
import Compressor from "compressorjs"

export const compressLogo2 = (file: Blob, setCompressedFile: (file: CompressedFile) => void): void => {
  const options = {
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.6, // 0.6-0.8 can also be used, but its not recommended to go below
  }

  new Compressor(file, {
    ...options,
    success: (compressedResult: Blob) => {
      const url = URL.createObjectURL(compressedResult)
      const name = compressedResult.name
      const size = compressedResult.size
      const file = {
        url,
        name,
        size,
        blob: compressedResult,
      }
      setCompressedFile(file)
    },
    error: (err) => {
      console.log(err)
    },
  })
}
