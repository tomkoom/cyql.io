import { Logo } from "@/components/ui/_index"
import { useAuth } from "@/context/Auth"
import { useNav } from "@/hooks"
import React from "react"
import { ProfileBtn, SignInBtn, Socials } from "./components"

export default function Nav() {
  const { toHome } = useNav()
  const { isAuthenticated } = useAuth()

  return (
    <div className="px-4 w-full flex items-center justify-between flex-wrap lg:px-8">
      <Logo onClick={toHome} />
      <div className="flex items-center justify-center flex-wrap gap-1">
        <Socials />
        {isAuthenticated ? <ProfileBtn /> : <SignInBtn />}
      </div>
    </div>
  )
}
