import { IC_LOGO } from "@/constants/constants"
import { useAuthenticate } from "@/hooks"
import { Btn } from "."

export default function SignInMethods() {
  const { signIn } = useAuthenticate()

  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: IC_LOGO,
      click: signIn,
      aboutUrl: "https://identity.ic0.app/",
    },
  ]

  return (
    <div className="space-y-4">
      {signInMethods.map((signInMethod) => (
        <div key={signInMethod.id} className="space-y-2">
          <Btn label={signInMethod.label} logo={signInMethod.logo} onClick={signInMethod.click} />
        </div>
      ))}
    </div>
  )
}
