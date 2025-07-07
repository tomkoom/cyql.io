import { COOKIE_POLICY } from "@/constants/constants"
import CookieConsent from "react-cookie-consent"
import "./Cookie.css"

export default function Cookie() {
  // Function to reset cookie consent (for development/testing)
  // const resetCookieConsent = () => {
  //   document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  //   window.location.reload()
  // }

  return (
    <>
      <CookieConsent
        cookieName="cookie"
        disableStyles={true}
        buttonText="Ok"
        containerClasses="cookie"
        contentClasses="cookie__content"
        buttonClasses="cookie__btn"
        expires={90}
      >
        🍪 We use{" "}
        <a className="cookie__link" href={COOKIE_POLICY} rel="noreferrer noopener" target="_blank">
          cookies
        </a>
      </CookieConsent>

      {/* Development helper - remove in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <button 
          onClick={resetCookieConsent}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 9999,
            padding: '5px 10px',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Reset Cookie Banner
        </button>
      )} */}
    </>
  )
}
