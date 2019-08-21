const toChunk = (length, r = []) => (acc, cur, i, self) => {
  r = [...r, cur]
  if (!((i + 1) % length) || i === self.length - 1) {
    acc = [...acc, r]
    r = []
  }
  return acc
}

export function chunk(list, length) {
  return list.reduce(toChunk(length), [])
}
