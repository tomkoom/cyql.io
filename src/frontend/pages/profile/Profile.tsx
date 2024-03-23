import React, { FC } from "react"
import styled from "styled-components"
import { VotingPower, Nfts, Wallet, Id } from "./_index"
import { formatId } from "@/utils/format"
import { useAuth } from "@/context/Auth"

const Profile: FC = (): JSX.Element => {
  const { userId } = useAuth()

  return (
    <ProfileStyled>
      <h2 className="pageTitle">{formatId(userId)}</h2>
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
