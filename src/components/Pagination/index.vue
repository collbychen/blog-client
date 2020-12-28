<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    hide: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 0
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    currentChange (val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style scoped lang="stylus">
  .pagination
    padding 10px 0
    text-align center
    @media (max-width 992px)
      padding 10px 0 20px
</style>
