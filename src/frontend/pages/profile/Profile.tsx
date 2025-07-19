import { useAppSelector } from "@/hooks/useRedux"
import { selectProfile } from "@/state/profile/profile"
import styled from "styled-components"
import { Header, Id, Tabs, Upvotes, Wallet } from "."

export default function Profile() {
  const tab = useAppSelector(selectProfile).tab

  return (
    <ProfileStyled className="wrapper1440">
      <Header />
      <Id />
      <Tabs />
      {tab === "upvotes" ? <Upvotes /> : <Wallet />}
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
