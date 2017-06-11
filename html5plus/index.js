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
        window.console.warn('todo:web toast ' + title)
      })
    }
    let waitings = {}
    Vue.prototype.$showWaiting = function (title, options = {}) {
      return this.$plus.then(plus => {
        const id = options.id || title
        waitings[id] = plus.nativeUI.showWaiting(title, options)
        return Promise.resolve(waitings[id])
      })
    }
    Vue.prototype.$closeWaiting = function (id) {
      waitings[id] && waitings[id].close()
      delete waitings[id]
    }
  }
}
