import styled from "styled-components"

interface NavLinkProps {
  label: string
  route: () => void
}

export default function NavLink({ label, route }: NavLinkProps) {
  return <NavLinkStyled onClick={route}>{label}</NavLinkStyled>
}

const NavLinkStyled = styled.li`
  font-size: var(--fs5);
  font-weight: var(--fwBold);
  color: var(--secondaryColor);
  padding: 0.25rem 0;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
  }
`
