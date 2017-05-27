export default {
  install (Vue) {
    Vue.prototype.$plus = new Promise((resolve) => {
      if (window.plus) {
        resolve(window.plus)
      } else {
        window.document.addEventListener('plusready', () => {
          resolve(window.plus)
        }, false)
      }
    })
    Vue.prototype.$toast = function (title, options = {}) {
      return this.$plus.then(plus => {
        return Promise.resolve(plus.nativeUI.toast(title, options))
      })
    }
  }
}
