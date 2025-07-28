import { PageHeader, UnifiedBreadcrumb } from "@/components"
import { Spinner } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { useICStatsQuery } from "@/hooks/queries/useICStatsQuery"
import { useState } from "react"
import { RawData, StatCard, StatsSection } from "./components"
import {
  calculateAverage,
  calculateMax,
  calculateSum,
  formatBytes,
  formatE8sToTokens,
  formatKwh,
  formatNumber,
  generateChartData,
  generateChartDataE8s,
} from "./utils"

const TITLE = "Internet Computer Stats"
const DESCRIPTION = "Real-time network statistics and metrics from the Internet Computer"

export default function Stats() {
  const [selectedDays, setSelectedDays] = useState(30)
  const { data, isLoading, error } = useICStatsQuery({ days: selectedDays })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-8">
        <PageHeader title={TITLE} description={DESCRIPTION} breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />} />
        <div className="flex items-center justify-center gap-3 py-16">
          <Spinner />
          <span className="text-coolgray-400">Loading IC Stats...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-8">
        <PageHeader title={TITLE} description={DESCRIPTION} breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />} />
        <div className="rounded-lg bg-red-950/20 p-8 text-center">
          <p className="mb-2 text-lg font-medium text-red-400">Failed to load stats</p>
          <p className="text-coolgray-500 text-sm">Please try again later</p>
        </div>
      </div>
    )
  }

  if (!data?.daily_stats?.length) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 pb-8">
        <PageHeader title={TITLE} description={DESCRIPTION} breadcrumbs={<UnifiedBreadcrumb items={[{ label: "Stats", isCurrentPage: true }]} />} />
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
    <div className="mx-auto max-w-[1440px] pb-8">
      <PageHeader title={TITLE} description={DESCRIPTION} breadcrumbs={<UnifiedBreadcrumb items={breadcrumbItems} />} />

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
        <StatsSection title="Key Metrics" description="">
          <StatCard
            label="ICP Circulating Supply"
            value={formatNumber(formatE8sToTokens(latestStats.circulating_supply))}
            unit="ICP"
            subtitle="Current token supply"
            isHighlight
            chartData={generateChartDataE8s(stats, "circulating_supply")}
          />
          <StatCard
            label="Total Locked ICP"
            value={formatNumber(formatE8sToTokens(latestStats.governance_total_locked_e8s))}
            unit="ICP"
            subtitle="Currently staked"
            isHighlight
            chartData={generateChartDataE8s(stats, "governance_total_locked_e8s")}
          />
          <StatCard
            label="Total ICP Burned"
            value={formatNumber(formatE8sToTokens(latestStats.icp_burned_total))}
            unit="ICP"
            subtitle="All-time total burned"
            isHighlight
            chartData={generateChartDataE8s(stats, "icp_burned_total")}
          />
          <StatCard
            label="Total Transactions/sec"
            value={formatNumber(calculateAverage(stats, "average_transactions_per_second"))}
            unit="TPS"
            subtitle={`Latest: ${formatNumber(latestStats.average_transactions_per_second)} TPS`}
            isHighlight
            chartData={generateChartData(stats, "average_transactions_per_second")}
          />
          <StatCard
            label="Total Canisters"
            value={formatNumber(latestStats.registered_canisters_count)}
            subtitle="Smart contracts on IC"
            isHighlight
            chartData={generateChartData(stats, "registered_canisters_count")}
          />
          <StatCard
            label="New Canisters"
            value={formatNumber(calculateSum(stats, "gross_new_canisters"))}
            subtitle={`Created in last ${selectedDays} days`}
            isHighlight
            chartData={generateChartData(stats, "gross_new_canisters")}
          />
          <StatCard
            label="ICP Burned (Fees)"
            value={formatNumber(formatE8sToTokens(calculateSum(stats, "icp_burned_fees")))}
            unit="ICP"
            subtitle={`Total in last ${selectedDays} days`}
            isHighlight
            chartData={generateChartDataE8s(stats, "icp_burned_fees")}
          />
          <StatCard
            label="Internet Identity Users"
            value={formatNumber(latestStats.internet_identity_user_count)}
            subtitle="Total registered users"
            isHighlight
            chartData={generateChartData(stats, "internet_identity_user_count")}
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
          <StatCard label="ckBTC Supply" value={formatNumber(formatE8sToTokens(latestStats.ckbtc_total_supply))} unit="ckBTC" subtitle="Chain-key Bitcoin" />
          <StatCard label="ckETH Supply" value={formatNumber(formatE8sToTokens(latestStats.cketh_total_supply))} unit="ckETH" subtitle="Chain-key Ethereum" />
          <StatCard
            label="ICP Burned (Fees)"
            value={formatNumber(formatE8sToTokens(calculateSum(stats, "icp_burned_fees")))}
            unit="ICP"
            subtitle={`Total in last ${selectedDays} days`}
          />
          <StatCard
            label="Total ICP Burned"
            value={formatNumber(formatE8sToTokens(latestStats.icp_burned_total))}
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
            value={formatNumber(formatE8sToTokens(latestStats.governance_total_locked_e8s))}
            unit="ICP"
            subtitle="Currently staked"
          />
          <StatCard
            label="Community Fund Maturity"
            value={formatNumber(formatE8sToTokens(latestStats.community_fund_total_maturity))}
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
        <RawData periodLabel={periodLabel} selectedDays={selectedDays} latestStats={latestStats} />
      </div>
    </div>
  )
}
