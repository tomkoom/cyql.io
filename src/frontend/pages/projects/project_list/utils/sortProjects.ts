const sortNewest = (a: number, b: number): number => {
  return b - a
}

const sortOldest = (a: number, b: number): number => {
  return a - b
}

const sortMostUp = (a: number, b: number): number => {
  return b - a
}

const sortLeastUp = (a: number, b: number): number => {
  return a - b
}

export { sortNewest, sortOldest, sortMostUp, sortLeastUp }
