import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/Icon"
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

export default function SignInBtn() {
  const dispatch = useAppDispatch()

  const openSignInModal = () => {
    dispatch(setSignInModalIsOpen(true))
  }

  return (
    <Button variant="accent" className="h-10 font-bold" onClick={openSignInModal}>
      <Icon lucideName="LogIn" /> Sign In
    </Button>
  )
}
