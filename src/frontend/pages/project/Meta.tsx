import { X_DIRECT_MSG_URL } from "@/constants/constants"

export default function Meta() {
  return (
    <a
      href={X_DIRECT_MSG_URL}
      className="mb-4 inline-block text-sm text-[var(--tertiaryColor)] transition-[var(--transition1)] hover:shadow-[0_2px_0_var(--tertiaryColor)]"
      target="_blank"
      rel="noreferrer noopener"
    >
      Edit project
    </a>
  )
}
