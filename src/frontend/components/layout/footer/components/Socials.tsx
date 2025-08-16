import { socialLinks } from "@/constants/socialLinks"
import styled from "styled-components"

export default function Socials() {
  return (
    <SocialsStyled>
      {socialLinks.map((s) => (
        <li key={s.id}>
          <a href={s.link} rel="noreferrer noopener" target="_blank">
            {s.icon}
          </a>
        </li>
      ))}
    </SocialsStyled>
  )
}

const SocialsStyled = styled.ul`
  display: flex;
  color: var(--secondaryColor);
  font-size: var(--fs5);

  /* align to the block above */
  margin-left: -0.5rem;
  margin-top: -0.25rem;

  > li {
    > a {
      width: 2.5rem;
      height: 2.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      transition: var(--transition1);

      &:hover {
        color: var(--background);
        background-color: var(--primaryColor);
      }
    }
  }
`
