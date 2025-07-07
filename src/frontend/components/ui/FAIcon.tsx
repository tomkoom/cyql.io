import React, { FC } from "react";
import * as FaIcons from "react-icons/fa";

export type FAIconKeys = keyof typeof FaIcons;

interface FaIconProps {
  name: FAIconKeys;
  color?: string;
  size?: number;
  className?: string;
}

export const FAIcon: FC<FaIconProps> = ({
  name,
  color,
  size = 18,
  className,
}) => {
  const IconComponent = FaIcons[name];

  if (!IconComponent) return null;

  return <IconComponent color={color} size={size} className={className} />;
};
