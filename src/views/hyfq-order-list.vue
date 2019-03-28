<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <div></div>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="申请日期" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-input style="width: 220px;" placeholder="订单号/客户名称/手机号码" v-model="list.filter.keywords"></el-input>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-button type="success" @click.native="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click.native="showDialogPay()"><i class="l-icon">&#xe616;</i>批量扣款</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <div class="l-bg-white l-zoom l-margin-b">
        <ul class="l-tab-tit">
          <li v-for="(item,index) in tabList" :key="item.label" :class="{'_active1': tabActive === index}" @click="tabClick(index)">{{item.label}}</li>
        </ul>
      </div>

      <el-table ref="listData" class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" highlight-current-row :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column label="订单编号" prop="orderId" width="200"></el-table-column>
        <el-table-column label="汽贸店名称" prop="shopName" width="140"></el-table-column>
        <el-table-column label="渠道商名称" prop="agentName" width="140"></el-table-column>
        <el-table-column label="客户姓名" prop="userName" width="120" align="center"></el-table-column>
        <el-table-column label="客户身份证" prop="idCard" width="160" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" width="120" align="center"></el-table-column>
        <el-table-column label="申请时间" prop="createTime" width="120" align="center"></el-table-column>
        <el-table-column label="会费总额(元)" prop="amount" fixed="right" width="120" align="center"></el-table-column>
        <el-table-column label="分期期数" prop="period" fixed="right" width="120" align="center"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column label="状态" prop="state" fixed="right" width="120" align="center">
          <template slot-scope="scope">
            <span :class="stateList[scope.row.state].css">
              <i :class="stateList[scope.row.state].icon"></i>
              {{stateList[scope.row.state].label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button class="l-text-link" type="text" size="small" @click="showDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量扣款 -->
      <el-dialog title="" :visible.sync="dialogPay.visible" width="700px">
        <span slot="title">批量扣款</span>
        <div class="l-pay-list">
          <el-table class="l-fs-xs" ref="todayPay" @selection-change="todayPayChange" v-loading="list.loading" :data="dialogPay.list"  element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="orderId" label="订单号" min-width="170"></el-table-column>
            <el-table-column prop="userName" label="会员姓名" width="120" align="center"></el-table-column>
            <el-table-column prop="paidPeriod" label="当前期数" width="80" align="center"></el-table-column>
            <el-table-column prop="amount" label="扣款金额(元)" width="120" align="center"></el-table-column>
            <el-table-column prop="state" label="还款状态" width="120" align="center">
              <template slot-scope="scope">
                <span :class="payState[scope.row.state].css">
                  <i :class="payState[scope.row.state].icon"></i>
                  {{payState[scope.row.state].label}}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="l-flex-hc">
          <el-checkbox class="l-margin-l" :indeterminate="dialogPay.checked" v-model="dialogPay.checkAll" @change="todayPayCheckAll">全选</el-checkbox>
          <span class="l-rest"></span>
          <el-button white @click="dialogPay.visible = false">取消</el-button>
          <el-button type="primary" @click="submitTodayPay()">确认扣款</el-button>
        </div>
      </el-dialog>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <pagination @change="getList" :pager="list.pager"></pagination>
    </el-footer>
  </el-container>
</template>

<script>
import ImagePreviewer from '@/components/image-previewer'
import pagination from '@/components/pagination'
export default {
  name: 'hyfq-order-list',
  components: { pagination, ImagePreviewer },
  data() {
    return {
      stateList: {
        '0': { label: '审核中', value: 0, css: 'l-txt-ok', icon: 'el-icon-warning' },
        '5': { label: '待放款', value: 5, css: 'l-txt-ok', icon: 'el-icon-warning' },
        '10': { label: '待出保险', value: 10, css: 'l-txt-ok', icon: 'el-icon-warning' },
        '20': { label: '还款中', value: 20, css: 'l-txt-warn', icon: 'el-icon-warning' },
        '30': { label: '扣款失败', value: 30, css: 'l-txt-error', icon: 'el-icon-error' },
        '40': { label: '已逾期', value: 40, css: 'l-txt-error', icon: 'el-icon-error' },
        '50': { label: '已还清', value: 50, css: 'l-txt-ok', icon: 'el-icon-success' },
        '-3': { label: '已关闭', value: -3, css: 'l-txt-gray' },
        '-2': { label: '不放款', value: -2, css: 'l-txt-gray' },
        '-1': { label: '已拒绝', value: -1, css: 'l-txt-gray' },
      },
      payState: { // 还款记录状态
        '-1': { label: '扣款失败', value: 0, css: 'l-txt-error' },
        '0': { label: '今天应还', value: 5, css: 'l-txt-warn' },
        '1': { label: '已还款', value: 10, css: 'l-txt-ok' },
        '2': { label: '处理中', value: 20, css: 'l-txt-gray' },
        '3': { label: '已逾期', value: 30, css: 'l-txt-error' },
      },
      tabActive: 0,
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
      dialogPay: {
        visible: false,
        loading: false,
        checkAll: false,
        checked: false,
        list: [],
        payIds: ''
      }
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
      this.list.filter.state = this.tabList[index].value
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
			this.$api.hyfq.getOrderList(this.list.filter, page, rows).then(({data}) => {
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
    showDetails(row) { // 详情
      this.$storage.session.set(this.$route.path + '_row-id', row.id)
      this.$router.push('/hyfq/order/info?id=' + row.id)
    },
    showDialogPay() {
      this.dialogPay.loading = true
      this.$api.hyfq.getTodayPay().then(({data}) => {
        this.dialogPay.list = data
        this.dialogPay.visible = true
      }).finally(() => {
        this.dialogPay.loading = false
      })
    },
    todayPayCheckAll(val) { // 全选
      this.dialogPay.list.forEach(item => {
        this.$refs.todayPay.toggleRowSelection(item, val)
      })
    },
    todayPayChange(val) { // 选择回调
      this.dialogPay.payIds = val.map(item => item.id).join(',')
      this.dialogPay.checkAll = val.length === this.dialogPay.list.length
      this.dialogPay.checked = !this.dialogPay.checkAll && val.length > 0
    },
    submitTodayPay() {
      if(!this.dialogPay.payIds){
        return this.$message.error('请选择扣款项')
      }
      let loading = this.$loading()
      this.$api.hyfq.batchPay(this.dialogPay.payIds).then(() => {
        this.$message.success('批量扣款操作成功')
        this.showDialogPay()
      }).finally(() => {
        loading.close()
      })
    },
  },
  mounted() {
    this.tabClick(Number(this.$route.query.tab) || 0, this.list.pager.page)
  }
}
</script>
<style lang="less" scoped>
.l-pay-list{ margin: -10px 0; height: 400px; overflow: auto; }
</style>
