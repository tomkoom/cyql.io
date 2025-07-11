import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/Icon"

interface DefaultBtnProps {
  upvotesNum: number
  btnLocation: string
  click: () => void
}

export default function NotSignedBtn({ upvotesNum, btnLocation, click }: DefaultBtnProps) {
  return (
    <div>
      {btnLocation === "project_page" ? (
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-coolgray-900 flex h-10 flex-shrink-0 items-center gap-2 rounded-lg px-3 lg:h-12">
            <p className="text-coolgray-200">
              <Icon lucideName="ChevronUp" />
            </p>
            <p className="text-coolgray-200 font-bold">{upvotesNum}</p>
          </div>
          <Button size="lg" variant="accent" className="h-10 font-bold lg:h-12" onClick={click}>
            <Icon lucideName="LogIn" /> Sign in to Upvote
          </Button>
        </div>
      ) : btnLocation === "project_list" ? (
        <button
          onClick={click}
          className="group text-coolgray-400 hover:text-coolgray-200 border-coolgray-900 hover:border-coolgray-700 mr-2 flex h-12 cursor-pointer items-center justify-center gap-0.5 rounded-md border px-2 text-sm transition-all duration-200"
          aria-label="Sign in to upvote"
        >
          <span>
            <Icon lucideName="ChevronUp" />
          </span>
          <span className="font-medium tabular-nums">{upvotesNum}</span>
        </button>
      ) : null}
    </div>
  )
}
