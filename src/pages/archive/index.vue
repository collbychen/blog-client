<template>
  <div>
    <Timeline :data="list" :total="count" />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'

export default {
  name: 'Pigeonhole',
  components: { Timeline },
  async asyncData ({ $axios }) {
    const { data } = await $axios.$get('articles/archiveList')
    // console.log(data.data)
    return {
      list: data.list,
      count: data.count
    }
  },
  data () {
    return {}
  },
  head () {
    return {
      title: '归档-小宋博客',
      meta: [
        { hid: 'home', name: 'description', content: '小宋-个人博客' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
