import { Btn } from "@/components/btns"
import { iAngleDown, iSignOut, iUser } from "@/components/icons/Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/Auth"
import { useAuthenticate, useNav } from "@/hooks/_index"
import { formatId, formatIdLong } from "@/utils/_index"
import React from "react"
import { useLocation } from "react-router-dom"

export default function ProfileBtn() {
  const { userId } = useAuth()
  const pathname = useLocation().pathname
  const { toProfile } = useNav()
  const { signOut } = useAuthenticate()

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
          <Btn
            btnType={pathname === "/profile" ? "primary" : "secondary"}
            text={formatId(userId)}
            icon={iAngleDown}
            // onClick={() => {}} // No-op, shadcn handles the dropdown
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 bg-card border border-border shadow-lg animate-in slide-in-from-top-2 duration-200" sideOffset={8}>
        <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-foreground">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="leading-none text-muted-foreground font-mono">{formatIdLong(userId)}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center space-x-3">
            <span className="flex h-4 w-4 items-center justify-center text-muted-foreground">{iUser}</span>
            <span className="flex flex-col">
              <span className="font-medium">View Profile</span>
              <span className="text-muted-foreground">Manage your account</span>
            </span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center space-x-3">
            <span className="flex h-4 w-4 items-center justify-center text-muted-foreground">{iSignOut}</span>
            <span className="font-medium">Sign Out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
