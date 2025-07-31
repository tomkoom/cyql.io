import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { Link, useLocation } from "react-router-dom"

export default function AdminNavigation() {
  const location = useLocation()

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === ROUTES.ADMIN_PROJECTS) return "projects"
    if (location.pathname === ROUTES.ADMIN_COLLECTIONS) return "collections"
    if (location.pathname === ROUTES.ADMIN_USERS) return "users"
    return "projects"
  }

  const activeTab = getActiveTab()

  return (
    <header className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="page-title">Admin</h2>

        {/* Header Navigation Buttons */}
        <div className="flex space-x-2">
          <Button variant={activeTab === "projects" ? "default" : "outline"} size="sm" asChild>
            <Link to={ROUTES.ADMIN_PROJECTS}>Projects</Link>
          </Button>
          <Button variant={activeTab === "collections" ? "default" : "outline"} size="sm" asChild>
            <Link to={ROUTES.ADMIN_COLLECTIONS}>Collections</Link>
          </Button>
          <Button variant={activeTab === "users" ? "default" : "outline"} size="sm" asChild>
            <Link to={ROUTES.ADMIN_USERS}>Users</Link>
          </Button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-coolgray-800 mb-6 flex space-x-1 border-b pb-4">
        <Link
          to={ROUTES.ADMIN_PROJECTS}
          className={`rounded-lg px-4 py-3 font-medium transition-colors ${
            activeTab === "projects" ? "bg-blue-600 text-white" : "bg-coolgray-800 text-coolgray-300 hover:bg-coolgray-700"
          }`}
        >
          Projects
        </Link>
        <Link
          to={ROUTES.ADMIN_COLLECTIONS}
          className={`rounded-lg px-4 py-3 font-medium transition-colors ${
            activeTab === "collections" ? "bg-blue-600 text-white" : "bg-coolgray-800 text-coolgray-300 hover:bg-coolgray-700"
          }`}
        >
          Collections
        </Link>
        <Link
          to={ROUTES.ADMIN_USERS}
          className={`rounded-lg px-4 py-3 font-medium transition-colors ${
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-coolgray-800 text-coolgray-300 hover:bg-coolgray-700"
          }`}
        >
          Users
        </Link>
      </div>
    </header>
  )
}
