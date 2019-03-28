<template>
  <el-pagination v-show="pager.total > 0" layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChange" @current-change="pageChange" :page-sizes="$api.pageSizes" :page-size.sync="pager.rows" :current-page.sync="pager.page" :total="pager.total"></el-pagination>
</template>
<script>
export default {
  name: 'pagination',
  components: {
  },
  props: {
    pager: {
      type: Object,
      default() {
        return {
          page: 1,
          rows: 10,
          total: 0,
        }
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    sizeChange(size = 50) {
      this.$storage.local.set(this.$route.path + '-table_rows', size)
      this.$emit('change', 1, size)
		},
		pageChange(page = 1) {
      this.$utils.history.replace(this.$utils.url.setArgs(this.$route.fullPath, '_page', page))
      this.$emit('change', page, this.pager.rows)
    },
    initPager() {
      let rows = this.$storage.local.get(this.$route.path + '-table_rows')
      let page = Number(this.$route.query._page) || 1
      rows && (this.pager.rows = rows)
      page && (this.pager.page = page)
    }
  },
  mounted() {
    this.initPager()
  }
}
</script>
<style scoped lang="less">

</style>