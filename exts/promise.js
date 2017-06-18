export const PromiseMap = (array, fn) => {
  return Promise.all(array.map(fn))
}

export const noop = () => {
  return Promise.resolve()
}
