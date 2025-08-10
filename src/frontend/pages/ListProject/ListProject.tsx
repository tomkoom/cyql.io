import { Icon } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { NOTION_LIST_PROJECT_EMBED_URL, NOTION_LIST_PROJECT_FORM_URL } from "@/constants"

export default function ListProject() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="page-title mb-3">List Your Project</h1>
        <p className="text-coolgray-300 mx-auto max-w-3xl text-base leading-snug text-balance sm:text-lg">
          Submit your dapp to be listed on CYQL. The form takes about 30 seconds. You can fill it below or open it in a new tab.
        </p>

        <div className="mt-5 flex justify-center">
          <Button asChild variant="accent" size="lg" className="h-12 text-base font-bold">
            <a href={NOTION_LIST_PROJECT_FORM_URL} target="_blank" rel="noopener noreferrer">
              <Icon lucideName="ExternalLink" />
              Open form in new tab
            </a>
          </Button>
        </div>
      </header>

      <section className="bg-coolgray-950/60 border-coolgray-900 rounded-2xl border">
        <div className="border-coolgray-900/60 text-coolgray-400 rounded-t-2xl border-b p-3 text-center text-sm">Fill the form directly on this page</div>
        <div className="overflow-hidden">
          <iframe
            src={NOTION_LIST_PROJECT_EMBED_URL}
            title="CYQL — List Your Project (Notion Form)"
            className="h-[75vh] w-full rounded-b-2xl sm:h-[80vh]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="border-coolgray-900/60 text-coolgray-500 border-t p-3 text-center text-xs">
          If the form doesn't load, use the button above to open it in a new tab.
        </div>
      </section>
    </div>
  )
}
