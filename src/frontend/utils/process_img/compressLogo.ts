import Compressor from "compressorjs"
import { CompressedFile } from "@/state/_types/types"
import { Dimensions } from "react-image-size"

const getIsPortrait = (dimensions: Dimensions) => {
  return dimensions.height > dimensions.width
}

const blobToDataUrl = (blob: Blob): string => {
  const reader = new FileReader()
  let dataUrl = ""

  reader.onload = (e) => {
    const url = e.target.result
    console.log(url)
    dataUrl = url as string
  }
  reader.readAsDataURL(blob)
  return dataUrl
}

export const compressLogo = (
  file: File,
  fileDimension: Dimensions,
  setFile: (file: CompressedFile) => void
): void => {
  const quality = 0.7
  let options = {}

  const isPortrait = getIsPortrait(fileDimension)

  if (isPortrait && fileDimension.width < 400) {
    options = {
      minWidth: 400,
      quality,
    }
  } else if (isPortrait && fileDimension.width >= 400) {
    options = {
      maxWidth: 400,
      quality,
    }
  } else if (!isPortrait && fileDimension.height < 400) {
    options = {
      minHeight: 400,
      quality,
    }
  } else if (!isPortrait && fileDimension.height >= 400) {
    options = {
      maxHeight: 400,
      quality,
    }
  }

  // const options = {
  //   maxWidth: 400,
  //   maxHeight: 400,
  //   minWidth: 400,
  //   minHeight: 400,
  //   width: 400,
  //   height: 400,
  //   quality: 0.7, // 0.6-0.8 can also be used, but its not recommended to go below
  // }

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
      setFile(file)
    },
    error: (err) => {
      console.log(err)
    },
  })
}

export const compressLogo2 = (file: File): string | void => {
  // loading - true

  const options = {
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.8, // 0.6-0.8 can also be used, but its not recommended to go below
  }

  new Compressor(file, {
    ...options,
    success: (compressedResult: Blob) => {
      // create obj url from blob
      //   const url = URL.createObjectURL(compressedResult)
      //   const name = compressedResult.name
      //   const size = compressedResult.size
      //   const file = {
      //     url,
      //     name,
      //     size,
      //   }
      const dataUrl = blobToDataUrl(compressedResult)
      return dataUrl
    },
    error: (err) => {
      console.log(err)
      // loading - false
    },
  })
}
