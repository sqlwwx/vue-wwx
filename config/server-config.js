export const serverConfig = (code) => {
  return lstore.getWithExpire('config:' + code, () => {
    return Vue.http.get('Configs/findByCode/' + code).then((res) => {
      return Promise.resolve(res.data[0].value)
    })
  })
}
