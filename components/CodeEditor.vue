<template>
  <div ref="codeEditor"/>
</template>
<script>
import loadScript from '../utils/loadScript.js'
import loadStyleSheet from '../utils/loadStyleSheet.js'
import { debounce } from 'lodash'
const baseUrl = 'https://cdn.staticfile.org/codemirror/5.25.0'

export default {
  props: ['value', 'timeout', 'options'],
  watch: {
    value (val) {
      if (this.changeBy === 'editor') {
        this.changeBy = undefined
      } else {
        console.log('setValue', this.changeBy, val)
        this.$editor.setValue(val)
      }
    }
  },
  created () {
    loadStyleSheet(`${baseUrl}/codemirror.css`).then(() => {
      return loadScript(`${baseUrl}/codemirror.min.js`)
    }).then(() => {
      let options = Object.assign({
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
      }, this.options, {
        value: this.value
      })
      let promises = [
        loadScript(`${baseUrl}/mode/${options.mode}/${options.mode}.min.js`)
      ]
      if (options.theme) {
        promises.push(
          loadStyleSheet(`${baseUrl}/theme/${options.theme}.min.css`)
        )
      }
      return Promise.all(promises).then(() => {
        this.$editor = new window.CodeMirror(
          this.$refs.codeEditor,
          options
        )
        this.$editor.on('change',
          debounce(() => {
            setTimeout(function () {
              this.changeBy = 'editor'
              this.$emit('input', this.$editor.getValue())
            }.bind(this), 600)
          }, this.timeout || 300)
        )
      })
    })
  }
}
</script>
