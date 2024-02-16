import { useNavigate, createSearchParams } from "react-router-dom"

const useNav = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const toHome = () => {
    navigate("/")
  }

  const toProjects = () => {
    navigate({
      pathname: "projects",
      search: `?${createSearchParams({
        category: "All",
        q: "",
      })}`,
    })
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
