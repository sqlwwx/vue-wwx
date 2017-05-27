import lstore from 'store'

lstore.getWithExpire = (key, fn, expire) => {
  let value = lstore.get(key)
  if (value && value.expire > Date.now()) {
    return Promise.resolve(value.value)
  } else {
    return fn().then((val) => {
      lstore.set(key, {expire: (expire || val.expire || 3600) * 1000 + Date.now(), value: val})
      return Promise.resolve(val)
    })
  }
}
export default lstore
