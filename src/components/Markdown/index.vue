<template>
  <div id="editor">
    <!--    eslint-disable-->
    <div class="markdown-body" v-html="content" :style="styleObj" />
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    styleObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    content: {
      get () {
        return marked(this.value)
      },
      set (v) {
        return marked(v)
      }
    }
  },
  watch: {
    value (newVla) {
      this.content = marked(newVla)
    }
  },
  created () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight (code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    this.initMarked()
  },
  methods: {
    initMarked () {
      marked.setOptions({
        renderer: this.renderImg(),
        highlight (code) {
          return hljs.highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    },
    renderImg () {
      const renderer = new marked.Renderer()
      renderer.image = function (url, title, alt) {
        return `
          <img style="width: 100%;cursor pointer" src="${url}" alt="${alt || '悠然小宋'}" title="${title || '悠然小宋'}"" >
      `
      }
      return renderer
    }
  }
}
</script>
<style lang="stylus" scoped>
  .markdown-body
    box-sizing border-box
    text-align left
    padding: 15px
    @media (max-width 786px)
      padding 10px
</style>
