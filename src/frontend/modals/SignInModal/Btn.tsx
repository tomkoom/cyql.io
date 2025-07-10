import { Icon } from "@/components/ui/Icon"

interface BtnProps {
  label: string
  logo: string
  onClick: () => void
}

export default function Btn({ label, logo, onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full cursor-pointer rounded-lg bg-white/5 p-4 transition-colors duration-200 hover:bg-white/10"
      aria-label={`Sign in with ${label}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-background flex items-center justify-center rounded-full p-2">
            <img src={logo} alt={`${label} logo`} className="h-7 w-7 object-contain" />
          </div>
          <div className="text-left">
            <h3 className="text-foreground group-hover:text-accent-3 text-lg font-medium transition-colors">Continue with {label}</h3>
            <p className="text-coolgray-500 text-sm">Secure Web3 authentication</p>
          </div>
        </div>

        <Icon lucideName="ChevronRight" className="text-muted-foreground group-hover:text-accent-3 h-5 w-5 transition-colors duration-200" />
      </div>
    </button>
  )
}
