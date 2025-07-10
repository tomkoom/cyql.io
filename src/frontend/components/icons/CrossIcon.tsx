interface CrossIconProps {
  onClick?: () => void
}

export default function CrossIcon({ onClick }: CrossIconProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-coolgray-800/20 hover:bg-coolgray-800/30 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
    >
      <div className="relative h-5 w-5">
        {/* First line (diagonal) */}
        <div className="bg-coolgray-400 absolute top-1/2 left-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 transform rounded-sm transition-colors duration-200 group-hover:bg-white"></div>

        {/* Second line (diagonal) */}
        <div className="bg-coolgray-400 absolute top-1/2 left-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform rounded-sm transition-colors duration-200 group-hover:bg-white"></div>
      </div>
    </div>
  )
}
