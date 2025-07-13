import { Button } from "@/components/ui/button"
import { memo } from "react"
import { HOME_CONSTANTS } from "../constants"

interface ErrorStateProps {
  error?: Error | null
  onRetry?: () => void
  title?: string
  message?: string
}

export const ErrorState = memo(({ error, onRetry, title = HOME_CONSTANTS.ERRORS.GENERIC, message = HOME_CONSTANTS.ERRORS.LOADING_FAILED }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12" role="alert">
      <div className="space-y-4 text-center">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <p className="text-coolgray-500 mb-4 max-w-md">{error?.message || message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="default" className="min-w-[120px]">
            {HOME_CONSTANTS.ERRORS.RETRY_BUTTON}
          </Button>
        )}
      </div>
    </div>
  )
})
