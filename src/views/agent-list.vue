<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <div></div>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="注册时间" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-input style="width: 320px;" placeholder="请输入门店名称/手机号码" v-model="list.filter.keywords"></el-input>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-button type="success" @click.native="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click.native="showDialogInfo('new')">新增渠道商</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" highlight-current-row :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="agentName" label="渠道商名称" width="200"></el-table-column>
        <el-table-column prop="userName" align="center" label="联系人" width="120"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="createTime" align="center" label="注册时间" width="170"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <span v-show="scope.row.doing" class="l-txt-gray"><i class="el-icon-loading"></i>&nbsp;操作中</span>
            <span v-show="!scope.row.doing">
              <el-button white size="mini" @click.native="showDialogInfo('edit', scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click.native="del(scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/编辑账号 -->
      <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialogInfo" :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="400px">
        <el-form class="l-dialog-form l-margin-r" ref="infoForm" label-width="100px" :model="dialogInfo.data" :rules="dialogInfo.rules" @submit.native.prevent @keyup.enter.native="submitDialogInfo">
          <el-form-item label="渠道商名称" prop="agentName">
            <el-input v-model="dialogInfo.data.agentName" placeholder="请输入渠道商公司名或个人姓名" :maxlength="50" ></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="userName">
            <el-input v-model="dialogInfo.data.userName" placeholder="请输入联系人姓名" :maxlength="50" ></el-input>
          </el-form-item>
          <el-form-item label="登录账号" prop="phone" >
            <el-input v-model="dialogInfo.data.phone" placeholder="请输入手机号码" :maxlength="11"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialogInfo()">取消</el-button>
          <el-button type="primary" :loading="dialogInfo.loading" @click="submitDialogInfo">确定提交</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <pagination @change="getList" :pager.sync="list.pager"></pagination>
    </el-footer>
  </el-container>
</template>
<script>
import pagination from '@/components/pagination'
export default {
  name: 'agent-list',
  components: { pagination },
  data() {
    return {
      list: {
        dateRange: [],
        filter: {
					startDate: '',
					endDate: '',
					keywords: '',
				},
				rules: {
					startDate: [],
					endDate: [],
					keywords: [],
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
				title: '新增渠道商',
				visible: false,
				loading: false,
				rules: {
          agentName: [
						{ required: true, message: '必选项', trigger: 'blur' }
					],
          userName: [
						{ required: true, message: '必选项', trigger: 'blur' }
          ],
          phone: [
						{ required: true, message: '必填项', trigger: 'blur' },
						{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
        },
				data: {
					id: null,
					agentName: '',
					userName: '',
          phone: '',
				}
			}
    }
  },
  methods: {
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
			this.$api.agent.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list.pager, data, { page, rows })
        this.list.data = data.list
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
    showDialogInfo(type = 'new', row) {
      this.dialogInfo.type = type
			if(type === 'edit') {
				this.dialogInfo.title = '编辑渠道商信息'
				this.$utils.copyObj(this.dialogInfo.data, row)
			} else {
        this.dialogInfo.title = '新增渠道商信息'
        this.$utils.copyObj(this.dialogInfo.data, '')
      }

      this.dialogInfo.visible = true	
		},
		closeDialogInfo(done) {
			if(done) {
				done()
			}else{
				this.dialogInfo.visible = false	
			}
			this.resetDialogInfo()
		},
		resetDialogInfo() {
			this.$refs.infoForm && this.$refs.infoForm.resetFields()
			this.$utils.copyObj(this.dialogInfo.data, '')
		},
		submitDialogInfo() {
			this.$refs.infoForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.dialogInfo.data)
          let promise = this.dialogInfo.type == 'edit' ? this.$api.agent.edit(formData) : this.$api.agent.add(formData)
          this.dialogInfo.loading = true
          promise.then(() => {
            this.$message.success((this.dialogInfo.type === 'edit' ? '修改' : '新增') + '成功')
            this.closeDialogInfo()
            this.getList()
          }).finally(() => {
            this.dialogInfo.loading = false
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    },
    del(row) {
      this.$confirm('是否确定删除该渠道商？').then(() => {
        row.doing = true
        this.$api.role.del(row.id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).finally(() => {
          row.doing = false
        })
      })
		}
  },
  mounted() {
    this.getList()
  }
}
</script>