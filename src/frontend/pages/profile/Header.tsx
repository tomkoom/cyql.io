import { useAuth } from "@/context/Auth"
import { formatId } from "@/utils/index"

export default function Header() {
  const { userId } = useAuth()

  return (
    <div>
      <h2 className="page-title">{formatId(userId)}</h2>
      <p className="text-coolgray-500">{userId}</p>
    </div>
  )
}
