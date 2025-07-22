import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-coolgray-950/50 text-coolgray-600 rounded-lg p-3 text-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between">
          <span>Disclaimer</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden transition-[max-height] duration-200 ease-out data-[state=closed]:max-h-0 data-[state=open]:max-h-96">
          <div className="pt-3">
            <p className="leading-[150%]">
              The information presented on this site has been provided by third parties and is made available solely for general information purposes. cyql.io
              does not warrant the accuracy of given information. The information should not be construed as professional or financial advice of any kind.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
