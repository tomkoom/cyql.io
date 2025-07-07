import { icons as lucideIcons } from "lucide-react";
import React, { FC } from "react";

export type LucideIconsKeys = keyof typeof lucideIcons;

interface IconProps {
  lucideName: LucideIconsKeys;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const Icon: FC<IconProps> = ({
  lucideName,
  color,
  size = 18,
  strokeWidth = 3,
  className,
}) => {
  if (lucideName) {
    const LucideIcon = lucideIcons[lucideName];
    return (
      <LucideIcon
        color={color}
        size={size}
        strokeWidth={strokeWidth}
        className={className}
      />
    );
  }
  return null;
};
