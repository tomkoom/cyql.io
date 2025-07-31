import { useUsersQuery } from "@/hooks/queries/useUsersQuery"
import { formatDateTime } from "@/utils"

export default function Users() {
  const { data: users, isLoading, error } = useUsersQuery()

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="text-coolgray-300">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="text-red-400">Error loading users: {(error as Error).message}</div>
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="text-coolgray-300">No users found</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Users ({users.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-coolgray-900 w-full rounded-lg text-sm">
          <thead>
            <tr className="border-coolgray-700 border-b">
              <th className="text-coolgray-300 px-4 py-3 text-left font-medium">User ID</th>
              <th className="text-coolgray-300 px-4 py-3 text-left font-medium">Registered At</th>
              <th className="text-coolgray-300 px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`border-coolgray-800 hover:bg-coolgray-850 border-b ${index === users.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-4 py-3">
                  <div className="text-coolgray-100 font-mono">
                    {user.id.slice(0, 20)}...{user.id.slice(-8)}
                  </div>
                </td>
                <td className="text-coolgray-200 px-4 py-3">{formatDateTime(Number(user.registeredAt) / 1_000_000)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => navigator.clipboard.writeText(user.id)} className="text-xs text-blue-400 transition-colors hover:text-blue-300">
                    Copy ID
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
