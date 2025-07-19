import { iComments, iHeart, iPlus } from "@/components/icons/Icons"
import { CYQL_MSG_URL, DONATION_WALLET_URL } from "@/constants/constants"
import { device } from "@/styles/breakpoints"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function FooterTop() {
  return (
    <FooterUpperStyled>
      {/* submit */}
      <li>
        <Link to="/list">
          <h5>{iPlus}&nbsp;&nbsp;List Your Project</h5>
          <p>Submit your project to the cyql db</p>
        </Link>
      </li>

      {/* reach out */}
      <li>
        <a href={CYQL_MSG_URL} rel="noreferrer noopener" target="_blank">
          <h5>{iComments}&nbsp;&nbsp;Reach Out</h5>
          <p>Didn't find what you were looking for or want to collaborate? Reach out for us, we are happy to support and cooperate</p>
        </a>
      </li>

      {/* donate */}
      <li>
        <a href={DONATION_WALLET_URL} rel="noreferrer noopener" target="_blank">
          <h5>{iHeart}&nbsp;&nbsp;Donate</h5>
          <p>cyql is developed and maintained by the IC enthusiasts. You can support the project by making a donation</p>
        </a>
      </li>
    </FooterUpperStyled>
  )
}

const FooterUpperStyled = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1.5rem;

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }

  > li {
    > a {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      cursor: pointer;

      > p {
        transition: var(--transition1);
      }

      &:hover > p {
        color: var(--primaryColor);
      }

      > h5 {
        font-size: var(--fs5);
        font-weight: var(--fwBold);
      }

      > p {
        line-height: 150%;
        color: var(--secondaryColor);

        /* break word */
        display: inline-block;
        word-wrap: break-word;
      }
    }
  }
`
