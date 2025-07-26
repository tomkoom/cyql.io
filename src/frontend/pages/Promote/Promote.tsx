import { Icon } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { THIINGS_ICONS } from "@/constants"
import { X_PROMOTE_URL } from "@/constants/constants"

export default function Promote() {
  const features = [
    {
      icon: THIINGS_ICONS.STAR_2,
      title: "Featured Listings",
      description: "Get top placement in our project directory for maximum visibility and increased user discovery",
    },
    {
      icon: THIINGS_ICONS.TRENDING_UP,
      title: "Social Promotion",
      description: "We'll showcase your dapp on our social media channels to boost your reach and engagement",
    },
    {
      icon: THIINGS_ICONS.SPACE_CRAFT,
      title: "Community Exposure",
      description: "Connect with the growing Internet Computer ecosystem and find your target audience",
    },
  ]

  const handleContactClick = () => {
    window.open(X_PROMOTE_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="page-title mb-4">Promote Your Dapp</h1>
        <p className="text-coolgray-300 mx-auto max-w-3xl text-xl leading-relaxed">
          Get your decentralized application discovered by the Internet Computer community. Increase visibility and grow your user base with our promotion
          services.
        </p>
      </header>

      <main className="mb-12">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group bg-coolgray-950 hover:border-coolgray-700 rounded-3xl p-8 transition-colors duration-300">
              <div className="mb-6 flex justify-center">
                <div className="bg-coolgray-900 rounded-full p-6">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-130 group-hover:rotate-9"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-coolgray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center">
        <div className="bg-coolgray-950/50 border-coolgray-900 rounded-2xl border p-10">
          <h2 className="mb-2 text-3xl font-bold text-white">Ready to Promote Your Dapp?</h2>
          <p className="text-coolgray-400 mx-auto mb-4 max-w-2xl text-lg leading-relaxed">
            Contact us to discuss promotion opportunities and get your project in front of the ICP community.
          </p>
          <Button variant="accent" size="lg" onClick={handleContactClick} className="h-12 text-lg font-bold">
            <Icon lucideName="ExternalLink" />
            Contact on X
          </Button>
        </div>
      </footer>
    </div>
  )
}
