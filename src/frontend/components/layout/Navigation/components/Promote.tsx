import { Icon, LucideIconsKeys } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X_PROMOTE_URL } from "@/constants/constants"

interface PromoteProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export default function Promote({ dialogOpen, setDialogOpen }: PromoteProps) {
  const features = [
    {
      icon: "Star",
      title: "Featured Listings",
      description: "Get top placement in our project directory for maximum visibility",
    },
    {
      icon: "Rocket",
      title: "Social Promotion",
      description: "We'll shout you out on social media to boost your visibility",
    },
  ]

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="bg-coolgray-950 hover:bg-coolgray-900 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 !font-mono text-xs font-bold transition-colors">
          <span className="text-accent-2">
            <Icon lucideName="Zap" />
          </span>{" "}
          Promote your dapp
        </button>
      </DialogTrigger>
      <DialogContent className="border-coolgray-950" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white">Promote Your Dapp</DialogTitle>
            <button
              className="bg-coolgray-950 hover:bg-coolgray-900 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors"
              onClick={() => setDialogOpen(false)}
            >
              <Icon lucideName="X" className="text-coolgray-400 h-5 w-5 text-sm" />
            </button>
          </div>

          <DialogDescription className="text-coolgray-300 mt-2 text-base">Get your decentralized application discovered by the ICP community</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {features.map((feature) => (
              <div key={feature.title} className="bg-coolgray-950 flex items-start gap-3 rounded-lg p-4">
                <Icon lucideName={feature.icon as LucideIconsKeys} className="text-accent-2 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-coolgray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button size="lg" variant="outline" onClick={() => setDialogOpen(false)}>
            Maybe Later
          </Button>
          <Button
            size="lg"
            onClick={() => {
              // window.open(X_URL, "_blank", "noopener,noreferrer")
              window.open(X_PROMOTE_URL, "_blank", "noopener,noreferrer")
              setDialogOpen(false)
            }}
            className="bg-accent-1 hover:bg-accent-2 font-medium text-white"
          >
            <Icon lucideName="ExternalLink" className="mr-2 h-4 w-4" />
            Contact on X
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
