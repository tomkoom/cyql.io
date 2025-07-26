import { PRICE_URL } from "@/constants/constants"
import { useQuery } from "@tanstack/react-query"

interface CoinGeckoResponse {
  "internet-computer": {
    usd: number
    usd_24h_change: number
  }
}

interface IcpPriceData {
  price: string
  change24h: string
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to fetch ICP price and 24h change from CoinGecko
 * Refetches every 60 seconds automatically
 */
export const useIcpPriceQuery = (): IcpPriceData => {
  const { data, isLoading, error } = useQuery<CoinGeckoResponse>({
    queryKey: ["icp-price"],
    queryFn: async () => {
      const response = await fetch(PRICE_URL)
      if (!response.ok) {
        throw new Error(`Failed to fetch price: ${response.statusText}`)
      }
      return response.json()
    },
    refetchInterval: 60 * 1000, // Refetch every 60 seconds
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  return {
    price: data?.["internet-computer"]?.usd?.toFixed(2) || "0.00",
    change24h: data?.["internet-computer"]?.usd_24h_change ? parseFloat(data["internet-computer"].usd_24h_change.toFixed(2)).toString() : "0",
    isLoading,
    error: error as Error | null,
  }
}
