let loadHistory = {}

export const loadScripts = (urls) => {
  return Promise.map(urls, (url) => {
    return loadScript(url)
  })
}

const loadScript = (url) => {
  if (loadHistory[url]) {
    return loadHistory[url]
  } else {
    let script = document.createElement('SCRIPT')
    let promise = new Promise((resolve) => {
      const indexOfCallback = url.indexOf('callback=')
      if (indexOfCallback === -1) {
        script.addEventListener('load', resolve)
      } else {
        const methodName = url.substring(indexOfCallback + 9).split('&')[0]
        if (window[methodName]) {
          const method = window[methodName]
          window[methodName] = (arg0, arg1) => {
            method(arg0, arg1)
            resolve()
          }
        } else {
          window[methodName] = resolve
        }
      }
    })
    loadHistory[url] = promise
    script.setAttribute('src', url)
    script.setAttribute('async', '')
    script.setAttribute('defer', '')
    document.body.appendChild(script)
    return promise
  }
}

export default loadScript
