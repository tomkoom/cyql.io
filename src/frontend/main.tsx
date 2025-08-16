import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Analytics from "./Analytics"
import App from "./App"
import Providers from "./Providers"

let container = null

document.addEventListener("DOMContentLoaded", function () {
  if (!container) {
    const container = document.getElementById("root") as HTMLElement
    const root = createRoot(container!)
    root.render(<Index />)
  }
})

const Index = () => {
  return (
    <StrictMode>
      <Providers>
        <Analytics />
        <App />
      </Providers>
    </StrictMode>
  )
}
