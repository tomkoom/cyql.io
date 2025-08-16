import { useEffect } from "react"

const gaId = process.env.GA_ID

if (!gaId) {
  console.warn("GA_ID is not set")
}

export default function Analytics() {
  useEffect(() => {
    if (!gaId) return

    // Load GA script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    // Init gtag
    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      ;(window as any).dataLayer.push(args)
    }
    ;(window as any).gtag = gtag

    gtag("js", new Date())
    gtag("config", gaId)
  }, [])

  return null
}
