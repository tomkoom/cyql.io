import { IS_DEV } from "@/constants/constants"

// Configuration for analytics
const ANALYTICS_CONFIG = {
  enabled: false,
  // enabled: IS_DEV, // Enable only in development mode
  verbose: true, // Show detailed logs
}

/**
 * Logs backend query analytics including response time and payload size
 * Only active in development mode for performance monitoring
 */
export const logQueryAnalytics = (endpoint: string, responseData: any, startTime: number) => {
  // Skip if analytics disabled or not in dev mode
  if (!ANALYTICS_CONFIG.enabled || !IS_DEV) return

  try {
    const endTime = performance.now()
    const duration = endTime - startTime

    // Calculate response size (approximate) - handle BigInt serialization
    const jsonString = JSON.stringify(responseData, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    const sizeInBytes = new Blob([jsonString]).size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(3)

    if (ANALYTICS_CONFIG.verbose) {
      console.group(`🔍 Backend Analytics: ${endpoint}`)
      console.log(`⏱️ Response Time: ${duration.toFixed(2)}ms`)
      console.log(`📦 Response Size: ${sizeInKB} KB (${sizeInBytes} bytes)`)
      if (sizeInBytes > 1024 * 1024) {
        console.log(`📦 Response Size (MB): ${sizeInMB} MB`)
      }
      console.log(`📊 Projects Count: ${Array.isArray(responseData) ? responseData.length : "N/A"}`)
      console.groupEnd()
    } else {
      // Compact logging
      console.log(`🔍 ${endpoint}: ${duration.toFixed(2)}ms, ${sizeInKB}KB, ${Array.isArray(responseData) ? responseData.length : "N/A"} items`)
    }
  } catch (error) {
    // Fallback logging if analytics fails
    console.log(`🔍 Backend Analytics: ${endpoint} - Response Time: ${(performance.now() - startTime).toFixed(2)}ms`)
    console.warn("Analytics logging failed:", error)
  }
}

/**
 * Logs summary analytics for multiple queries (e.g., highlighted categories)
 */
export const logSummaryAnalytics = (endpoint: string, results: any[], startTime: number, metadata?: Record<string, any>) => {
  if (!ANALYTICS_CONFIG.enabled || !IS_DEV) return

  try {
    const endTime = performance.now()
    const totalDuration = endTime - startTime
    const totalItems = results.reduce((acc, result) => {
      if (Array.isArray(result)) return acc + result.length
      if (result?.projects?.length) return acc + result.projects.length
      return acc + 1
    }, 0)

    console.group(`🔍 Backend Analytics Summary: ${endpoint}`)
    console.log(`⏱️  Total Response Time: ${totalDuration.toFixed(2)}ms`)
    console.log(`📊 Total Queries: ${results.length}`)
    console.log(`📊 Total Items: ${totalItems}`)
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        console.log(`📈 ${key}: ${value}`)
      })
    }
    console.groupEnd()
  } catch (error) {
    console.warn("Summary analytics logging failed:", error)
  }
}

/**
 * Toggle analytics on/off programmatically
 */
export const toggleAnalytics = (enabled: boolean) => {
  ANALYTICS_CONFIG.enabled = enabled && IS_DEV
  console.log(`🔍 Analytics ${ANALYTICS_CONFIG.enabled ? "enabled" : "disabled"}`)
}

/**
 * Set analytics verbosity
 */
export const setAnalyticsVerbose = (verbose: boolean) => {
  ANALYTICS_CONFIG.verbose = verbose
  console.log(`🔍 Analytics verbosity: ${verbose ? "detailed" : "compact"}`)
}
