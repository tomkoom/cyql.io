import { Icon } from "@/components/Icon"
import { useFormattedProjectsCount } from "@/hooks/queries/useProjectsStats"
import { Link } from "react-router-dom"

export default function CollectionsFooter() {
  const { formattedCount, isLoading: isProjectsLoading } = useFormattedProjectsCount()

  // Floor to nearest 10s: 509 -> 500+, 510 -> 500+, 511 -> 510+
  const getFlooredCount = (count: string) => {
    if (isProjectsLoading) return "500+"

    const numericCount = parseInt(count.replace(/[^\d]/g, ""), 10)
    if (isNaN(numericCount)) return "500+"

    const flooredCount = Math.floor(numericCount / 10) * 10
    return `${flooredCount}+`
  }

  return (
    <footer className="bg-coolgray-950/80 mt-12 rounded-2xl p-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-center">
          <div className="bg-coolgray-900 rounded-full p-3">
            <Icon lucideName="Search" size={24} className="text-coolgray-400" />
          </div>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-white">Explore All Projects</h3>

        <p className="text-coolgray-400 mb-6 text-sm leading-relaxed">
          Looking for something specific? Browse our complete directory of Internet Computer projects with advanced filtering and search.
        </p>

        <Link
          to="/projects"
          className="bg-accent-2 hover:bg-accent-2/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
        >
          Browse All Projects
          <Icon lucideName="ArrowRight" size={16} />
        </Link>

        <div className="text-coolgray-500 mt-6 flex items-center justify-center gap-6 text-xs">
          <span>{getFlooredCount(formattedCount)} Projects</span>
          <div className="bg-coolgray-700 h-1 w-1 rounded-full"></div>
          <span>Multiple Categories</span>
          <div className="bg-coolgray-700 h-1 w-1 rounded-full"></div>
          <span>Advanced Filters</span>
        </div>
      </div>
    </footer>
  )
}
