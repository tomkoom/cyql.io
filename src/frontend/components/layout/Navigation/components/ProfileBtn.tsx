import { iSignOut, iUser } from "@/components/icons/Icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/Icon"
import { useAuth } from "@/context/Auth"
import { useAuthenticate, useNav } from "@/hooks"
import { formatIdNormal } from "@/utils/index"
import { useLocation } from "react-router-dom"
import stc from "string-to-color"

export default function ProfileBtn() {
  const { userId } = useAuth()
  const pathname = useLocation().pathname
  const { toProfile } = useNav()
  const { signOut } = useAuthenticate()
  const color = stc(userId)

  const handleProfileClick = (): void => {
    toProfile()
  }

  const handleSignOut = (): void => {
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button className="h-10 font-bold" variant={pathname === "/profile" ? "accent" : "secondary"}>
            <div style={{ backgroundColor: color }} className="h-4 w-4 rounded-full"></div>
            <span>{formatIdNormal(userId)}</span>
            <Icon lucideName="ChevronDown" className="text-coolgray-500" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border animate-in slide-in-from-top-2 border p-2 shadow-lg duration-200" sideOffset={8}>
        <DropdownMenuLabel className="text-foreground px-3 py-2 text-sm font-medium">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">My Account</p>
            <p className="text-muted-foreground !font-mono leading-none">{formatIdNormal(userId)}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleProfileClick}
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-md px-3 py-2.5 text-sm transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground flex h-4 w-4 items-center justify-center">{iUser}</span>
            <span className="flex flex-col">
              <span className="font-medium">View Profile</span>
              <span className="text-muted-foreground">Manage your account</span>
            </span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-md px-3 py-2.5 text-sm transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground flex h-4 w-4 items-center justify-center">{iSignOut}</span>
            <span className="font-medium">Sign Out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
