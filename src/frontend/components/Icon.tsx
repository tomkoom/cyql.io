import { icons as lucideIcons } from "lucide-react"
import { FC } from "react"

export type LucideIconsKeys = keyof typeof lucideIcons

interface IconProps {
  lucideName: LucideIconsKeys
  color?: string
  size?: number
  strokeWidth?: number
  fill?: string
  className?: string
}

export const Icon: FC<IconProps> = ({ lucideName, color, size = 18, strokeWidth = 3, fill, className }) => {
  if (lucideName) {
    const LucideIcon = lucideIcons[lucideName]
    return <LucideIcon color={color} size={size} strokeWidth={strokeWidth} fill={fill} className={className} />
  }
  return null
}
