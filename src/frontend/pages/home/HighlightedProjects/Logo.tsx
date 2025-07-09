import { LogoLetter } from "@/components/ui"

interface LogoProps {
  name: string
  logo: string
}

export default function Logo({ name, logo }: LogoProps) {
  const size = "4rem"
  const borderRadius = "2rem"
  const style = {
    width: size,
    height: size,
  }

  return logo ? (
    <img className="flex-shrink-0 rounded-2xl object-cover" style={style} src={logo} alt={`${name} logo`} />
  ) : (
    <LogoLetter size={size} borderRadius={borderRadius} name={name} />
  )
}
