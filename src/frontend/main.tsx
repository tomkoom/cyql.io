import { FC, StrictMode } from "react"
import { createRoot } from "react-dom/client"
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

const Index: FC = (): JSX.Element => {
  return (
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  )
}
