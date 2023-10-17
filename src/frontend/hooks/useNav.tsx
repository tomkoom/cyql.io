import { useNavigate } from "react-router-dom"

const useNav = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const toHome = () => {
    navigate("/")
  }

  const toProjects = () => {
    navigate("/projects")
  }

  const toProject = (id: string) => {
    navigate(`/projects/${id}`)
  }

  const toSubmit = () => {
    navigate("/submit")
  }

  const toProfile = () => {
    navigate("/profile")
  }

  const toAdmin = () => {
    navigate("/admin")
  }

  return {
    goBack,
    toHome,
    toProjects,
    toProject,
    toSubmit,
    toProfile,
    toAdmin,
  }
}

export default useNav
