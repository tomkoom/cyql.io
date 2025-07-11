import React from "react"
import styled from "styled-components"
// https://www.npmjs.com/package/react-confetti-explosion
import ConfettiExplosion from "react-confetti-explosion"

const explodeProps = {
  force: 0.6,
  duration: 5000,
  particleCount: 200,
}

const Confetti = () => {
  const [isExploding, setIsExploding] = React.useState(false)

  return (
    <ConfettiStyled>
      <button type="button" onClick={() => setIsExploding(!isExploding)}>
        {isExploding && (
          <div className="source">
            <ConfettiExplosion {...explodeProps} />
          </div>
        )}
        Explode!
      </button>
    </ConfettiStyled>
  )
}

const ConfettiStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  > div.source {
    position: absolute;
    right: 50%;
    left: 50%;
    bottom: 70%;
  }
`

export default Confetti
