import React, { FC } from "react"
import styled from "styled-components"
import { VotingPower, Nfts, Wallet, Id } from "./_index"

const Profile: FC = (): JSX.Element => {
  return (
    <ProfileStyled>
      <Id />
      <VotingPower />
      <Nfts />
      <Wallet />
    </ProfileStyled>
  )
}

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  margin-bottom: 4rem;
`

export default Profile
