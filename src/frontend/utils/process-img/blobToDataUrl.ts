export const blobToDataUrl = (blob: Blob, callback: (result: string) => void) => {
  const reader = new FileReader()
  reader.onload = function (e) {
    callback(e.target.result as string)
  }
  reader.readAsDataURL(blob)
}
