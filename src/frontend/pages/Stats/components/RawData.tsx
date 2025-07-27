import { IS_DEV } from "@/constants/constants"
import { StatsSection } from "."

interface RawDataProps {
  periodLabel: string
  selectedDays: number
  latestStats: any
}

export const RawData = ({ periodLabel, selectedDays, latestStats }: RawDataProps) => {
  if (!IS_DEV) return null

  const getApiQueryUrl = () => {
    const now = Math.floor(Date.now() / 1000)
    const startTime = now - selectedDays * 24 * 60 * 60
    return `https://ic-api.internetcomputer.org/api/v3/daily-stats?start=${startTime}&end=${now}&format=json`
  }

  return (
    <section className="border-coolgray-800 mt-16 rounded-xl border border-dashed p-6">
      <div className="mb-6">
        <p className="text-coolgray-400 text-sm">Dev mode - raw data section</p>
        <p className="text-coolgray-400 text-sm">Raw Data Sample. Latest entry from {periodLabel}</p>
        <p className="text-coolgray-400 text-sm">
          API Query URL:{" "}
          <a className="text-blue-400 underline" href={getApiQueryUrl()} target="_blank" rel="noopener noreferrer">
            {getApiQueryUrl()}
          </a>
        </p>
      </div>

      <StatsSection title="" description="" className="mb-0">
        <div className="col-span-full">
          <div className="bg-coolgray-950 overflow-x-auto rounded-lg p-4">
            <pre className="text-coolgray-300 text-sm whitespace-pre">{JSON.stringify(latestStats, null, 2)}</pre>
          </div>
        </div>
      </StatsSection>
    </section>
  )
}
