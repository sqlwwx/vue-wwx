export var apiHost = window.localStorage.apiHost
export var apiBase = window.localStorage.apiBase || '/api/v1'
export var apiHostMap = {
  'http://admin.lab.wuweixing.com': 'https://api.lab.wuweixing.com'
}

if (!apiHost) {
  let origin = window.localStorage.origin || window.location.origin
  if (apiHostMap[origin]) {
    apiHost = apiHostMap[origin]
  } else {
    apiHost = origin.replace(/\/\/\w+/, '//api')
  }
}
