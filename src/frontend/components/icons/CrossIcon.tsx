import React, { FC } from "react"
import styled from "styled-components"

interface CrossIconProps {
  onClick?: () => void
}

const CrossIcon: FC<CrossIconProps> = ({ onClick }): JSX.Element => {
  return (
    <Icon onClick={onClick ? onClick : undefined}>
      <div />
    </Icon>
  )
}

const Icon = styled.div`
  height: 3rem;
  width: 3rem;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background-color: var(--underlay1);
  border-radius: 50%;
  cursor: pointer;

  &:hover > div:before,
  &:hover > div:after {
    background-color: var(--primaryColor);
    transition: var(--transition1);
  }

  > div {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;

    &::before,
    &::after {
      position: absolute;
      left: 10px;
      content: "";
      height: 1.5rem;
      width: 2px;
      border-radius: 1px;
      background-color: var(--secondaryColor);
      transition: var(--transition1);
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
`

export default CrossIcon
