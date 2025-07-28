import { MiniChart } from "./MiniChart"

interface StatCardProps {
  label: string
  value: string
  unit?: string
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  isHighlight?: boolean
  chartData?: number[]
}

export const StatCard = ({ label, value, unit = "", subtitle = "", isHighlight = false, chartData }: StatCardProps) => (
  <div className={`${isHighlight ? "bg-accent-1" : "bg-coolgray-950"} hover:bg-coolgray-925 rounded-xl p-5 transition-colors`}>
    <div className="mb-3">
      <h3 className="text-coolgray-400 text-sm leading-tight font-medium">{label}</h3>
    </div>

    {/* Chart section */}
    {chartData && chartData.length > 0 && (
      <div className="mb-3">
        <MiniChart data={chartData} isHighlight={isHighlight} />
      </div>
    )}

    <div className="mb-2">
      <span className={`text-3xl font-bold ${isHighlight ? "text-accent-300" : "text-white"}`}>{value}</span>
      {unit && <span className="text-coolgray-500 ml-1 text-sm font-medium">{unit}</span>}
    </div>
    {subtitle && <p className="text-coolgray-500 text-xs leading-relaxed">{subtitle}</p>}
  </div>
)
