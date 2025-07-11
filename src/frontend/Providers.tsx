import AuthProvider from "@/context/Auth"
import store from "@/state/_store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import { Provider } from "react-redux"
import { IS_DEV } from "./constants/constants"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 2,
    },
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          {children}
          {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  )
}
