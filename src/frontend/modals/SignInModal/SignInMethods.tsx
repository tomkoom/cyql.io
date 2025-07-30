import { Icon } from "@/components/Icon"
import { IC_LOGO } from "@/constants/constants"
import { useAuthenticate } from "@/hooks"

export default function SignInMethods() {
  const { signIn } = useAuthenticate()

  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: IC_LOGO,
      onClick: signIn,
      aboutUrl: "https://identity.ic0.app/",
    },
  ]

  return (
    <div className="space-y-4">
      {signInMethods.map((signInMethod) => (
        <div key={signInMethod.id} className="space-y-2">
          <button
            onClick={signInMethod.onClick}
            className="bg-coolgray-950 hover:bg-coolgray-900 w-full cursor-pointer rounded-lg p-4 transition-colors duration-200"
            aria-label={`Sign in with ${signInMethod.label}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-background flex items-center justify-center rounded-full p-2">
                  <img src={signInMethod.logo} alt={`${signInMethod.label} logo`} className="h-8 w-8 object-contain" />
                </div>
                <div className="text-left">
                  <h3 className="text-foreground text-lg font-medium">Continue with {signInMethod.label}</h3>
                  <p className="text-coolgray-500 text-sm">Secure Web3 authentication</p>
                </div>
              </div>

              <Icon lucideName="ChevronRight" className="text-muted-foreground h-5 w-5" />
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}
