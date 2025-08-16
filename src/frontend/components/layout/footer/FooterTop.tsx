import { FAIcon } from "@/components/FAIcon"
import { Icon } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { APP_NAME_TLD, DONATION_WALLET, DONATION_WALLET_URL, X_DIRECT_MSG_URL } from "@/constants/constants"
import { ROUTES } from "@/constants/routes"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function FooterTop() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(DONATION_WALLET))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {}
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li>
        <Link to={ROUTES.GET_LISTED} className="group flex cursor-pointer flex-col gap-2">
          <h5 className="text-coolgray-100 flex items-center gap-2 text-lg font-bold">
            <FAIcon name="FaPlus" /> List Your Project
          </h5>
          <p className="text-coolgray-400 group-hover:text-primary leading-relaxed transition-colors">List your project on {APP_NAME_TLD}</p>
        </Link>
      </li>

      <li>
        <a href={X_DIRECT_MSG_URL} rel="noreferrer noopener" target="_blank" className="group flex cursor-pointer flex-col gap-2">
          <h5 className="text-coolgray-100 flex items-center gap-2 text-lg font-bold">
            <FAIcon name="FaComments" /> Reach Out
            <Icon lucideName="ExternalLink" className="text-coolgray-500 h-4 w-4" />
          </h5>
          <p className="text-coolgray-400 group-hover:text-primary leading-relaxed transition-colors">
            Questions or partnerships? DM us — we're happy to help.
          </p>
        </a>
      </li>

      <li>
        <div className="group flex flex-col gap-2">
          <h5 className="text-coolgray-100 flex items-center gap-2 text-lg font-bold">
            <FAIcon name="FaRocket" /> Support
          </h5>
          <p className="text-coolgray-400 leading-relaxed">Support {APP_NAME_TLD} to fuel new features and improvements.</p>

          <div className="border-coolgray-900 bg-coolgray-950/60 mt-1 flex flex-col gap-2 rounded-lg border p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-coolgray-300 font-mono-default truncate text-sm" title={String(DONATION_WALLET)}>
                {String(DONATION_WALLET)}
              </span>
              <Button variant="outline" size="sm" className="h-8 px-2" onClick={handleCopy} aria-live="polite">
                <Icon lucideName={copied ? "Check" : "Copy"} />
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="accentOutline" size="sm" className="h-8">
                <a href={DONATION_WALLET_URL} rel="noreferrer noopener" target="_blank">
                  <Icon lucideName="ExternalLink" /> View on IC Dashboard
                </a>
              </Button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}
