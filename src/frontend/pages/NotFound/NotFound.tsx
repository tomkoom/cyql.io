import { useNavigation } from "@/hooks"

interface NotFoundProps {
  text: string
}

export default function NotFound({ text }: NotFoundProps) {
  const { toHome } = useNavigation()

  return (
    <div className="p-4 text-center">
      <p className="text-coolgray-500">
        {text}.{" "}
        <span className="text-accent-3 cursor-pointer underline" onClick={toHome}>
          Back to Homepage
        </span>
      </p>
    </div>
  )
}
