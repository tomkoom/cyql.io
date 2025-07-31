import { AdminNavigation } from "@/components"
import { ROUTES } from "@/constants"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export default function Admin() {
  const location = useLocation()
  const navigate = useNavigate()

  // Redirect to projects by default when on /admin
  useEffect(() => {
    if (location.pathname === ROUTES.ADMIN) {
      navigate(ROUTES.ADMIN_PROJECTS, { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <div className="laptop:px-4">
      <AdminNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
