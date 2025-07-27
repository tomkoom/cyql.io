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
  trend?: "up" | "down" | "neutral"
  isHighlight?: boolean
}

const StatCard = ({ label, value, unit = "", subtitle = "", isHighlight = false }: StatCardProps) => (
  <div className={`${isHighlight ? "bg-accent-1" : "bg-coolgray-950"} hover:bg-coolgray-925 rounded-xl p-5 transition-colors`}>
    <div className="mb-3">
      <h3 className="text-coolgray-400 text-sm leading-tight font-medium">{label}</h3>
    </div>
    <div className="mb-2">
      <span className={`text-3xl font-bold ${isHighlight ? "text-accent-300" : "text-white"}`}>{value}</span>
      {unit && <span className="text-coolgray-500 ml-1 text-sm font-medium">{unit}</span>}
    </div>
    {subtitle && <p className="text-coolgray-500 text-xs leading-relaxed">{subtitle}</p>}
  </div>
)

interface StatsSectionProps {
  title: string
  children: ReactNode
  description?: string
}

const StatsSection = ({ title, children, description }: StatsSectionProps) => (
  <section className="mb-12">
    <div className="mb-6">
      <h2 className="mb-1 text-2xl font-bold text-white">{title}</h2>
      {description && <p className="text-coolgray-400 text-sm">{description}</p>}
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
  </section>
)

export default function Stats() {
  const [selectedDays, setSelectedDays] = useState(30)
  const { data, isLoading, error } = useICStatsQuery({ days: selectedDays })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1920px] px-4 pb-8">
        <PageHeader
          title="Internet Computer Stats"
          description="Real-time network statistics and metrics from the Internet Computer blockchain"
          breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />}
        />
        <div className="flex items-center justify-center gap-3 py-16">
          <Spinner />
          <span className="text-coolgray-400">Loading IC Stats...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1920px] px-4 pb-8">
        <PageHeader
          title="Internet Computer Stats"
          description="Real-time network statistics and metrics from the Internet Computer blockchain"
          breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />}
        />
        <div className="rounded-lg bg-red-950/20 p-8 text-center">
          <p className="mb-2 text-lg font-medium text-red-400">Failed to load stats</p>
          <p className="text-coolgray-500 text-sm">Please try again later</p>
        </div>
      </div>
    )
  }

  if (!data?.daily_stats?.length) {
    return (
      <div className="mx-auto max-w-[1920px] px-4 pb-8">
        <PageHeader
          title="Internet Computer Stats"
          description="Real-time network statistics and metrics from the Internet Computer blockchain"
          breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />}
        />
        <div className="bg-coolgray-950 rounded-lg p-8 text-center">
          <p className="text-coolgray-400">No stats data available</p>
        </div>
      </div>
    )
  }

  const stats = data.daily_stats
  const latestStats = stats[0]
  const periodLabel = selectedDays === 1 ? "Today" : `Last ${selectedDays} days`

  const breadcrumbItems = [{ label: "Stats", isCurrentPage: true }]

  return (
    <div className="mx-auto max-w-[1920px] pb-8">
      <PageHeader
        title="Internet Computer Stats"
        description="Real-time network statistics and metrics from the Internet Computer blockchain"
        breadcrumbs={<UnifiedBreadcrumb items={breadcrumbItems} />}
      />

      <div className="space-y-8">
        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[7, 30, 90].map((days) => (
              <Button
                key={days}
                variant={selectedDays === days ? "accent" : "secondary"}
                size="sm"
                onClick={() => setSelectedDays(days)}
                className="min-w-[80px]"
              >
                {days} days
              </Button>
            ))}
          </div>

          <div className="text-coolgray-400 text-sm">
            <span className="text-coolgray-200 font-medium">Period:</span> {periodLabel}
            <span className="mx-2">•</span>
            <span className="text-coolgray-200 font-medium">Latest:</span> {latestStats.day}
          </div>
        </div>

        {/* Key Metrics Overview */}
        <StatsSection title="Key Metrics" description="At a glance">
          <StatCard
            label="ICP Circulating Supply"
            value={formatNumber(Number(latestStats.circulating_supply) / 100_000_000)}
            unit="ICP"
            subtitle="Current token supply"
            isHighlight
          />
          <StatCard
            label="Total Locked ICP"
            value={formatNumber(Number(latestStats.governance_total_locked_e8s) / 100_000_000)}
            unit="ICP"
            subtitle="Currently staked"
            isHighlight
          />
          <StatCard
            label="Total ICP Burned"
            value={formatNumber(Number(latestStats.icp_burned_total) / 100_000_000)}
            unit="ICP"
            subtitle="All-time total burned"
            isHighlight
          />
          <StatCard
            label="Total Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_transactions_per_second)} TPS`}
            isHighlight
          />
          <StatCard label="Total Canisters" value={formatNumber(latestStats.registered_canisters_count)} subtitle="Smart contracts on IC" isHighlight />
          <StatCard
            label="New Canisters"
            value={formatNumber(calculateSum(stats, "gross_new_canisters"))}
            subtitle={`Created in last ${selectedDays} days`}
            isHighlight
          />
          <StatCard
            label="ICP Burned (Fees)"
            value={formatNumber(Number(calculateSum(stats, "icp_burned_fees")) / 100_000_000)}
            unit="ICP"
            subtitle={`Total in last ${selectedDays} days`}
            isHighlight
          />
          <StatCard
            label="Internet Identity Users"
            value={formatNumber(latestStats.internet_identity_user_count)}
            subtitle="Total registered users"
            isHighlight
          />
        </StatsSection>

        {/* Network Activity */}
        <StatsSection title="Network Activity" description="Transaction throughput and block production metrics">
          <StatCard
            label="Query Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_query_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_query_transactions_per_second)} TPS`}
          />
          <StatCard
            label="Update Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_update_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_update_transactions_per_second)} TPS`}
          />
          <StatCard
            label="Blocks per Second"
            value={formatNumber(calculateAverage(stats, "blocks_per_second_average"))}
            unit="BPS"
            subtitle={`Latest: ${formatNumber(latestStats.blocks_per_second_average)} BPS`}
          />
          <StatCard
            label="Peak Total TPS"
            value={formatNumber(calculateMax(stats, "max_total_transactions_per_second"))}
            unit="TPS"
            subtitle="Highest rate achieved"
          />
        </StatsSection>

        {/* Infrastructure */}
        <StatsSection title="Infrastructure" description="Canisters, nodes, and network infrastructure">
          <StatCard label="New Canisters" value={formatNumber(calculateSum(stats, "gross_new_canisters"))} subtitle={`Created in last ${selectedDays} days`} />
          <StatCard label="Canister Memory Usage" value={formatBytes(latestStats.canister_memory_usage_bytes)} subtitle="Current total usage" />
          <StatCard label="Total Subnet Nodes" value={latestStats.total_nodes_in_subnets} subtitle="Active consensus nodes" />
          <StatCard label="Boundary Nodes" value={latestStats.total_boundary_nodes} subtitle="Network edge infrastructure" />
        </StatsSection>

        {/* Token Economy */}
        <StatsSection title="Token Economy" description="ICP tokens, chain-key assets, and economic metrics">
          <StatCard label="ckBTC Supply" value={formatNumber(latestStats.ckbtc_total_supply)} unit="ckBTC" subtitle="Chain-key Bitcoin" />
          <StatCard label="ckETH Supply" value={formatNumber(latestStats.cketh_total_supply)} unit="ckETH" subtitle="Chain-key Ethereum" />
          <StatCard
            label="ICP Burned (Fees)"
            value={formatNumber(Number(calculateSum(stats, "icp_burned_fees")) / 100_000_000)}
            unit="ICP"
            subtitle={`Total in last ${selectedDays} days`}
          />
          <StatCard
            label="Total ICP Burned"
            value={formatNumber(Number(latestStats.icp_burned_total) / 100_000_000)}
            unit="ICP"
            subtitle="All-time total burned"
          />
        </StatsSection>

        {/* Energy & Cycles */}
        <StatsSection title="Energy & Cycles" description="Network energy consumption and computation cycles">
          <StatCard
            label="Cycle Burn Rate"
            value={formatNumber(calculateAverage(stats, "cycle_burn_rate_average"))}
            unit="cycles/day"
            subtitle={`Average over ${selectedDays} days`}
          />
          <StatCard
            label="Total Cycles Burned"
            value={formatNumber(latestStats.total_cycle_burn_till_date)}
            unit="cycles"
            subtitle="All-time computation used"
          />
          <StatCard
            label="Network Energy Rate"
            value={formatKwh(latestStats.total_ic_energy_consumption_rate_kwh)}
            unit="h"
            subtitle="Total power consumption"
          />
          <StatCard label="Per Node Energy Rate" value={formatKwh(latestStats.node_energy_consumption_rate_kwh)} unit="h" subtitle="Average per node" />
        </StatsSection>

        {/* User Activity */}
        <StatsSection title="User Activity" description="Internet Identity usage and account activity">
          <StatCard
            label="Daily II Logins"
            value={formatNumber(calculateSum(stats, "daily_internet_identity_logins"))}
            subtitle={`Total in last ${selectedDays} days`}
          />
          <StatCard
            label="Daily Unique Accounts"
            value={formatNumber(calculateAverage(stats, "unique_accounts_per_day"))}
            subtitle={`Average over ${selectedDays} days`}
          />
          <StatCard label="Peak Daily Accounts" value={formatNumber(calculateMax(stats, "unique_accounts_per_day"))} subtitle="Highest daily activity" />
        </StatsSection>

        {/* Governance */}
        <StatsSection title="Governance & Staking" description="Network governance, neurons, and staking rewards">
          <StatCard label="Total Neurons" value={formatNumber(latestStats.governance_neurons_total)} subtitle="Staking participants" />
          <StatCard label="Total Proposals" value={formatNumber(latestStats.proposals_count)} subtitle="Governance proposals" />
          <StatCard
            label="Total Locked ICP"
            value={formatNumber(Number(latestStats.governance_total_locked_e8s) / 100_000_000)}
            unit="ICP"
            subtitle="Currently staked"
          />
          <StatCard
            label="Community Fund Maturity"
            value={formatNumber(Number(latestStats.community_fund_total_maturity) / 100_000_000)}
            unit="ICP"
            subtitle="Available maturity"
          />
        </StatsSection>

        {/* Staking Rewards */}
        <StatsSection title="Current Staking Rewards" description="Estimated annual percentage yields for different staking periods">
          <StatCard label="1 Year Staking" value={latestStats.estimated_rewards_percentage["1_year"].toFixed(2)} unit="% APY" />
          <StatCard label="2 Year Staking" value={latestStats.estimated_rewards_percentage["2_year"].toFixed(2)} unit="% APY" />
          <StatCard label="4 Year Staking" value={latestStats.estimated_rewards_percentage["4_year"].toFixed(2)} unit="% APY" />
          <StatCard label="8 Year Staking" value={latestStats.estimated_rewards_percentage["8_year"].toFixed(2)} unit="% APY" />
        </StatsSection>

        {/* Raw Data Section - Only in DEV mode */}
        {IS_DEV && (
          <section className="mt-16">
            <div className="mb-6 rounded-lg bg-blue-900/20 p-4">
              <p className="text-sm font-medium text-blue-300">🛠️ Development Mode - Raw data section</p>
            </div>

            <StatsSection title="Raw Data Sample" description={`Latest entry from ${periodLabel}`}>
              <div className="col-span-full">
                <div className="bg-coolgray-900 mb-4 rounded-lg p-4">
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
            </StatsSection>
          </section>
        )}
      </div>
    </div>
  )
}
