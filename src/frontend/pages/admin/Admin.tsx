import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminIsModalOpen, setAdminMode } from "@/state/admin/admin"
import { useState } from "react"
import { Collections, Projects, Search } from "."

export default function Admin() {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<"projects" | "collections">("projects")

  const openAdminModal = () => {
    dispatch(setAdminMode("add"))
    dispatch(setAdminIsModalOpen(true))
  }

  return (
    <div className="laptop:px-4">
      <header className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="page-title">Admin</h2>
          {activeTab === "projects" && (
            <Button variant="accent" className="h-11 font-bold" onClick={openAdminModal}>
              Add Project
            </Button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex space-x-1">
          <button
            onClick={() => setActiveTab("projects")}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              activeTab === "projects" ? "bg-blue-600 text-white" : "bg-coolgray-800 text-coolgray-300 hover:bg-coolgray-700"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              activeTab === "collections" ? "bg-blue-600 text-white" : "bg-coolgray-800 text-coolgray-300 hover:bg-coolgray-700"
            }`}
          >
            Collections
          </button>
        </div>

        {activeTab === "projects" && <Search />}
      </header>

      <main>{activeTab === "projects" ? <Projects /> : <Collections />}</main>
    </div>
  )
}
