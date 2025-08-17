import { X_DIRECT_MSG_URL } from "@/constants/constants"

export default function PrivacyPolicy() {
  return (
    <div className="text-primary/90 mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-neutral-300">This policy explains how we handle information for our project directory.</p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Information we collect</h2>
      <p className="mb-4 text-neutral-300">
        We collect basic usage data (e.g., pages viewed, device/browser information) to operate and improve the site. If you submit a project or contact us, we
        collect the information you provide (e.g., project details, links, and any messages).
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">How we use information</h2>
      <p className="mb-4 text-neutral-300">
        We use information to run the directory, display listings, prevent abuse, improve performance, and respond to inquiries. We don't sell personal data.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Cookies and storage</h2>
      <p className="mb-4 text-neutral-300">We may use cookies or local storage for authentication, preferences, and basic analytics.</p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Sharing</h2>
      <p className="mb-4 text-neutral-300">
        We may share data with service providers (e.g., hosting, analytics) to operate the site, and when required by law. We link to third-party sites; their
        privacy practices are their own.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Security</h2>
      <p className="mb-4 text-neutral-300">We use reasonable safeguards, but no method is 100% secure.</p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Your choices</h2>
      <p className="mb-4 text-neutral-300">
        Submit only information you're comfortable sharing publicly. To request an update or removal of a listing, contact us on X:
        <a className="text-accent-3 hover:text-accent-3/80 ml-1 font-semibold" href={X_DIRECT_MSG_URL} target="_blank" rel="noreferrer noopener">
          Direct Message
        </a>
        .
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Changes</h2>
      <p className="mb-4 text-neutral-300">We may update this policy. Continued use of the site means you accept the changes.</p>
    </div>
  )
}
