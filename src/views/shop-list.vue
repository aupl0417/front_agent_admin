<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li v-for="(item,index) in tabList" :key="item.label" :class="{'_active1': tabActive === index}" @click="tabClick(index)">{{item.label}}</li>
        </ul>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="注册时间" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-input style="width: 320px;" placeholder="请输入门店名称/手机号码" v-model="list.filter.keywords"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table ref="listData" class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" highlight-current-row :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="orgName" label="门店名称" width="200"></el-table-column>
        <el-table-column prop="agentName" label="渠道商" width="200"></el-table-column>
        <el-table-column prop="corporation" align="center" label="法人姓名" width="120"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="createTime" align="center" label="注册时间" width="170"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column prop="stateName" align="center" label="基本认证" width="120" fixed="right">
          <template slot-scope="scope">
            <span :class="stateList[scope.row.state].css">
              <i :class="stateList[scope.row.state].icon"></i>
              {{stateList[scope.row.state].label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="stateName" align="center" label="会员分期认证" width="120" fixed="right">
          <template slot-scope="scope">
            <span :class="stateList2[scope.row.inState].css">
              <i :class="stateList2[scope.row.inState].icon"></i>
              {{stateList2[scope.row.inState].label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button white size="mini" @click.native="showDetials(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <pagination @change="getList" :pager.sync="list.pager"></pagination>
    </el-footer>
  </el-container>
</template>
<script>
import pagination from '@/components/pagination'
export default {
  name: 'shop-list',
  components: { pagination },
  data() {
    return {
      exceling: false,
      tabActive: 0,
      // 门店基本状态
      stateList: {
        '0': { label: '待审核', value: 0, css: 'l-txt-warn', icon: 'el-icon-warning' },
        '1': { label: '已通过', value: 1, css: 'l-txt-ok', icon: 'el-icon-ok' },
        '-1': { label: '已拒绝', value: -1, css: 'l-txt-gray' },
      },
      stateList2: {
        '': { label: '未认证', value: '', css: 'l-txt-gray' },
        '0': { label: '待审核', value: 0, css: 'l-txt-warn', icon: 'el-icon-warning' },
        '5': { label: '已通过', value: 5, css: 'l-txt-ok', icon: 'el-icon-ok' },
        '-1': { label: '已拒绝', value: -1, css: 'l-txt-gray' },
        '-2': { label: '已取消', value: -2, css: 'l-txt-gray' },
      },
      list: {
        dateRange: [],
        filter: {
					startDate: '',
					endDate: '',
					keywords: '',
          state: '',
				},
				rules: {
					startDate: [],
					endDate: [],
					keywords: [],
					state: [],
        },
        pager: {
          page: 1,
          rows: 10,
          total: 0,
        },
				loading: false,
				data: []
      },
    }
  },
  computed: {
    tabList() {
      let ret = [{ label: '全部', value: '' }]
      Object.keys(this.stateList).forEach(name => {
        if(!this.stateList[name].hidden) {
          ret.push(this.stateList[name])
        }
      })
      return ret
    }
  },
  methods: {
    tabClick(index = 0, page = 1) {
      this.tabActive = index
      this.list.filter.state = index
      this.$utils.history.replace(this.$utils.url.setArgs(this.$route.fullPath, 'tab', this.tabActive))
      this.getList(page)
    },
    dateChange(value) {
			if(value && value.length > 0) {
				this.list.filter.startDate = value[0]
				this.list.filter.endDate = value[1] || ''
			}else{
        this.list.filter.startDate = ''
				this.list.filter.endDate = ''
      }
      this.search()	
		},
    getList(page = this.list.pager.page, rows = this.list.pager.rows) {
			this.list.loading = true
			this.$api.shop.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list.pager, data, { page, rows })
        this.list.data = data.list

        this.$nextTick(() => {
          let rowId = this.$storage.session.get(this.$route.path + '_row-id')
          let currentRow = data.list.filter(item => item.id === rowId)[0]
          if(currentRow) {
            this.$refs.listData.setCurrentRow(currentRow)
          }
        })
			}).finally(() => {
				this.list.loading = false
			})
    },
    search() {
			this.getList(1)
		},
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList(1)
    },
    showDetials(row) {
      this.$storage.session.set(this.$route.path + '_row-id', row.id)
      this.$router.push('/shop/info?id=' + row.id)
    }
  },
  mounted() {
    this.tabClick(Number(this.$route.query.tab) || 0, this.list.pager.page)
  }
}
</script>