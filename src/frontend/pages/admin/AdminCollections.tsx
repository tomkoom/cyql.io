import { Collections } from "."

export default function AdminCollections() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Collections</h3>
      </div>

      <Collections />
    </div>
  )
}
