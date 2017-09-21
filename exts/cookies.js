import Cookies from 'js-cookie'

Cookies.getObj = (key) => {
  const val = Cookies.get(key) || 'null'
  return JSON.parse(val)
}

Cookies.setObj = (key, obj, options) => {
  Cookies.set(key, JSON.stringify(obj), options)
}

Cookies.getWithExpire = (key, fn, expire) => {
  let value = Cookies.getObj(key)
  if (value) {
    return Promise.resolve(value)
  } else {
    return fn().then((val) => {
      Cookies.setObj(key, val, {
        expires: new Date((expire || val.expire || 3600) * 1000 + Date.now())
      })
      return Promise.resolve(val)
    })
  }
}

export default Cookies
