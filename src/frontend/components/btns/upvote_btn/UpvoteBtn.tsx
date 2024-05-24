import React, { FC } from "react"
import { useAuth } from "@/context/Auth"
import { useBackend } from "@/hooks/_index"
import { UpvotedStateBtn, DefaultStateBtn } from "./_index"
import type { ProjectId } from "@/state/_types/types"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { setIsLoading } from "@/state/loading"

interface UpvoteBtnProps {
  projectId: string
  location: string
  upvotedBy: string[]
}

const UpvoteBtn: FC<UpvoteBtnProps> = ({ projectId, location, upvotedBy }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId, isAuthenticated } = useAuth()
  const { refreshCuratedProjects, updateCuratedProjectUpvote } = useBackend()
  const upvotesNum = upvotedBy.length
  const isUpvotedByUser = upvotedBy.includes(userId)

  const upvote = async (projectId: string): Promise<void> => {
    dispatch(setIsLoading(true))
    try {
      await updateCuratedProjectUpvote(projectId)
      await refreshCuratedProjects()
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
    return <DefaultStateBtn upvotesNum={upvotesNum} location={location} click={openSignInModal} />
  }

  if (isUpvotedByUser) {
    return (
      <UpvotedStateBtn
        upvotesNum={upvotesNum}
        location={location}
        click={() => upvote(projectId)}
      />
    )
  }

  return (
    <DefaultStateBtn upvotesNum={upvotesNum} location={location} click={() => upvote(projectId)} />
  )
}

export default UpvoteBtn
