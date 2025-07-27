// https://ic-api.internetcomputer.org/api/v3/daily-stats?start=1719292800&end=1721884800&format=json
import { useQuery } from "@tanstack/react-query"

export interface ICDailyStats {
  average_query_transactions_per_second: string
  average_transactions_per_second: string
  average_update_transactions_per_second: string
  blocks_per_second_average: string
  canister_memory_usage_bytes: string
  circulating_supply: string
  ckbtc_total_supply: string
  cketh_total_supply: string
  community_fund_total_maturity: string
  cycle_burn_rate_average: string
  daily_internet_identity_logins: string
  day: string
  estimated_rewards_percentage: {
    "1_year": number
    "2_year": number
    "4_year": number
    "6_year": number
    "8_year": number
  }
  governance_latest_reward_round_total_available_e8s: string
  governance_neuron_fund_total_maturity_e8s_equivalent: string
  governance_neuron_fund_total_staked_e8s: string
  governance_neurons_total: string
  governance_total_locked_e8s: string
  gross_new_canisters: string
  icp_burned_fees: string
  icp_burned_total: string
  internet_identity_user_count: string
  max_query_transactions_per_second: string
  max_total_transactions_per_second: string
  max_update_transactions_per_second: string
  node_energy_consumption_rate_kwh: string
  proposals_count: string
  registered_canisters_count: string
  timestamp: number
  total_boundary_nodes: string
  total_cycle_burn_till_date: string
  total_cycle_burn_via_burn_api_till_date: string
  total_ic_energy_consumption_rate_kwh: string
  total_node_providers: string | null
  total_nodes: string | null
  total_nodes_in_subnets: string
  total_subnets: string | null
  unique_accounts_per_day: string
}

export interface ICStatsResponse {
  daily_stats: ICDailyStats[]
}

interface UseICStatsQueryOptions {
  days?: number // Number of days to fetch (default: 30)
  enabled?: boolean
}

const fetchICStats = async (days: number): Promise<ICStatsResponse> => {
  const now = Math.floor(Date.now() / 1000)
  const startTime = now - days * 24 * 60 * 60

  const url = `https://ic-api.internetcomputer.org/api/v3/daily-stats?start=${startTime}&end=${now}&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch IC stats: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export const useICStatsQuery = (options: UseICStatsQueryOptions = {}) => {
  const { days = 30, enabled = true } = options

  return useQuery({
    queryKey: ["ic-stats", days],
    queryFn: () => fetchICStats(days),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes (stats update daily)
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Helper hook for specific timeframes
export const useICStatsLast7Days = () => useICStatsQuery({ days: 7 })
export const useICStatsLast30Days = () => useICStatsQuery({ days: 30 })
export const useICStatsLast90Days = () => useICStatsQuery({ days: 90 })
