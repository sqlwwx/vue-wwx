export const PromiseMap = (array, fn) => {
  return Promise.all(array.map(fn))
}
