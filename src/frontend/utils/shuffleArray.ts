export const shuffle1 = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const shuffle2 = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5)
}
