import PriceLabel from "@/components/PriceLabel"
import { IC_LOGO } from "@/constants/constants"
import { useIcpPriceQuery } from "@/hooks"
import { useFormattedProjectsCount } from "@/hooks/queries/useProjectsStats"

export default function StatsHeader() {
  const { formattedCount, isLoading: isProjectsLoading } = useFormattedProjectsCount()
  const { price, change24h, isLoading: isPriceLoading } = useIcpPriceQuery()

  return (
    <div className="bg-coolgray-950 flex flex-wrap items-center justify-center gap-2 px-2 py-1 text-xs font-medium">
      <p className="text-coolgray-400">
        Projects: <span className={`text-white ${isProjectsLoading ? "animate-pulse opacity-70" : ""}`}>{formattedCount}</span>
      </p>
      <div className="bg-coolgray-800 h-4 w-px"></div>

      <div className="flex flex-nowrap items-center gap-2">
        <img src={IC_LOGO} alt="Internet Computer logo" className="h-4 w-4 object-contain" />
        <PriceLabel price={price} change={Number(change24h)} isLoading={isPriceLoading} />
      </div>
    </div>
  )
}
