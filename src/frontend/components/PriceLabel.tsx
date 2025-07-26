import { Icon } from "@/components/Icon"

interface PriceLabelProps {
  price: string
  change: number
  isLoading?: boolean
  showCurrency?: boolean
  currencySymbol?: string
  className?: string
}

export default function PriceLabel({ price, change, isLoading = false, showCurrency = true, currencySymbol = "$", className = "" }: PriceLabelProps) {
  const changeColor = change > 0 ? "text-lime-500" : change < 0 ? "text-red-500" : "text-coolgray-400"

  const changeIcon = change > 0 ? "ArrowUp" : change < 0 ? "ArrowDown" : null

  return (
    <div className={`flex flex-nowrap items-center gap-2 ${className}`}>
      {/* Price Display */}
      <span className={`text-xs ${isLoading ? "animate-pulse opacity-70" : ""}`}>
        {showCurrency && currencySymbol}
        {price}
      </span>

      {/* Price Change */}
      <div className="flex items-center gap-1 whitespace-nowrap">
        <span className={`flex items-center text-xs ${changeColor}`}>
          {changeIcon && <Icon lucideName={changeIcon as any} size={12} className="mr-0.5" />}
          {Math.abs(change).toFixed(2)}%
        </span>
        <span className="text-coolgray-400 text-xs">24h</span>
      </div>
    </div>
  )
}
