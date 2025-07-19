import { iPlus, iTimes } from "@/components/icons/Icons"
import { useLogoUploader } from "@/hooks/assets/useLogoUploader"
import React, { ChangeEvent, useRef, useState } from "react"

const Test: React.FC = () => {
  const { uploadLogo } = useLogoUploader()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string>("")
  const [error, setError] = useState<string>("")

  const clickInput = (): void => {
    fileInputRef.current?.click()
  }

  const resetFile = (): void => {
    setSelectedFile(null)
    setUploadedUrl("")
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setUploadedUrl("")
      setError("")
    }
  }

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return

    setUploading(true)
    setError("")

    try {
      // Generate a unique logo ID for testing with _test-timestamp format
      const logoId = `_test-${Date.now()}`
      const url = await uploadLogo(selectedFile, logoId)
      setUploadedUrl(url)
      console.log("Upload successful:", url)
    } catch (err: any) {
      console.error("Upload failed:", err)
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "var(--primaryColor)" }}>Assets Canister Upload Test</h1>

      <div
        style={{
          border: "1px solid var(--border)",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "var(--card)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "var(--primaryColor)" }}>Upload Image to Assets Canister</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* File Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={clickInput}
              disabled={uploading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 15px",
                backgroundColor: "var(--underlay2)",
                border: "none",
                borderRadius: "4px",
                color: "var(--primaryColor)",
                fontSize: "var(--fsText)",
                fontWeight: "var(--fwMedium)",
                cursor: uploading ? "not-allowed" : "pointer",
                transition: "var(--transition1)",
                opacity: uploading ? 0.6 : 1,
              }}
              onMouseOver={(e) => !uploading && (e.currentTarget.style.backgroundColor = "var(--underlay3)")}
              onMouseOut={(e) => !uploading && (e.currentTarget.style.backgroundColor = "var(--underlay2)")}
            >
              <span style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>{iPlus}</span>
              Choose Image
            </button>

            {!selectedFile && <p style={{ fontSize: "var(--fsText)", color: "var(--secondaryColor)", margin: 0 }}>No image chosen (PNG, JPEG, JPG, GIF)</p>}

            <input type="file" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={onFileChange} ref={fileInputRef} style={{ display: "none" }} />
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontSize: "var(--fsText)", color: "var(--primaryColor)", margin: 0 }}>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
              <button
                onClick={resetFile}
                disabled={uploading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "5px 10px",
                  backgroundColor: "var(--underlay2)",
                  border: "none",
                  borderRadius: "4px",
                  color: "var(--primaryColor)",
                  fontSize: "var(--fs7)",
                  cursor: uploading ? "not-allowed" : "pointer",
                  transition: "var(--transition1)",
                  opacity: uploading ? 0.6 : 1,
                }}
                onMouseOver={(e) => !uploading && (e.currentTarget.style.backgroundColor = "var(--underlay3)")}
                onMouseOut={(e) => !uploading && (e.currentTarget.style.backgroundColor = "var(--underlay2)")}
              >
                <span style={{ width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{iTimes}</span>
                Reset
              </button>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && (
            <div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  padding: "12px 20px",
                  backgroundColor: uploading ? "var(--muted)" : "var(--accent)",
                  color: uploading ? "var(--muted-foreground)" : "var(--accent-foreground)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "var(--fsText)",
                  fontWeight: "var(--fwMedium)",
                  cursor: uploading ? "not-allowed" : "pointer",
                  transition: "var(--transition1)",
                }}
              >
                {uploading ? "Uploading to Assets Canister..." : "Upload to Assets Canister"}
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "rgba(250, 77, 86, 0.1)",
                border: "1px solid var(--colorErr)",
                borderRadius: "4px",
              }}
            >
              <p style={{ color: "var(--colorErr)", fontSize: "var(--fsText)", margin: 0 }}>❌ Error: {error}</p>
            </div>
          )}

          {/* Success Display */}
          {uploadedUrl && (
            <div
              style={{
                padding: "15px",
                backgroundColor: "rgba(100, 221, 23, 0.1)",
                border: "1px solid var(--colorOk)",
                borderRadius: "4px",
              }}
            >
              <p style={{ color: "var(--colorOk)", fontSize: "var(--fsText)", margin: "0 0 10px 0" }}>✅ Upload successful!</p>
              <p style={{ color: "var(--primaryColor)", fontSize: "var(--fs7)", margin: "0 0 10px 0", wordBreak: "break-all" }}>
                URL:{" "}
                <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--highlight1)", textDecoration: "underline" }}>
                  {uploadedUrl}
                </a>
              </p>
              <img
                src={uploadedUrl}
                alt="Uploaded logo"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                }}
                onError={(e) => {
                  console.error("Image failed to load:", uploadedUrl)
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "var(--fs7)", color: "var(--secondaryColor)" }}>
        <p>This test uploads images directly to the assets canister on mainnet. The uploaded files will be accessible via the returned URL.</p>
      </div>
    </div>
  )
}

export default Test
