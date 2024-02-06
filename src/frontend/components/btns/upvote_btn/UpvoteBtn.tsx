import React, { FC } from "react"
import { useAuth } from "@/context/Auth"
import { useBackend } from "@/hooks/_index"
import { UpvotedStateBtn, DefaultStateBtn } from "./_index"
import type { ProjectId } from "@/state/_types/types"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModal } from "@/state/modals/modals"
import { setIsLoading } from "@/state/loading"

interface UpvoteBtnProps {
  projectId: string
  location: string
  upvotedBy: string[]
}

const UpvoteBtn: FC<UpvoteBtnProps> = ({ projectId, location, upvotedBy }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId, isAuthenticated } = useAuth()
  const { refreshProjects, updateUpvote } = useBackend()
  const upvotesNum = upvotedBy.length
  const isUpvotedByUser = upvotedBy.includes(userId)

  const upvote = async (projectId: string): Promise<void> => {
    const id: ProjectId = Number(projectId)
    dispatch(setIsLoading(true))
    await updateUpvote(id).catch((err) => {
      dispatch(setIsLoading(false))
      throw new Error(err)
    })
    await refreshProjects()
    dispatch(setIsLoading(false))
  }

  const openSignInModal = (): void => {
    dispatch(setSignInModal(true))
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
