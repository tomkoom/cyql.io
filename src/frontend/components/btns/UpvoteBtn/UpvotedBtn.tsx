import { Icon } from "@/components/Icon"
import { Button } from "@/components/ui/button"

interface UpvotedBtnProps {
  upvotesNum: number
  btnLocation: string
  click: () => void
}

export default function UpvotedBtn({ upvotesNum, btnLocation, click }: UpvotedBtnProps) {
  return btnLocation === "project_page" ? (
    <Button size="lg" variant="secondary" className="h-10 font-bold lg:h-12" onClick={click}>
      <Icon lucideName="Check" /> Upvoted
      <div className="flex items-center gap-1">
        <p>
          <Icon lucideName="ChevronUp" />
        </p>
        <p>{upvotesNum}</p>
      </div>
    </Button>
  ) : btnLocation === "project_list" ? (
    <button
      onClick={click}
      className="group text-coolgray-400 hover:text-coolgray-200 border-coolgray-900 hover:border-coolgray-700 mr-2 flex h-12 cursor-pointer items-center justify-center gap-0.5 rounded-md border px-2 text-sm transition-all duration-200"
      aria-label="Sign in to upvote"
    >
      <span>
        <Icon lucideName="Check" />
      </span>
      <span className="font-medium tabular-nums">{upvotesNum}</span>
    </button>
  ) : null
}
