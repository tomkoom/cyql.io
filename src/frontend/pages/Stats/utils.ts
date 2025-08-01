import { type ICDailyStats } from "@/hooks/queries/useICStatsQuery"

export const formatNumber = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
  return num.toFixed(2)
}

export const formatBytes = (bytes: string): string => {
  const num = parseFloat(bytes)
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"]
  if (num === 0) return "0 B"
  const i = Math.floor(Math.log(num) / Math.log(1024))
  return (num / Math.pow(1024, i)).toFixed(2) + " " + sizes[i]
}

export const formatKwh = (kwh: string): string => {
  const num = parseFloat(kwh)
  if (num >= 1000) return (num / 1000).toFixed(2) + " MW"
  return num.toFixed(2) + " kW"
}

// Calculate average across the period
export const calculateAverage = (stats: ICDailyStats[], field: keyof ICDailyStats): number => {
  const values = stats.map((stat) => parseFloat(stat[field] as string)).filter((val) => !isNaN(val))
  return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0
}

// Calculate sum across the period
export const calculateSum = (stats: ICDailyStats[], field: keyof ICDailyStats): number => {
  const values = stats.map((stat) => parseFloat(stat[field] as string)).filter((val) => !isNaN(val))
  return values.reduce((sum, val) => sum + val, 0)
}

// Calculate max across the period
export const calculateMax = (stats: ICDailyStats[], field: keyof ICDailyStats): number => {
  const values = stats.map((stat) => parseFloat(stat[field] as string)).filter((val) => !isNaN(val))
  return values.length > 0 ? Math.max(...values) : 0
}

// Get latest value
export const getLatest = (stats: ICDailyStats[], field: keyof ICDailyStats): string => {
  return (stats[0]?.[field] as string) || "0"
}

// Convert e8s (smallest unit) to token amount
export const formatE8sToTokens = (e8sValue: string | number | bigint): number => {
  return Number(e8sValue) / 100_000_000
}

// Generate chart data from stats array for a specific field
export const generateChartData = (stats: any[], field: string, limit?: number): number[] => {
  const actualLimit = limit || stats.length // Use all data if no limit specified
  return stats
    .slice(0, actualLimit) // Take last N days
    .reverse() // Reverse to show chronological order
    .map((stat) => Number(stat[field]) || 0)
}

// Generate chart data with e8s conversion
export const generateChartDataE8s = (stats: any[], field: string, limit?: number): number[] => {
  const actualLimit = limit || stats.length // Use all data if no limit specified
  return stats
    .slice(0, actualLimit)
    .reverse()
    .map((stat) => formatE8sToTokens(stat[field]))
}

// Generate chart data with proper labels for meaningful grids
export const generateChartDataWithLabels = (stats: ICDailyStats[], field: string, limit?: number) => {
  const actualLimit = limit || stats.length // Use all data if no limit specified
  const slicedStats = stats.slice(0, actualLimit).reverse() // Chronological order
  return {
    labels: slicedStats.map((stat) => stat.day), // Actual dates like "2024-07-25"
    data: slicedStats.map((stat) => Number(stat[field]) || 0),
  }
}

// Generate chart data with e8s conversion and proper labels
export const generateChartDataE8sWithLabels = (stats: ICDailyStats[], field: string, limit?: number) => {
  const actualLimit = limit || stats.length // Use all data if no limit specified
  const slicedStats = stats.slice(0, actualLimit).reverse() // Chronological order
  return {
    labels: slicedStats.map((stat) => stat.day), // Actual dates like "2024-07-25"
    data: slicedStats.map((stat) => formatE8sToTokens(stat[field])),
  }
}

// Format large numbers with appropriate units (K, M, B) - compact version
export const formatCompactNumber = (num: string | number): string => {
  const numValue = typeof num === "string" ? parseFloat(num) : num

  if (numValue >= 1_000_000_000) {
    return `${(numValue / 1_000_000_000).toFixed(1)}B`
  }
  if (numValue >= 1_000_000) {
    return `${(numValue / 1_000_000).toFixed(1)}M`
  }
  if (numValue >= 1_000) {
    return `${(numValue / 1_000).toFixed(1)}K`
  }
  return numValue.toFixed(0)
}

// Calculate percentage change between two values
export const calculatePercentageChange = (current: number, previous: number): { value: string; isPositive: boolean } => {
  if (previous === 0) return { value: "N/A", isPositive: true }

  const change = ((current - previous) / previous) * 100
  const isPositive = change >= 0
  const formattedChange = Math.abs(change) >= 0.1 ? `${Math.abs(change).toFixed(1)}%` : "<0.1%"

  return {
    value: formattedChange,
    isPositive,
  }
}

// Get value from 7 days ago for comparison
export const getPreviousValue = (stats: ICDailyStats[], field: keyof ICDailyStats): number => {
  if (stats.length < 7) return getLatestNumber(stats, field)
  const value = stats[6][field] // 7 days ago (0-indexed)
  return typeof value === "string" ? parseFloat(value) : (value as number)
}

// Get latest value as number (separate from existing getLatest which returns string)
export const getLatestNumber = (stats: ICDailyStats[], field: keyof ICDailyStats): number => {
  if (stats.length === 0) return 0
  const value = stats[0][field]
  return typeof value === "string" ? parseFloat(value) : (value as number)
}

// Calculate staking percentage (locked ICP / circulating supply)
export const calculateStakingPercentage = (lockedE8s: string, circulatingE8s: string): number => {
  const locked = formatE8sToTokens(lockedE8s)
  const circulating = formatE8sToTokens(circulatingE8s)
  return circulating > 0 ? (locked / circulating) * 100 : 0
}
