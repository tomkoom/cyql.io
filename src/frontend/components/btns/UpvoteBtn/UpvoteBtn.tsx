import { useAuth } from "@/context/Auth"
import { useUpvote } from "@/hooks"
import { FC, useState } from "react"
import styled from "styled-components"
import { NotSignedBtn, UnUpvotedBtn, UpvotedBtn } from "."
// https://www.npmjs.com/package/react-confetti-explosion
import { useAppDispatch } from "@/hooks/useRedux"
import { setIsLoading } from "@/state/loading"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import ConfettiExplosion from "react-confetti-explosion"

interface UpvoteBtnProps {
  projectId: string
  btnLocation: "project_page" | "project_list"
  upvotedBy: string[]
}

const UpvoteBtn: FC<UpvoteBtnProps> = ({ projectId, btnLocation, upvotedBy }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId, isAuthenticated } = useAuth()
  const { updateUpvote } = useUpvote()
  const [isExploding, setIsExploding] = useState(false)
  const upvotesNum = upvotedBy.length
  const isUpvotedByUser = upvotedBy.includes(userId)

  // confetti
  const duration = 2_000
  const explodeProps = {
    force: 0.8,
    duration,
    particleCount: 120,
    particleSize: 20,
    height: 960,
    width: 1800,
    colors: ["#aeea00", "#ffff00", "#6200ea", "#7c4dff"],
  }

  const onUpvote = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      await updateUpvote(projectId, btnLocation, setIsExploding, duration)
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  if (!isAuthenticated) {
    return <NotSignedBtn upvotesNum={upvotesNum} btnLocation={btnLocation} click={openSignInModal} />
  }

  if (isUpvotedByUser) {
    return (
      <div>
        {isExploding && (
          <ConfettiStyled>
            <div className="source">
              <ConfettiExplosion {...explodeProps} />
            </div>
          </ConfettiStyled>
        )}
        <UpvotedBtn upvotesNum={upvotesNum} btnLocation={btnLocation} click={onUpvote} />
      </div>
    )
  }

  return <UnUpvotedBtn upvotesNum={upvotesNum} btnLocation={btnLocation} click={onUpvote} />
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

export default UpvoteBtn
