interface DescriptionProps {
  name: string
  description: string
}

export default function Description({ name, description }: DescriptionProps) {
  if (!description) return null

  return (
    <div className="bg-coolgray-950/50 rounded-xl p-4">
      <h2 className="text-coolgray-200 mb-1 text-lg font-bold">About {name}</h2>
      <p className="text-coolgray-500 text-sm leading-[150%] md:text-base">{description}</p>
    </div>
  )
}
