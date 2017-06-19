<template>
  <div ref="jsoneditor"></div>
</template>
<script>
import loadScript from '../utils/loadScript.js'
import loadStyleSheet from '../utils/loadStyleSheet.js'
import { debounce } from 'lodash'

loadStyleSheet('http://cdn.wuweixing.com/jsoneditor/5.7.0/jsoneditor.min.css')

export default {
  props: {
    value: null, // any type
    timeout: {
      type: Number,
      default: 100
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    value (val) {
      if (this.changeBy === 'editor') {
        this.changeBy = undefined
      } else if (self.changeBy === undefined) {
        if (this.$editor) {
          debounce(() => {
            this.$editor.set(val)
          }, this.timeout || 100)()
        }
      }
    }
  },
  created () {
    let self = this
    loadScript('http://cdn.wuweixing.com/jsoneditor/5.7.0/jsoneditor.min.js').then(() => {
      self.$editor = new window.JSONEditor(
        self.$refs.jsoneditor,
        Object.assign({}, this.options, {
          onChange () {
            if (self.changeBy === 'watch') {
              this.changeBy = undefined
            } else if (self.changeBy === undefined) {
              self.changeBy = 'editor'
              debounce(() => {
                self.$emit('input', self.$editor.get())
              }, self.timeout || 100)()
            }
          }
        }),
        self.value
      )
    })
  }
}
</script>
<style>
.jsoneditor {
}
</style>
