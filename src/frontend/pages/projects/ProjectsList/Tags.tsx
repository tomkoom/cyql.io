interface TagsProps {
  category: string[]
}

export default function Tags({ category }: TagsProps) {
  if (category.length < 1) return null

  return (
    <ul className="flex flex-wrap items-center gap-1">
      {category.map((category) => (
        <li key={category.toLowerCase()} className="bg-coolgray-950 text-coolgray-300 flex h-6 items-center gap-2 rounded-sm px-2 !font-mono text-xs">
          {category}
        </li>
      ))}
    </ul>
  )
}
