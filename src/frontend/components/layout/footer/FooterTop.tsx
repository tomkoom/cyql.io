import { FAIcon } from "@/components/FAIcon"
import { APP_NAME_TLD, DONATION_WALLET_URL, X_DIRECT_MSG_URL } from "@/constants/constants"
import { ROUTES } from "@/constants/routes"
import { device } from "@/styles/breakpoints"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function FooterTop() {
  return (
    <FooterUpperStyled>
      <li>
        <Link to={ROUTES.GET_LISTED}>
          <h5 className="flex items-center gap-2">
            <FAIcon name="FaPlus" /> List Your Project
          </h5>
          <p>Submit your project to the cyql db</p>
        </Link>
      </li>

      <li>
        <a href={X_DIRECT_MSG_URL} rel="noreferrer noopener" target="_blank">
          <h5 className="flex items-center gap-2">
            <FAIcon name="FaComments" /> Reach Out
          </h5>
          <p>Didn't find what you were looking for or want to collaborate? Reach out for us, we are happy to support and cooperate</p>
        </a>
      </li>

      <li>
        <a href={DONATION_WALLET_URL} rel="noreferrer noopener" target="_blank">
          <h5 className="flex items-center gap-2">
            <FAIcon name="FaHeart" /> Donate
          </h5>
          <p>{APP_NAME_TLD} is developed and maintained by the IC enthusiasts. You can support the project by making a donation</p>
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
