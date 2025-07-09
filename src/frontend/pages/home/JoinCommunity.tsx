import { Icon } from "@/components/ui/Icon"
import { DISCORD_URL, X_URL } from "@/constants/constants"
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JoinCommunity() {
  const links = [
    {
      id: "x",
      label: "X",
      fullLabel: "Follow us on X",
      link: X_URL,
      icon: <FontAwesomeIcon icon={faXTwitter} className="text-xl transition-all duration-300 ease-out" />,
      description: "Latest updates & announcements",
    },
    {
      id: "discord",
      label: "Discord",
      fullLabel: "Join our Discord",
      link: DISCORD_URL,
      icon: <FontAwesomeIcon icon={faDiscord} className="text-xl transition-all duration-300 ease-out" />,
      description: "Community discussions & support",
    },
  ]

  return (
    <>
      <section className="animate-fadeInUp">
        <header className="mb-8 text-center max-md:mb-6">
          <h2 className="text-foreground mb-2 text-2xl leading-tight font-bold">Join Our Community</h2>
          <p className="text-muted-foreground text-base font-normal">Connect with us and stay updated</p>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 max-md:grid-cols-1 max-md:gap-3.5">
          {links.map(({ id, fullLabel, link, icon, description }, index) => (
            <div
              key={`${id}-url`}
              className="animate-scaleIn opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <a
                id={id}
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${fullLabel} - ${description}`}
                data-platform={id}
                className="group bg-card text-foreground focus-visible:border-ring focus-visible:ring-ring/20 relative flex items-center gap-4 overflow-hidden rounded-[var(--radius)] border border-transparent p-5 no-underline shadow-sm transition-colors duration-300 ease-out hover:bg-[var(--coolGray100)] focus-visible:ring-4 focus-visible:outline-none max-md:gap-3.5 max-md:p-4"
              >
                {/* Icon Container */}
                <div
                  className={`bg-secondary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out max-md:h-11 max-md:w-11 ${
                    id === "x"
                      ? "group-hover:scale-110 group-hover:bg-black group-hover:text-white"
                      : "group-hover:scale-110 group-hover:bg-[#5865f2] group-hover:text-white"
                  } `}
                >
                  {icon}
                </div>

                {/* Content Container */}
                <div className="min-w-0 flex-1">
                  <div className="text-foreground mb-1 flex items-center gap-2 text-base leading-tight font-medium">
                    {fullLabel}
                    <span className="text-muted-foreground group-hover:text-secondary-foreground text-sm transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <Icon lucideName="ExternalLink" />
                    </span>
                  </div>
                  <div className="text-muted-foreground group-hover:text-secondary-foreground text-sm leading-relaxed transition-colors duration-200">
                    {description}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </>
  )
}
