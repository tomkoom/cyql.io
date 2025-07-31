import { Icon, LucideIconsKeys } from "@/components/Icon"
import { cn } from "@/lib/utils"

interface CompactStatCardProps {
  label: string
  value: string
  unit?: string
  change?: {
    value: string
    isPositive: boolean
  }
  icon?: LucideIconsKeys
  isLoading?: boolean
}

export const CompactStatCard = ({ label, value, unit = "", change, icon, isLoading = false }: CompactStatCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-coolgray-950/80 rounded-xl p-4">
        {/* Label skeleton */}
        <div className="bg-coolgray-800 mb-3 h-2 w-24 animate-pulse rounded" />

        {/* Value skeleton */}
        <div className="bg-coolgray-800 h-4 w-20 animate-pulse rounded" />
      </div>
    )
  }

  return (
    <div className="bg-coolgray-950/80 rounded-xl p-4">
      <div className="flex flex-wrap items-center justify-between">
        {/* Title with icon */}
        <div className="flex items-center gap-2">
          {icon && <Icon lucideName={icon} size={16} className="text-coolgray-400" />}
          <span className="text-coolgray-400 text-sm font-medium">{label}</span>
        </div>

        {/* Change indicator */}
        {change && (
          <div className="flex items-center gap-1">
            <Icon
              lucideName={change.isPositive ? "TrendingUp" : "TrendingDown"}
              size={12}
              className={cn("transition-colors", change.isPositive ? "text-emerald-400" : "text-red-400")}
            />
            <span className={cn("text-xs font-medium transition-colors", change.isPositive ? "text-emerald-400" : "text-red-400")}>{change.value}</span>
            <span className="text-coolgray-500 text-xs">7d</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <span className="text-xl font-bold text-white">{value}</span>
        {unit && <span className="text-coolgray-500 ml-1 text-sm font-medium">{unit}</span>}
      </div>
    </div>
  )
}
