import { Button } from "@/components/ui/button"
import { useNavigation } from "@/hooks"
import { useICStatsQuery } from "@/hooks/queries/useICStatsQuery"
import {
  calculateAverage,
  calculatePercentageChange,
  calculateStakingPercentage,
  formatCompactNumber,
  getLatestNumber,
  getPreviousValue,
} from "@/pages/Stats/utils"
import { CompactStatCard } from "./CompactStatCard"

const TITLE = "Network Pulse"

export const CompactStatsBar = () => {
  const { toStats } = useNavigation()
  const { data, isLoading, error } = useICStatsQuery({ days: 7 })

  // Don't render anything if there's an error
  if (error) return null

  // Show loading skeleton
  if (isLoading || !data?.daily_stats?.length) {
    return (
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{TITLE}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CompactStatCard key={i} label="" value="" isLoading={true} />
          ))}
        </div>
      </div>
    )
  }

  const stats = data.daily_stats
  const latest = stats[0]

  // Calculate metrics with 7-day comparison
  const currentTps = calculateAverage(stats, "average_transactions_per_second")
  const previousTps = getPreviousValue(stats, "average_transactions_per_second")

  const currentCanisters = getLatestNumber(stats, "registered_canisters_count")
  const previousCanisters = getPreviousValue(stats, "registered_canisters_count")

  const currentStakingPercentage = calculateStakingPercentage(latest.governance_total_locked_e8s, latest.circulating_supply)
  const previousStakingPercentage = calculateStakingPercentage(
    stats[6]?.governance_total_locked_e8s || latest.governance_total_locked_e8s,
    stats[6]?.circulating_supply || latest.circulating_supply
  )

  const currentUsers = getLatestNumber(stats, "internet_identity_user_count")
  const previousUsers = getPreviousValue(stats, "internet_identity_user_count")

  const currentNodes = getLatestNumber(stats, "total_nodes_in_subnets")
  const previousNodes = getPreviousValue(stats, "total_nodes_in_subnets")

  const currentDailyTxns = calculateAverage(stats, "average_transactions_per_second") * 24 * 60 * 60 // TPS * seconds in day
  const previousDailyTxns = getPreviousValue(stats, "average_transactions_per_second") * 24 * 60 * 60

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{TITLE}</h2>
        <Button variant="secondary" onClick={toStats} className="text-coolgray-400 hover:text-white">
          View detailed stats →
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {/* Live TPS */}
        <CompactStatCard label="Live TPS" value={formatCompactNumber(currentTps)} icon="Zap" change={calculatePercentageChange(currentTps, previousTps)} />

        {/* Total Canisters */}
        <CompactStatCard
          label="Canisters"
          value={formatCompactNumber(currentCanisters)}
          icon="Box"
          change={calculatePercentageChange(currentCanisters, previousCanisters)}
        />

        {/* ICP Staked % */}
        <CompactStatCard
          label="ICP Staked"
          value={currentStakingPercentage.toFixed(1)}
          unit="%"
          icon="Lock"
          change={calculatePercentageChange(currentStakingPercentage, previousStakingPercentage)}
        />

        {/* Internet Identity Users */}
        <CompactStatCard
          label="II Users"
          value={formatCompactNumber(currentUsers)}
          icon="Users"
          change={calculatePercentageChange(currentUsers, previousUsers)}
        />

        {/* Network Nodes */}
        <CompactStatCard label="Nodes" value={formatCompactNumber(currentNodes)} icon="Globe" change={calculatePercentageChange(currentNodes, previousNodes)} />

        {/* Daily Transactions */}
        <CompactStatCard
          label="Daily Txns"
          value={formatCompactNumber(currentDailyTxns)}
          icon="ChartBar"
          change={calculatePercentageChange(currentDailyTxns, previousDailyTxns)}
        />
      </div>
    </div>
  )
}
