import { useNavigate, createSearchParams } from "react-router-dom"

const useNav = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const toHome = () => {
    navigate("/")
  }

  const toProjects = (): void => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "All",
        q: "",
      })}`,
    })
  }

  const toProject = (id: string): void => {
    navigate(`/projects/${id}`)
  }

  const toSubmit = (): void => {
    navigate("/list")
  }

  const toProfile = (): void => {
    navigate("/profile")
  }

  const toAdmin = (): void => {
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
