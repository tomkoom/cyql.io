export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp)

  const optionsDate = { year: "numeric", month: "short", day: "numeric" } as const
  const formatterDate = date.toLocaleDateString("en-US", optionsDate)

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as const

  const formatterTime = new Intl.DateTimeFormat("en-US", optionsTime)
  const formattedTime = formatterTime.format(date)

  return formatterDate + " " + formattedTime
}
