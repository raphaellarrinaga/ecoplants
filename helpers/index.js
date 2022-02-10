// @see https://github.com/messerli90/jobhuntbuddy/blob/master/helpers/index.js
export function debounce (fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    const args = arguments
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}
