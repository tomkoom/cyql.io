import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/Icon"

interface UnUpvotedBtnProps {
  upvotesNum: number
  btnLocation: string
  click: () => void
}

export default function UnUpvotedBtn({ upvotesNum, btnLocation, click }: UnUpvotedBtnProps) {
  return (
    <div>
      {btnLocation === "project_page" ? (
        <Button size="lg" variant="accent" className="h-10 font-bold lg:h-12" onClick={click}>
          Upvote
          <div className="flex items-center gap-1">
            <span>
              <Icon lucideName="ChevronUp" />
            </span>
            <span>{upvotesNum}</span>
          </div>
        </Button>
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
