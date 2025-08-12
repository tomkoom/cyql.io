import { Icon } from "@/components/Icon"
import PriceLabel from "@/components/PriceLabel"
import { IC_LOGO } from "@/constants/constants"
import { useIcpPriceQuery } from "@/hooks"
import { useFormattedProjectsCount } from "@/hooks/queries/useProjectsStats"

const REFERRAL_LINKS = {
  kairos: "https://www.kairos.win?ref=cyqlio",
}

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

      <a
        href={REFERRAL_LINKS.kairos}
        target="_blank"
        rel="noopener noreferrer"
        className="border-coolgray-800 hover:border-coolgray-700 hover:bg-coolgray-900/60 group inline-flex items-center gap-2 rounded-full border px-2 py-0.5 transition-colors"
        title="Ad · Kairos — Bitcoin prediction markets"
        aria-label="Ad: Kairos — Bitcoin prediction markets"
      >
        <img
          src="https://uodzj-4aaaa-aaaag-auexa-cai.icp0.io/logos/1754974310201.jpg"
          alt="Kairos logo"
          className="h-4 w-4 rounded-sm object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="text-white">Kairos</span>
        <span className="text-coolgray-400 hidden sm:inline">Bitcoin prediction markets</span>
        <Icon lucideName="ExternalLink" size={14} className="text-coolgray-500 group-hover:text-coolgray-300" />
      </a>
    </div>
  )
}
