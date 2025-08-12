import { Icon } from "@/components/Icon"
import { ROUTES } from "@/constants"
import { Link } from "react-router-dom"

export default function PromotionalBanner() {
  return (
    <Link
      to={ROUTES.PROMOTE}
      className="group border-coolgray-900 bg-coolgray-950/40 hover:bg-coolgray-950/60 flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors"
      aria-label="Promote your dapp on CYQL"
    >
      <div className="flex items-center gap-3">
        <div className="to-accent-1 flex h-7 w-7 flex-nowrap items-center justify-center rounded-full bg-gradient-to-tr from-blue-500">
          <Icon lucideName="Star" className="h-3.5 w-3.5 text-white" strokeWidth={2} fill="currentColor" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-white">Promote your dapp</p>
          <p className="text-coolgray-400 text-xs">Get featured above the list and reach more users</p>
        </div>
      </div>
      <div className="text-accent-2 group-hover:text-accent-3 flex items-center gap-2 transition-colors">
        <span className="hidden text-sm font-medium sm:inline">Get featured</span>
        <Icon lucideName="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
