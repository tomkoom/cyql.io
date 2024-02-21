import React, { FC } from "react"
import styled from "styled-components"
import Id from "./id/Id"
import { VotingPower, Nfts } from "./_index"

const Profile: FC = (): JSX.Element => {
  return (
    <ProfileStyled>
      <Id />
      <VotingPower />
      <Nfts />
    </ProfileStyled>
  )
}

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin-bottom: 2rem;
`

export default Profile
