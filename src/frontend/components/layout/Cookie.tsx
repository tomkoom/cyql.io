import React, { FC } from "react"
import CookieConsent from "react-cookie-consent"
import { COOKIE_POLICY } from "@/constants/constants"
import "./Cookie.css"

const Cookie: FC = (): JSX.Element => {
  return (
    <CookieConsent
      cookieName="cookie"
      disableStyles={true}
      buttonText="Ok"
      containerClasses="cookie"
      contentClasses="cookie__content"
      buttonClasses="cookie__btn"
      expires={90}
    >
      This site uses 🍪 to enhance ux,{" "}
      <a className="cookie__link" href={COOKIE_POLICY} rel="noreferrer noopener" target="_blank">
        learn more
      </a>
    </CookieConsent>
  )
}

export default Cookie
