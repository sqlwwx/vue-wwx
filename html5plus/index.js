export default {
  install (Vue) {
    Vue.prototype.$plus = new Promise((resolve, reject) => {
      if (window.plus) {
        resolve(window.plus)
      } else {
        const timeout = setTimeout(() => reject(new Error('timeout')), 500)
        window.document.addEventListener('plusready', () => {
          clearTimeout(timeout)
          resolve(window.plus)
        }, false)
      }
    })
    Vue.prototype.$toast = function (title, options = {}) {
      return this.$plus.then(plus => {
        return Promise.resolve(plus.nativeUI.toast(title, options))
      }, () => {
        window.alert('todo:web toast ' + title)
      })
    }
    Vue.prototype.$showWaiting = function (title, options = {}) {
      return this.$plus.then(plus => {
        return Promise.resolve(plus.nativeUI.showWaiting(title, options))
      })
    }
  }
}
