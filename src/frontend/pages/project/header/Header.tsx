import { ProjectLogo } from "@/components"
import { UpvoteBtn } from "@/components/btns"
import { Icon } from "@/components/Icon"
import { iCircleNodes, iEdit, iGithub } from "@/components/icons/Icons"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/Auth"
import { useAppDispatch } from "@/hooks/useRedux"
import Btn from "@/pages/Project/Header/Btn"
import { setAdminIsModalOpen, setAdminMode, setAdminProject } from "@/state/admin/admin"
import { setShareModal } from "@/state/modals/shareModal"
import { Project } from "@/state/types/Project"
import { verifyAdmin } from "@/utils/verifyAdmin"

interface HeaderProps {
  project: Project
}

export default function Header({ project }: HeaderProps) {
  const dispatch = useAppDispatch()
  const { userId } = useAuth()

  const openEditModal = () => {
    dispatch(setAdminProject(project))
    dispatch(setAdminMode("edit"))
    dispatch(setAdminIsModalOpen(true))
  }

  const openShareModal = () => {
    dispatch(setShareModal(true))
  }

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <ProjectLogo project={project} sizeRem="100%" borderRadiusRem="100%" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-black break-all sm:text-2xl lg:text-3xl">{project.name}</h1>

          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {project.category.length > 0 &&
              project.category.map((category) => (
                <li
                  key={category}
                  className="bg-coolgray-950/80 text-coolgray-400 flex h-6 items-center rounded-sm px-2 text-xs font-medium sm:h-8 sm:rounded-md sm:text-sm"
                >
                  {category}
                </li>
              ))}

            {/* Open Source tag */}
            {project.github && (
              <li className="bg-coolgray-950/80 flex h-6 items-center gap-1 rounded-sm px-2 text-xs font-medium text-sky-700 sm:h-8 sm:rounded-md sm:text-sm">
                <span className="">{iGithub}</span>
                <span>Open-Source</span>
              </li>
            )}

            {/* On-Chain tag */}
            {project.frontendCanisterId && (
              <li className="bg-coolgray-950/80 flex h-6 items-center gap-1 rounded-sm px-2 text-xs font-medium text-indigo-700 sm:h-8 sm:rounded-md sm:text-sm">
                <span className="">{iCircleNodes}</span>
                <span>On-Chain</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {verifyAdmin(userId) && <Btn icon={iEdit} onClick={openEditModal} />}
        <Button size="lg" variant="secondary" className="group flex h-13 w-13 items-center justify-center rounded-full" onClick={openShareModal}>
          <Icon lucideName="Share" className="text-coolgray-400 transition-colors group-hover:text-white" />
        </Button>
        <UpvoteBtn projectId={project.id} btnLocation={"project_page"} upvotedBy={project.upvotedBy} />
      </div>
    </div>
  )
}
