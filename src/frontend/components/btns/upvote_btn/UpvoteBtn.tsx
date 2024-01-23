import React, { FC } from "react"
import { useAuth } from "@/context/Auth"
import useBackend from "@/hooks/useBackend"
import type { Project } from "@/state/_types/types"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModal } from "@/state/modals/modals"

// components
import { UpvotedStateBtn, DefaultStateBtn } from "./_index"

interface UpvoteBtnProps {
  id: string
  upvotedBy: string[]
}

const UpvoteBtn: FC<UpvoteBtnProps> = ({ id, upvotedBy }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userId, isAuthenticated } = useAuth()
  const { getProject, insertProject, refreshProjects } = useBackend()
  const upvotesNum = upvotedBy.length
  const isUpvotedByUser = upvotedBy.length > 0 && upvotedBy.includes(userId)

  const upvote = async (id: string): Promise<void> => {
    // open loading modal

    // get project
    const project: Project = await getProject(id)

    // upvote
    if (project) {
      const { upvotedBy } = project
      upvotedBy.push(userId)

      const upvoted = {
        ...project,
        upvotedBy,
      }
      console.log(upvoted)

      // insert
      await insertProject(upvoted.id, upvoted)

      // refresh data
      refreshProjects()

      // close loading modal
      // notify
    }
  }

  const unUpvote = async (id: string) => {}

  const openSignInModal = () => {
    dispatch(setSignInModal(true))
  }

  if (!isAuthenticated) {
    return <DefaultStateBtn upvotesNum={upvotesNum} click={openSignInModal} />
  }

  return isUpvotedByUser ? (
    <UpvotedStateBtn upvotesNum={upvotesNum} click={() => unUpvote(id)} />
  ) : (
    <DefaultStateBtn upvotesNum={upvotesNum} click={() => upvote(id)} />
  )
}

export default UpvoteBtn
