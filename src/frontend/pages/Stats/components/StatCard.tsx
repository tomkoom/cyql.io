import { cn } from "@/lib/utils"
import { MiniChart } from "./MiniChart"

interface StatCardProps {
  label: string
  value: string
  unit?: string
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  isHighlight?: boolean
  chartData?: number[]
  chartLabels?: string[]
}

export const StatCard = ({ label, value, unit = "", subtitle = "", isHighlight = false, chartData, chartLabels }: StatCardProps) => (
  <div className={`${isHighlight ? "bg-coolgray-950" : "bg-coolgray-950"} hover:bg-coolgray-925 rounded-2xl p-5 transition-colors`}>
    <div className="mb-1.5">
      <h3 className={cn("text-sm leading-tight font-medium", isHighlight ? "text-coolgray-400" : "text-coolgray-400")}>{label}</h3>
    </div>

    {/* Chart section - takes most of the card space */}
    {chartData && chartData.length > 0 && (
      <div className="mb-3">
        <MiniChart data={chartData} labels={chartLabels} isHighlight={isHighlight} />
      </div>
    )}

    <div className="mb-0.5">
      <span className={cn("text-xl font-bold", isHighlight ? "text-lime-400" : "text-white")}>{value}</span>
      {unit && <span className={cn("ml-1 text-sm font-medium", isHighlight ? "text-lime-400" : "text-coolgray-500")}>{unit}</span>}
    </div>
    {subtitle && <p className={cn("text-xs leading-tight", isHighlight ? "text-coolgray-500" : "text-coolgray-500")}>{subtitle}</p>}
  </div>
)
