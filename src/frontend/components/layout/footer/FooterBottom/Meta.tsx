import { APP_NAME_TLD, FRONTEND_CANISTER_URL, IC_LOGO } from "@/constants/constants"

export default function Meta() {
  const year = new Date().getFullYear()

  return (
    <div className="flex flex-col space-y-0.5">
      <div className="text-coolgray-400 flex items-center gap-2 text-sm">
        Powered by{" "}
        <a
          className="hover:text-primary flex items-center gap-2 transition-colors"
          href="https://internetcomputer.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img className="max-w-5" src={IC_LOGO} alt="Internet Computer logo" />
          Internet Computer
        </a>
      </div>
      <p className="text-coolgray-400 text-sm">
        On-chain:{" "}
        <a className="hover:text-primary transition-colors" href={FRONTEND_CANISTER_URL} target="_blank" rel="noreferrer noopener">
          {FRONTEND_CANISTER_URL.replace("https://", "")}
        </a>
      </p>
      <p className="text-coolgray-400 text-sm">
        &copy; {year.toString()} {APP_NAME_TLD}. All rights reserved.
      </p>
    </div>
  )
}
