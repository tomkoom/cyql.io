import { formatDateTime } from "@/utils/index"

interface PublishedProps {
  createdAt: string
}

export default function Published({ createdAt }: PublishedProps) {
  if (!createdAt) return null
  return <div className="text-coolgray-500">Published {formatDateTime(Number(createdAt))}</div>
}
