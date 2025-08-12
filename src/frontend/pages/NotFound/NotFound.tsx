import { Icon } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/hooks"

export default function NotFound() {
  const { toHome, toProjects, toBack } = useNavigation()

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="page-title mb-2">Page not found</h1>
      <p className="text-coolgray-400 mb-6 leading-snug">{"The page you're looking for doesn't exist or has moved."}</p>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="accent" size="lg" className="h-11" onClick={toHome}>
          Go Home
        </Button>
        <Button variant="outline" size="lg" className="h-11" onClick={toProjects}>
          Browse Projects
        </Button>
      </div>

      <Button variant="ghost" className="text-coolgray-400 hover:text-coolgray-300 mt-4 inline-flex items-center gap-2 text-sm" onClick={toBack}>
        <Icon lucideName="ArrowLeft" size={18} />
        Go back
      </Button>
    </div>
  )
}
