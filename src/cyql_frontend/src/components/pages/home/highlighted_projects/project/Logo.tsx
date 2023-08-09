import React, { FC } from "react";
import styled from "styled-components";

// components
import { LogoLetter } from "@/components/ui/_index";

interface LogoProps {
  name: string;
  logo: string;
}

const Logo: FC<LogoProps> = ({ name, logo }): JSX.Element => {
  const sizeRem = "4.5";
  const borderRadiusRem = "1";
  const style = {
    width: `${sizeRem}rem`,
    height: `${sizeRem}rem`,
    borderRadius: `${borderRadiusRem}rem`,
  };

  return logo ? (
    <LogoStyled style={style} src={logo} alt={`${name} logo`} />
  ) : (
    <LogoLetter sizeRem={sizeRem} borderRadiusRem={borderRadiusRem} name={name} />
  );
};

const LogoStyled = styled.img`
  flex-shrink: 0;
  object-fit: cover;
`;

export default Logo;
