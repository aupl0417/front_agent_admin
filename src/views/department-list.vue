<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li @click="$router.push('/user/list')">账号列表</li>
          <li class="_active2">部门岗位管理</li>
        </ul>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item class="l-margin-r">
            <el-input style="width: 320px;" placeholder="请输入部门/岗位名称" v-model="list.filter.keywords">
            </el-input>
          </el-form-item>
          <el-form-item class="l-margin-r">
            <el-button type="success" @click.native="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click.native="departmentDialog('new')">新增部门</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <el-table border element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" :span-method="mergeRow" v-loading="list.loading">
        <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
        <el-table-column class-name="l-txt-blod" prop="department" align="center" label="部门名称" width="120"></el-table-column>
        <el-table-column prop="departmentId" align="center" label="部门操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" class="l-txt-link" size="mini" @click.native="departmentDialog('edit', scope.row)">编辑部门</el-button>
            <el-button type="text" class="l-txt-link" size="mini" @click.native="positionDialog('new', scope.row)">添加岗位</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位名称" width="120"></el-table-column>
        <el-table-column align="center" label="岗位操作" width="250">
          <template v-if="scope.row.positionId" slot-scope="scope">
            <el-button type="text" class="l-txt-link" size="mini" @click.native="positionDialog('edit', scope.row)">编辑岗位</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="200"></el-table-column>
      </el-table>

      <!-- 新增/编辑部门 -->
      <dialog-department :visible.sync="department.visible" :form-type="department.type" :form-data="department.data" @change="getList"></dialog-department>
      <!-- 新增/编辑岗位 -->
      <dialog-position :visible.sync="position.visible" :form-type="position.type" :form-data="position.data" :parent-id="position.departmentId" @change="getList"></dialog-position>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <pagination @change="getList" :pager.sync="list.pager"></pagination>
    </el-footer>
  </el-container>
</template>
<script>
import pagination from '@/components/pagination'
import dialogDepartment from './dialog-department'
import dialogPosition from './dialog-position'
export default {
  name: 'department-list',
  components: {
    dialogDepartment,
    dialogPosition,
    pagination,
  },
  data() {
    return {
      list: {
        filter: {
					keywords: '',
				},
				rules: {
					keywords: [],
        },
        pager: {
          page: 1,
          rows: 100,
          total: 0,
        },
				loading: false,
				data: []
      },
      department: {
        visible: false,
        type: 'new',
        data: {
          id: null,
          name: null,
          remark: null
        }
      },
      position: {
        visible: false,
        type: 'new',
        departmentId: '',
        data: {
          parentId: null,
          id: null,
          name: null,
          remark: null
        }
      }
    }
  },
  methods: {
    getList(page = this.list.pager.page, rows = this.list.pager.rows) {
			this.list.loading = true
			this.$api.department.getList(this.list.filter, page, rows)
			.then(({data}) => {
        this.$utils.copyObj(this.list.pager, data, { page, rows })
        this.list.rowspan = {}
        data.list = data.list.map(item => {
          if(item.parentId > 0) { // 岗位
            item.departmentId = item.parentId
            // item.department = item.department
            item.positionId = item.id
            item.position = item.name
            if(this.list.rowspan[item.departmentId]) {
              this.list.rowspan[item.departmentId]++
            }else{
              this.list.rowspan[item.departmentId] = 1
            }
          }else{ // 部门
            item.departmentId = item.id
            item.department = item.name
            item.positionId = ''
            item.position = '无'
          }
          return item
        })

        this.list.data = data.list.filter(item => item.positionId || !this.list.rowspan[item.departmentId])
			}).finally(() => {
				this.list.loading = false
			})
    },
    mergeRow({ row, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2) {
        if(row.parentId > 0) {
          if (row.parentId === this.list['parentId_'+ columnIndex]) {
            return {
              rowspan: 0,
              colspan: 0
            }
          } else {
            this.list['parentId_'+ columnIndex] = row.parentId
            return {
              rowspan: this.list.rowspan[row.parentId] || 1,
              colspan: 1
            }
          }
        }else{
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      }
    },
    search() {
			this.getList(1)
		},
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList(1)
    },
    departmentDialog(type = 'new', row) {
      this.department.type = type
      if(type === 'edit') {
        this.$utils.copyObj(this.department.data, {
          id: row.departmentId,
          name: row.department,
          remark: row.remark
        })
      }
      this.department.visible = true
    },
    positionDialog(type, row) {
      this.position.type = type
      this.position.departmentId = row.departmentId
      if(type === 'edit') {
        this.$utils.copyObj(this.position.data, {
          parentId: row.departmentId,
          id: row.positionId,
          name: row.position,
          remark: row.remark
        })
      }
      this.position.visible = true
    }
  },
  mounted() {
    this.getList()
  }
}
</script>