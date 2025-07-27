import { PageHeader, UnifiedBreadcrumb } from "@/components"
import { Spinner } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { IS_DEV } from "@/constants/constants"
import { useICStatsQuery } from "@/hooks/queries/useICStatsQuery"
import { ReactNode, useState } from "react"
import { calculateAverage, calculateMax, calculateSum, formatBytes, formatKwh, formatNumber } from "./utils"

interface StatCardProps {
  label: string
  value: string
  unit?: string
  subtitle?: string
}

const StatCard = ({ label, value, unit = "", subtitle = "" }: StatCardProps) => (
  <div className="bg-coolgray-950 rounded-lg p-4">
    <h3 className="text-coolgray-400 mb-1 text-sm font-medium">{label}</h3>
    <p className="text-lg font-bold text-white">
      {value} <span className="text-coolgray-500 text-sm font-normal">{unit}</span>
    </p>
    {subtitle && <p className="text-coolgray-500 mt-1 text-xs">{subtitle}</p>}
  </div>
)

interface StatsSectionProps {
  title: string
  children: ReactNode
}

const StatsSection = ({ title, children }: StatsSectionProps) => (
  <div className="mb-8">
    <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
  </div>
)

export default function Stats() {
  const [selectedDays, setSelectedDays] = useState(30)
  const { data, isLoading, error } = useICStatsQuery({ days: selectedDays })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          <span>Loading IC Stats...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <div className="text-center text-red-400">Error loading stats: {error.message}</div>
      </div>
    )
  }

  if (!data?.daily_stats?.length) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <div className="text-coolgray-400 text-center">No stats data available</div>
      </div>
    )
  }

  const stats = data.daily_stats
  const latestStats = stats[0]
  const periodLabel = selectedDays === 1 ? "Today" : `Last ${selectedDays} days`

  const breadcrumbItems = [{ label: "Stats", isCurrentPage: true }]

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <header className="mb-8">
        <PageHeader
          title="Internet Computer Stats"
          description="Real-time network statistics and metrics from the Internet Computer blockchain"
          breadcrumbs={<UnifiedBreadcrumb items={breadcrumbItems} />}
        />

        {/* Time Range Selector */}
        <div className="mb-4 flex gap-2">
          {[7, 30, 90].map((days) => (
            <Button key={days} variant={selectedDays === days ? "default" : "secondary"} size="sm" onClick={() => setSelectedDays(days)}>
              {days} days
            </Button>
          ))}
        </div>

        {/* Period Info */}
        <div className="bg-coolgray-950 mb-6 rounded-lg p-3">
          <p className="text-coolgray-300 text-sm">
            <span className="font-medium text-white">Period:</span> {periodLabel}
            <span className="mx-2">•</span>
            <span className="font-medium text-white">Data Points:</span> {stats.length} days
            <span className="mx-2">•</span>
            <span className="font-medium text-white">Latest:</span> {latestStats.day}
          </p>
        </div>
      </header>

      <div className="space-y-8">
        {/* Network Activity - Show averages over period */}
        <StatsSection title={`Network Activity (${periodLabel})`}>
          <StatCard
            label="Avg Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_transactions_per_second)} TPS`}
          />
          <StatCard
            label="Avg Query Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_query_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_query_transactions_per_second)} TPS`}
          />
          <StatCard
            label="Avg Update Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_update_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_update_transactions_per_second)} TPS`}
          />
          <StatCard
            label="Avg Blocks per Second"
            value={formatNumber(calculateAverage(stats, "blocks_per_second_average"))}
            unit="BPS"
            subtitle={`Latest: ${formatNumber(latestStats.blocks_per_second_average)} BPS`}
          />
        </StatsSection>

        {/* Peak Network Performance */}
        <StatsSection title={`Peak Performance (${periodLabel})`}>
          <StatCard
            label="Max Total TPS"
            value={formatNumber(calculateMax(stats, "max_total_transactions_per_second"))}
            unit="TPS"
            subtitle={`Highest transaction rate achieved`}
          />
          <StatCard
            label="Max Query TPS"
            value={formatNumber(calculateMax(stats, "max_query_transactions_per_second"))}
            unit="TPS"
            subtitle={`Peak query transaction rate`}
          />
          <StatCard
            label="Max Update TPS"
            value={formatNumber(calculateMax(stats, "max_update_transactions_per_second"))}
            unit="TPS"
            subtitle={`Peak update transaction rate`}
          />
          <StatCard label="Total Boundary Nodes" value={latestStats.total_boundary_nodes} subtitle={`Network edge infrastructure`} />
        </StatsSection>

        {/* Canisters & Infrastructure - Show totals and growth */}
        <StatsSection title={`Canisters & Infrastructure (${periodLabel})`}>
          <StatCard label="Total Canisters" value={formatNumber(latestStats.registered_canisters_count)} subtitle={`Current total (latest)`} />
          <StatCard label="New Canisters" value={formatNumber(calculateSum(stats, "gross_new_canisters"))} subtitle={`Total created in ${selectedDays} days`} />
          <StatCard label="Canister Memory Usage" value={formatBytes(latestStats.canister_memory_usage_bytes)} subtitle={`Current usage (latest)`} />
          <StatCard label="Total Nodes in Subnets" value={latestStats.total_nodes_in_subnets} subtitle={`Current count (latest)`} />
        </StatsSection>

        {/* Tokens & Economy - Show latest values and averages */}
        <StatsSection title={`Tokens & Economy (${periodLabel})`}>
          <StatCard label="ICP Circulating Supply" value={formatNumber(latestStats.circulating_supply)} unit="ICP" subtitle={`Current supply (latest)`} />
          <StatCard label="ckBTC Total Supply" value={formatNumber(latestStats.ckbtc_total_supply)} unit="ckBTC" subtitle={`Chain-key Bitcoin (latest)`} />
          <StatCard label="ckETH Total Supply" value={formatNumber(latestStats.cketh_total_supply)} unit="ckETH" subtitle={`Chain-key Ethereum (latest)`} />
          <StatCard
            label="Total ICP Burned (Fees)"
            value={formatNumber(calculateSum(stats, "icp_burned_fees"))}
            unit="e8s"
            subtitle={`Total burned in ${selectedDays} days`}
          />
        </StatsSection>

        {/* Cycles & Energy */}
        <StatsSection title={`Cycles & Energy (${periodLabel})`}>
          <StatCard
            label="Avg Cycle Burn Rate"
            value={formatNumber(calculateAverage(stats, "cycle_burn_rate_average"))}
            unit="cycles/day"
            subtitle={`Average over ${selectedDays} days`}
          />
          <StatCard label="Total Cycle Burn" value={formatNumber(latestStats.total_cycle_burn_till_date)} unit="cycles" subtitle={`All-time total (latest)`} />
          <StatCard
            label="IC Energy Consumption"
            value={formatKwh(latestStats.total_ic_energy_consumption_rate_kwh)}
            unit="h"
            subtitle={`Total network power usage`}
          />
          <StatCard
            label="Node Energy Rate"
            value={formatKwh(latestStats.node_energy_consumption_rate_kwh)}
            unit="h per node"
            subtitle={`Average per node consumption`}
          />
        </StatsSection>

        {/* Users & Identity - Show totals and averages */}
        <StatsSection title={`Users & Identity (${periodLabel})`}>
          <StatCard label="Internet Identity Users" value={formatNumber(latestStats.internet_identity_user_count)} subtitle={`Total users (latest)`} />
          <StatCard
            label="Total II Logins"
            value={formatNumber(calculateSum(stats, "daily_internet_identity_logins"))}
            subtitle={`Total logins in ${selectedDays} days`}
          />
          <StatCard
            label="Avg Daily Unique Accounts"
            value={formatNumber(calculateAverage(stats, "unique_accounts_per_day"))}
            subtitle={`Average over ${selectedDays} days`}
          />
          <StatCard
            label="Peak Daily Unique Accounts"
            value={formatNumber(calculateMax(stats, "unique_accounts_per_day"))}
            subtitle={`Highest daily activity`}
          />
        </StatsSection>

        {/* Governance & Community Fund */}
        <StatsSection title={`Governance & Community Fund (${periodLabel})`}>
          <StatCard label="Total Neurons" value={formatNumber(latestStats.governance_neurons_total)} subtitle={`Current count (latest)`} />
          <StatCard label="Total Proposals" value={formatNumber(latestStats.proposals_count)} subtitle={`Current total (latest)`} />
          <StatCard label="Total Locked ICP" value={formatNumber(latestStats.governance_total_locked_e8s)} unit="e8s" subtitle={`Current locked (latest)`} />
          <StatCard
            label="Community Fund Maturity"
            value={formatNumber(latestStats.community_fund_total_maturity)}
            unit="e8s"
            subtitle={`Total maturity available`}
          />
        </StatsSection>

        {/* Neuron Fund Details */}
        <StatsSection title={`Neuron Fund Details (Latest)`}>
          <StatCard
            label="Fund Total Staked"
            value={formatNumber(latestStats.governance_neuron_fund_total_staked_e8s)}
            unit="e8s"
            subtitle={`Total ICP staked in fund`}
          />
          <StatCard
            label="Fund Maturity Equivalent"
            value={formatNumber(latestStats.governance_neuron_fund_total_maturity_e8s_equivalent)}
            unit="e8s"
            subtitle={`Maturity in e8s equivalent`}
          />
          <StatCard
            label="Latest Reward Round"
            value={formatNumber(latestStats.governance_latest_reward_round_total_available_e8s)}
            unit="e8s"
            subtitle={`Most recent reward distribution`}
          />
          <StatCard label="Total ICP Burned" value={formatNumber(latestStats.icp_burned_total)} unit="e8s" subtitle={`All-time total burned`} />
        </StatsSection>

        {/* Staking Rewards - Show latest values */}
        <StatsSection title="Staking Rewards (Estimated %, Latest)">
          <StatCard label="1 Year" value={latestStats.estimated_rewards_percentage["1_year"].toFixed(2)} unit="%" />
          <StatCard label="2 Years" value={latestStats.estimated_rewards_percentage["2_year"].toFixed(2)} unit="%" />
          <StatCard label="4 Years" value={latestStats.estimated_rewards_percentage["4_year"].toFixed(2)} unit="%" />
          <StatCard label="8 Years" value={latestStats.estimated_rewards_percentage["8_year"].toFixed(2)} unit="%" />
        </StatsSection>

        {/* Raw Data Section - Only in DEV mode */}
        {IS_DEV && (
          <div className="mt-12">
            <div className="-blue-700/50 mb-4 rounded-lg bg-blue-900/20 p-3">
              <p className="text-sm font-medium text-blue-300">🛠️ Development Mode Only - This section is only visible when IS_DEV = true</p>
            </div>

            <h2 className="mb-4 text-xl font-bold text-white">Raw Data Sample (Latest Entry from {periodLabel})</h2>

            {/* Query URL */}
            <div className="bg-coolgray-900 -coolgray-700 mb-4 rounded-lg p-3">
              <h3 className="text-coolgray-300 mb-2 text-sm font-medium">API Query URL:</h3>
              <code className="text-xs break-all text-blue-400">
                {(() => {
                  const now = Math.floor(Date.now() / 1000)
                  const startTime = now - selectedDays * 24 * 60 * 60
                  return `https://ic-api.internetcomputer.org/api/v3/daily-stats?start=${startTime}&end=${now}&format=json`
                })()}
              </code>
            </div>

            <div className="bg-coolgray-950 overflow-x-auto rounded-lg p-4">
              <pre className="text-coolgray-300 text-sm whitespace-pre">{JSON.stringify(latestStats, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
