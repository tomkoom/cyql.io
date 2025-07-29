import { iArrowLeft } from "@/components/icons/Icons"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/hooks"

interface BackBtnProps {
  className?: string
}

export default function BackBtn({ className }: BackBtnProps) {
  const { toBack } = useNavigation()

  return (
    <Button variant="secondary" onClick={toBack} className={className}>
      {iArrowLeft} Back
    </Button>
  )
}
