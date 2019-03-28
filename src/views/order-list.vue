<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <div></div>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="申请日期" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 320px;" placeholder="请输入垫资单号/门店名称" v-model="list.filter.keywords"></el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="success" @click.native="search()">查询</el-button>
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
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="orderId" label="垫资单号" width="200"></el-table-column>
        <template v-if="$router.platform === 'admin'">
          <el-table-column prop="orgName" label="汽贸店名称" width="250"></el-table-column>
          <el-table-column label="垫资金额(元)" align="center" width="130" fixed="right">
            <template slot-scope="scope">
              {{ scope.row.adjustAmount || scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column label="保证金(元)" align="center" width="120" fixed="right">
            <template slot-scope="scope">
              {{ scope.row.adjustBond || scope.row.bond}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="shopName" label="销售商名称" width="250"></el-table-column>
        <template v-if="$router.platform === 'shop'">
          <el-table-column prop="userName" label="客户姓名" align="center" width="120"></el-table-column>
          <el-table-column prop="phone" label="客户手机号" align="center" width="120"></el-table-column>
          <el-table-column label="垫资金额(元)" align="center" width="130" fixed="right">
            <template slot-scope="scope">
              {{ scope.row.status > 0 ? scope.row.adjustAmount : scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column label="保证金(元)" align="center" width="120" fixed="right">
            <template slot-scope="scope">
              {{ scope.row.status > 0 ? scope.row.adjustBond : scope.row.bond}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="createTime" label="申请时间" align="center" width="170"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column prop="stateName" label="状态" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <span :class="getState(scope.row.state).css">
              <i :class="getState(scope.row.state).icon"></i>
              {{getState(scope.row.state).label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="statusName" label="待操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <span v-if="[0, 3, 4, 6].includes(scope.row.state)" :class="statusList[scope.row.status].css">{{statusList[scope.row.status].label}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button white size="mini" @click.native="showDetails(scope.row.id)">查看详情</el-button>
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
  name: 'order-list',
  components: { pagination },
  data() {
    return {
      exceling: false,
      tabActive: 0,
      stateList: [
        { label: '全部', value: '',  css: ''},
        { label: '待受理', value: 0,  css: 'l-txt-warn', icon: 'el-icon-warning'},
        { label: '待收保证金', value: 2,  css: 'l-txt-error', icon: 'el-icon-warning'},
        { label: '待物流装车', value: 3, css: 'l-txt-bold', icon: 'el-icon-warning' },
        { label: '途中待入库', value: 4, css: 'l-txt-bold', icon: 'el-icon-warning' },
        { label: '车辆已入库', value: 5, css: 'l-txt-bold' },
        { label: '结算申请', value: 6, css: 'l-txt-ok', icon: 'el-icon-warning' },
        { label: '待出票证', value: 7, css: 'l-txt-bold', },
        { label: '已逾期', value: 8, css: 'l-txt-error', },
        { label: '已完成', value: 9, css: 'l-txt-ok', icon: 'el-icon-success' },
        { label: '不受理', value: -2, css: 'l-txt-gray' },
        { label: '不同意放车', hidden: true, value: -9, css: 'l-txt-gray' },
        { label: '订单异常', hidden: true, value: -10, css: 'l-txt-error' },
        { label: '已关闭', value: -11, css: 'l-txt-gray' },
      ],
      statusList: {
        // state = 0 待受理
        '-1': { label: '总经理打回重审' },                 // 总经理打回重审（订单信息不对或合同内容有误）
        '0': { label: '订单审核中' },                     // 风控申请订单中（准备签署合同，调整金额及利率等）
        '1': { label: '待签署合同' },                     // 等待徐总发起合同，袁婷签署
        // state = 3 待物流装车
        '2': { label: '待录入物流信息' },           
        '4': { label: '待录入验车信息' },           
        '6': { label: '待汽贸店允许提车' },                // 待汽贸店允许提车并同意打款给4S店            
        '8': { label: '待总经理同意打款 ' },               // 待徐总确认放款
        '10': { label: '待财务打款给4S店' },               // 徐总确认授权，待财务打款给4S店
        '12': { label: '待录入装车信息' },
        // state = 4 车辆等待入库
        '14': { label: '待录入入库信息' },
        // state = 6 汽贸店已申请结算
        '16': { label: '待汽贸店申请结算' },              // 车辆已入库，待汽贸店结算申请
        '18': { label: '待审核结算申请' },                // 已申请结算，等待业务员确认金额（利息，滞纳金及额外费用等）
        '20': { label: '待财务确认结算' },                // 待财务确认结算金额
        '22': { label: '待汽贸店付款提车' },              // 待汽贸店付款提车
        '24': { label: '待财务确认收款' },                // 汽贸店已付款，待财务确认收到车款
        '26': { label: '待总经理确认放车'},               // 财务已确认收到款，待徐总确认放车
      },
      list: {
        dateRange: [],
        filter: {
					startDate: '',
					endDate: '',
					keywords: '',
					state: '',
          status: '',
          isOverDue: ''                                  // 是否即将逾期
				},
				rules: {
					startDate: [],
					endDate: [],
					keywords: [],
					state: [],
					status: [],
        },
        pager: {
          page: 1,
          rows: 10,
          total: 0,
        },
				loading: false,
				data: []
      },
      dialogInfo: {
				type: 'new',
				title: '新增账号',
				visible: false,
				loading: false,
				rules: {
          userName: [
						{ required: true, message: '必选项', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '必填项', trigger: 'blur' },
						{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          email: [
						{ required: true, message: '必选项', trigger: 'blur' }
					],
					departmentId: [
						{ required: true, message: '必选项', trigger: 'change' }
          ],
          positionId: [
						{ required: true, message: '必选项', trigger: 'change' }
					],
					roleCode: [
						{ required: true, message: '必填项', trigger: 'blur' }
					]
        },
				data: {
					id: '',
					userName: '',
					phone: '',
          email: '',
          departmentId: '',
					positionId: '', 
					roleCode: '',
				}
			}
    }
  },
  computed: {
    tabList() {
      let tabList = this.stateList.filter(item => !item.hidden)
      tabList[tabList.length - 1] = Object.assign({}, tabList[tabList.length - 1], {value: '-9, -10, -11'})
      return tabList
    }
  },
  methods: {
    getState(state) {
      return this.stateList.filter(item => item.value === state)[0] || {}
    },
    tabClick(index = 0) {
      this.tabActive = index
      this.list.filter.state = this.tabList[index].value
      this.getList(1)
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
    getList(page = 1, rows = this.list.pager.rows) {
			this.list.loading = true
			this.$api.order.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list.pager, data, { page, rows })
        this.list.data = data.list
			}).finally(() => {
        this.list.filter.status = ''
        this.list.filter.isOverDue = ''
				this.list.loading = false
			})
    },
    search() {
			this.getList()
		},
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList()
    },
    showDetails(id) {
      this.$router.push('/order/info?id=' + id)
    }
  },
  mounted() {
    let tabActive = Number(this.$route.query.tab)
    this.list.filter.status = this.$route.query.stu || ''
    this.list.filter.isOverDue = this.$route.query.overdue || ''
    this.tabClick(isNaN(tabActive) ? 0 : tabActive)
    if(this.$router.platform === 'shop'){
      this.stateList[2].label = '待付保证金'
      this.stateList[3].label = '资方提车中'
      this.stateList[7].label = '待收票证'
      this.stateList[11].label = '未放车'
      
      this.statusList = {
        // state = 0 待受理
        '-1': { label: '订单审核中' },       // 总经理拒绝
        '0': { label: '订单审核中' },        // 风控申请订单中（准备签署合同，调整金额及利率等）
        '1': { label: '待签署合同' },        // 等待徐总发起并签署合同
        // state = 3 资方提车中
        '2': { label: '物流信息录入中' },    // 待录入物流信息
        '4': { label: '验车信息录入中' },    // 待录入验车信息
        '6': { label: '待允许提车', css: 'l-txt-warn' },        // 待允许资方到4S店提车，并同意资方打款给4S店
        '8': { label: '资方打款中' },        // 待徐总确认放款
        '10': { label: '资方打款中' },       // 徐总确认授权，待财务打款给4S店
        '12': { label: '资方装车中' },       // 待录入装车信息
        // state = 4 车辆等待入库
        '14': { label: '车辆入库中' },       // 待录入入库信息
        // state = 6 结算申请
        '16': { label: '待申请结算' },       // 垫资车辆已到仓库，待汽贸店验车申请、结算申请
        '18': { label: '订单结算中' },       // 已申请结算，等待业务员确认金额（利息，滞纳金及额外费用等）
        '20': { label: '订单结算中' },       // 待财务确认结算金额
        '22': { label: '待付款提车' },       // 待汽贸店付款提车
        '24': { label: '已付款待放车' },     // 汽贸店已付款，待财务确认收到车款
        '26': { label: '已付款待放车'},      // 财务已确认收到款，待徐总确认放车
      }
    }
  }
}
</script>