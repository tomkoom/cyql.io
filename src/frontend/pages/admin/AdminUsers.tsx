import { Users } from "."

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Users</h3>
      </div>

      <Users />
    </div>
  )
}
