import { formatDateTime } from "@/utils/index"

interface UpdatedProps {
  updatedAt: string
}

export default function Updated({ updatedAt }: UpdatedProps) {
  if (!updatedAt) return null
  return <div className="text-coolgray-500">Updated {formatDateTime(Number(updatedAt))}</div>
}
