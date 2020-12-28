<template>
  <svg class="icon" aria-hidden="true" :style="styleObj">
    <use :href="svgName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    styleObj: {
      type: Object,
      default () {
        return {
          width: '1.4em',
          height: '1.4em'
        }
      }
    }
  },
  computed: {
    svgName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .icon {
    /*width 1em*/
    /*height 1em*/
    vertical-align -0.15em
    fill currentColor
    overflow hidden
  }
</style>
