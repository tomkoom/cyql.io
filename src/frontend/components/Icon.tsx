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

    // Only pass fill prop if it's explicitly provided
    const iconProps = {
      color,
      size,
      strokeWidth,
      className,
      ...(fill && { fill }),
    }

    return <LucideIcon {...iconProps} />
  }
  return null
}
