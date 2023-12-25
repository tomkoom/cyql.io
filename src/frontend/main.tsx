import React, { FC } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import AuthProvider from "@/context/Auth"

// state
import { Provider } from "react-redux"
import store from "@/state/_store"

const Index: FC = (): JSX.Element => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  )
}

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<Index />)
