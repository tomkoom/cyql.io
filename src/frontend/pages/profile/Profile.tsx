import React, { FC } from "react"
import styled from "styled-components"
import { Wallet, Id, Header, Tabs, Upvotes } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProfile } from "@/state/profile/profile"

const Profile: FC = (): JSX.Element => {
  const tab = useAppSelector(selectProfile).tab

  return (
    <ProfileStyled className="wrapper1440">
      <Header />
      <Id />
      <Tabs />
      {tab === "wallet" ? <Wallet /> : <Upvotes />}
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
