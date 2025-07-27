import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface StatsSectionProps {
  title: string
  children: ReactNode
  description?: string
  className?: string
}

export const StatsSection = ({ title, children, description, className }: StatsSectionProps) => (
  <section className={cn("mb-12", className)}>
    <div className="mb-6">
      <h2 className="mb-1 text-2xl font-bold text-white">{title}</h2>
      {description && <p className="text-coolgray-400 text-sm">{description}</p>}
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
  </section>
)
