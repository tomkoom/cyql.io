import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

export default function SignInBtn() {
  const dispatch = useAppDispatch()

  const openSignInModal = () => {
    dispatch(setSignInModalIsOpen(true))
  }

  return (
    <Button variant="accent" className="font-bold h-10" onClick={openSignInModal}>
      Sign In
    </Button>
  )
}
