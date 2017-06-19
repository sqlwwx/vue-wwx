let loadHistory = {}

export default (url) => {
  if (loadHistory[url]) {
    return loadHistory[url]
  }
  var link = document.createElement('link')
  let promise = new Promise((resolve) => {
    link.onload = () => {
      resolve()
    }
  })
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', url)
  let headScript = document.querySelector('script')
  headScript.parentNode.insertBefore(link, headScript)
  loadHistory[url] = promise
  return promise
}
