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
