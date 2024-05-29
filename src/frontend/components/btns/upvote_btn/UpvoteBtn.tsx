import React, { FC, useState } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"
import { useBackend, useQueryParams } from "@/hooks/_index"
import { UpvotedBtn, UnUpvotedBtn, NotSignedBtn } from "./_index"
// https://www.npmjs.com/package/react-confetti-explosion
import ConfettiExplosion from "react-confetti-explosion"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { setIsLoading } from "@/state/loading"

interface UpvoteBtnProps {
  projectId: string
  location: "project_page" | "project_list"
  upvotedBy: string[]
}

const UpvoteBtn: FC<UpvoteBtnProps> = ({ projectId, location, upvotedBy }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId, isAuthenticated } = useAuth()
  const { refreshPaginated, getProjectById, updateCuratedProjectUpvote } = useBackend()
  const { queryParams } = useQueryParams()
  const [isExploding, setIsExploding] = useState(false)
  const upvotesNum = upvotedBy.length
  const isUpvotedByUser = upvotedBy.includes(userId)

  // confetti
  const duration = 3_000
  const explodeProps = {
    force: 0.8,
    duration,
    particleCount: 120,
    particleSize: 20,
    height: 960,
    width: 1800,
    colors: ["#aeea00", "#ffff00", "#6200ea", "#7c4dff"],
  }

  const updateUpvote = async (): Promise<void> => {
    try {
      await updateCuratedProjectUpvote(projectId)
      await getProjectById(projectId)
      await refreshPaginated(queryParams)

      // confetti
      if (location === "project_page") {
        setIsExploding(true)
        setTimeout(() => {
          setIsExploding(false)
        }, duration)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const downvote = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      await updateUpvote()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const upvote = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      await updateUpvote()
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
    return <NotSignedBtn upvotesNum={upvotesNum} location={location} click={openSignInModal} />
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
        <UpvotedBtn upvotesNum={upvotesNum} location={location} click={downvote} />
      </div>
    )
  }

  return <UnUpvotedBtn upvotesNum={upvotesNum} location={location} click={upvote} />
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
