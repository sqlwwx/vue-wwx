import { Multiselect } from '@/modules/vue-multiselect/src'

export default {
  props: {
    storeKey: String,
    options: {
      type: Array,
      default () {
        return []
      }
    },
    parseByStr: {
      type: Function,
      default: str => str
    }
  },
  created () {
    this.taggable = true
    if (this.storeKey) {
      let localOptionsStr = window.localStorage[this.storeKey + '-options']
      if (localOptionsStr) {
        JSON.parse(localOptionsStr).forEach((option) => this.options.push(option))
      }
      let localValueStr = window.localStorage[this.storeKey]
      if (localValueStr) {
        this.$parent[this.valKey] = JSON.parse(localValueStr)
      }
    }
    this.$on('tag', (value, id) => {
      let option = this.parseByStr(value)
      this.options.push(option)
      this.$emit('input', option)
      window.localStorage.setItem(this.storeKey + '-options', JSON.stringify(this.options))
      this.isOpen = false
    })
  },
  watch: {
    value (value) {
      if (this.storeKey) {
        window.localStorage.setItem(this.storeKey, JSON.stringify(value))
      }
    }
  },
  mixins: [Multiselect]
}
