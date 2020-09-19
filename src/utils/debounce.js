export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearInterval(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}