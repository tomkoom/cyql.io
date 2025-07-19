import { useAuth } from "@/context/Auth"

export const useLogoUploader = () => {
  const { actor } = useAuth()

  const uploadLogo = async (file: File, logoId: string): Promise<string> => {
    if (!actor) throw new Error("No actor available")

    const arrayBuffer = await file.arrayBuffer()
    const content = Array.from(new Uint8Array(arrayBuffer)) // Convert to [Nat8] format
    const extension = file.name.split(".").pop() || "png"
    const contentType = file.type || "image/png"

    try {
      const key = await actor.upload_logo(`${logoId}.${extension}`, content, contentType)

      const assetsCanisterId = "uodzj-4aaaa-aaaag-auexa-cai"
      const mainnetUrl = `https://${assetsCanisterId}.icp0.io`

      return `${mainnetUrl}${key}` // e.g., https://uodzj-4aaaa-aaaag-auexa-cai.icp0.io/logos/logo123.png
    } catch (error) {
      console.error("Upload failed:", error)
      throw new Error(`Failed to upload logo: ${error.message}`)
    }
  }

  return { uploadLogo }
}
