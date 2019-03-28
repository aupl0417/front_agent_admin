<template>
  <el-dialog :append-to-body="append" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <table v-if="formType === 5" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">物流公司名称</td>
        <td>{{formData.name}}</td>
        <td width="100" class="_tit">物流板车车牌号</td>
        <td>{{formData.plateNumber}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车人姓名</td>
        <td>{{formData.pickUpName}}</td>
        <td width="100" class="_tit">提车人身份证号</td>
        <td>{{formData.idCard}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">验车人姓名</td>
        <td>{{formData.checkName}}</td>
        <td width="100" class="_tit">验车人身份证号</td>
        <td>{{formData.checkIdCard}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">物流日期</td>
        <td colspan="3">
          <span v-if="$router.platform === 'shop'">{{formData.logisticsTime}}</span>
          <template v-else>
            <div v-if="wuliu.edit">
              <el-date-picker :clearable="false" style="width: 150px;" v-model="formData.logisticsTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              <el-button class="l-margin-l" :disabled="wuliu.loading" type="success" @click.native="wuliuSubmit()">{{ wuliu.loading ? '保存中' : '保存' }}</el-button>
            </div>
            <div v-else>
              {{formData.logisticsTime}}
              <el-button class="l-margin-l-x2" type="success" @click.native="wuliu.edit = true">修改</el-button>
            </div>
          </template>
        </td>
      </tr>
      <tr v-if="$router.platform === 'admin'">
        <td width="100" class="_tit">运输单</td>
        <td colspan="3">
          <image-previewer :file-list="formData.contract"></image-previewer>
        </td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 0" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">验车照片</td>
        <td><image-previewer :file-list="formData.image"></image-previewer></td>
      </tr>
      <template v-if="$router.platform === 'admin'">
        <tr>
          <td width="100" class="_tit">购车合同</td>
          <td><image-previewer :file-list="formData.contract"></image-previewer></td>
        </tr>
        <tr>
          <td width="100" class="_tit">运输乘用车运输单</td>
          <td><image-previewer :file-list="formData.transportList"></image-previewer></td>
        </tr>
      </template>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 1" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">装车照片</td>
        <td><image-previewer :file-list="formData.image"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">4S店提车交接表</td>
        <td><image-previewer :file-list="formData.handover"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">4S店购车全款收据</td>
        <td><image-previewer :file-list="formData.voucher"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 3" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">入库照片</td>
        <td><image-previewer :file-list="formData.image"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">入库指令单</td>
        <td><image-previewer :file-list="formData.stockSheet"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">订单物流费用</td>
        <td colspan="3"><i class="l-rmb">{{formData.logisticsFee}}</i></td>
      </tr>
      <tr>
        <td width="100" class="_tit">车辆入库地址</td>
        <td colspan="3">{{formData.stockAddress}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 26" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">提车人姓名</td>
        <td>{{formData.userName}}</td>
        <td width="100" class="_tit">提车人手机号码</td>
        <td>{{formData.phone}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车人身份证号</td>
        <td>{{formData.idCard}}</td>
        <td width="100" class="_tit">提车时间</td>
        <td>{{formData.settleDate}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">身份证正反面</td>
        <td colspan="3"><image-previewer :file-list="[formData.idCardOn, formData.idCardOff]"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车申请书</td>
        <td colspan="3"><image-previewer :file-list="formData.applyLetter"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 31" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">验车人姓名</td>
        <td>{{formData.userName}}</td>
        <td width="100" class="_tit">验车人手机号码</td>
        <td>{{formData.phone}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">验车人身份证号</td>
        <td>{{formData.idCard}}</td>
        <td width="100" class="_tit">验车时间</td>
        <td>{{formData.settleDate}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">身份证正反面</td>
        <td><image-previewer :file-list="[formData.idCardOn, formData.idCardOff]"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">验车申请书</td>
        <td colspan="3"><image-previewer :file-list="formData.applyLetter"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    
    <!-- <span slot="footer" class="l-margin-r-m"></span> -->
  </el-dialog>
</template>
<script>
import Uploader from '@/components/uploader'
import ImagePreviewer from '@/components/image-previewer'

export default {
  name: 'dialog-viewer',
  components: {
    Uploader, ImagePreviewer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formType: [Number, String],
    formData: Object,
    append: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sample: {
        image: ['http://qiniu.hsbro.cn/%E9%AA%8C%E8%BD%A6%E7%85%A7%E7%89%87.jpg'],
        stockSheet: ['http://qiniu.hsbro.cn/%E5%85%A5%E5%BA%93-%E5%85%A5%E5%BA%93%E6%8C%87%E4%BB%A4%E5%8D%95.jpg'],
      },
      images: {
        image: [],
        stockSheet: [],
      },
      dialog: {
        title: '查看详情',
        visible: false,
        loading: false,
        rules: {
          image: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          stockSheet: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          orderId: null,
          image: '',
          stockSheet: '',
          stockAddress: '',
          remark: '',
        }
      },
      wuliu: {
        edit: false,
        loading: false
      },
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if(val) {
          this.showDialog()
        }
      }
    }
  },
  methods: {
    getImages(formData = {}) {
      let images = Object.assign({}, this.images)
      Object.keys(images).forEach(key => {
        images[key] = images[key].join(',')
      })
      return this.$utils.copyObj(formData, images)
    },
    showDialog() {
      switch(this.formType) {
        case 5:
          this.dialog.title = '查看物流信息'
          break
        case 0:
          this.dialog.title = '查看验车信息'
          break
        case 1:
          this.dialog.title = '查看装车信息'
          break
        case 3:
          this.dialog.title = '查看入库信息'
          break
        case 26:
          this.dialog.title = '查看结算申请信息'
          break
        case 31:
          this.dialog.title = '查看验车申请信息'
          break
        default:
          this.dialog.title = '查看详情'
      }
      this.$utils.copyObj(this.dialog.data, this.formData)
      this.dialog.visible = true
    },
    closeDialog(done) {
      if(done) {
				done()
			}else{
				this.dialog.visible = false	
      }
      this.$emit('update:visible', this.dialog.visible)
    },
    submitDialog() {
      let formData = this.getImages(this.dialog.data)
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.dialog.loading = true
          this.$api.order.instock(formData).then(({data}) => {
            this.$message.success(this.dialog.title + '成功')
            this.$emit('change', data)
            this.closeDialog()
          }).finally(() => {
            this.dialog.loading = false
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    },
    wuliuSubmit() { // 修改物流时间
      this.wuliu.loading = true
      this.$api.order.editWuliu({
        orderId: this.formData.orderId,
        logisticsTime: this.formData.logisticsTime
      }).then(() => {
        this.wuliu.edit = false
        this.$message.success('物流日期修改成功')
      }).finally(() => {
        this.wuliu.loading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-table-02 td{vertical-align: top;}
</style>