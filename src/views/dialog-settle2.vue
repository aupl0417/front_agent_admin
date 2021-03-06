<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title"  :visible.sync="dialog.visible" width="650px">
    <div class="l-scroll" style="max-height: 400px; margin-top: -15px;">
      <div style="margin: 0 15px 20px;">
        <p>
          <span>计息融资金额：<b class="l-rmb">{{formData.adjustAmount}}</b></span>
          <span class="l-liney"></span>
          <span>产生利息：<b class="l-rmb">{{rateAmount}}</b></span>
          <span class="l-liney"></span>
          <span>日利率：{{formData.rate}}%</span>
        </p>
        <p style="color: #a1a6ba; margin-top: 5px; font-size: 13px;">
          <span>实际放款日期：{{formData.voucherTime}}</span>    
          <span class="l-liney"></span>
          <span>结算提车日期：{{formData.settleDate}}</span>    
          <span class="l-liney"></span>
          <span>垫资时长：{{loanTime}}天</span>
        </p>
      </div>
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item label="" prop="ticketDate">
          <span slot="label">票证收齐日期<i class="l-fs-xs" style="color: #a1a6ba;">（处理方案：{{scheme[formData.scheme]}}）</i></span>
          <el-date-picker style="width: 250px;" :picker-options="dateOptions" v-model="dialog.data.ticketDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item label="" prop="ticketFee">
          <span slot="label">票证滞纳费</span>
          <el-input style="width: 250px;" v-model="dialog.data.ticketFee" placeholder="请输入" :maxlength="11">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="其他第三方费用" prop="otherFee">
          <el-input v-model="dialog.data.otherFee" placeholder="请输入" :maxlength="11">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark" style="width: 515px;">
          <el-input v-model="dialog.data.remark" type="textarea" placeholder="如：其他费用说明" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="备注附件" prop="remarkImage">
          <uploader :file-list.sync="images.remarkImage" :sample-pic="sample.remarkImage"></uploader>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="l-margin-r-m">
      <!-- <i class="l-txt-gray l-fl" style="margin-top: 10px;">确定结算金额，将发送给总经理审核</i> -->
      <span class="l-fl">
        <b class="l-fs-x2">溢价回购总额：<i class="l-rmb l-txt-theme">{{totalAmount}}</i></b>
      </span>
      <el-button white @click="closeDialog()">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submitDialog">{{ dialog.loading ? '提交中...' : '确定提交'}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Uploader from '@/components/uploader'
export default {
  name: 'dialog-settle2',
  components: {
    Uploader
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: 'new'
    },
    formData: Object,
    append: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loanTime() { // 垫资时长
      // 结算提车日期 - 实际放款日期
      let endTime = this.$utils.str2date(this.formData.settleDate).getTime()
      let startTime = this.$utils.str2date(this.formData.voucherTime).getTime()
      return Math.ceil((endTime - startTime) / (3600 * 24 * 1000)) + 1
    },
    rateAmount() {  // 利息
      return (this.formData.adjustAmount * this.formData.rate / 100 * this.loanTime).toFixed(2)
    },
    ticketFee: { // 票证金额
      get() {
        // 票证时间
        let endTime = this.$utils.str2date(this.dialog.data.ticketDate).getTime()
        // (放款时间 + 10天)
        let startTime = this.$utils.str2date(this.formData.voucherTime).getTime() + (3600 * 24 * 1000) * 9
        // 滞纳天数
        let diffDate = Math.ceil((endTime - startTime) / (3600 * 24 * 1000)) 
        // 处理方案
        let scheme = this.formData.scheme
        // 滞纳费用
        let ticketFee = 0
        if(diffDate > 0) {
          if(scheme === 1) { // 每3天交计息融资金额5%的保证金，票证收齐或还款后将退回；
            ticketFee = Math.ceil(diffDate / 3) * this.formData.adjustAmount * 5 / 100
          }else{ // 毎天产生300元票证滞纳金，算入溢价回购金额；
            ticketFee = diffDate * 300
          }
        }
        return this.dialog.data.ticketDate ? ticketFee : 0
      },
      set(value) {
        return value
      }
    },
    totalAmount() { // 溢价回购总额
      let totalAmount = Number(this.formData.adjustAmount) + Number(this.rateAmount) + (Number(this.dialog.data.ticketFee) || 0)
      return totalAmount.toFixed(2)
    }
  },
  data() {
    let that = this
    return {
      dateOptions: {
        disabledDate(time) {
          return time.getTime() < that.$utils.str2date(that.formData.voucherTime)
        }
      },
      scheme: ['', '每3天交计息融资金额5%的保证金，票证收齐或还款后将退回', '毎天产生300元票证滞纳金，算入溢价回购金额'],
      sample: {
        remarkImage: ['https://placeholdit.imgix.net/~text?txtsize=20&bg=eee&txtclr=999&txt=image&w=100&h=100'],
      },
      images: {
        remarkImage: [],
      },
      dialog: {
        title: '确定结算金额',
        visible: false,
        loading: false,
        rules: {
          ticketDate: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          // ticketFee: [
          //   { required: true, message: '必选项', trigger: 'blur' }
          // ]
        },
        data: {
          orderId: '',
          totalAmount: '',
          ticketFee: '',
          ticketDate: '',
          otherFee: '',
          remark: '',
          remarkImage: '',
        }
      }
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
      this.$utils.copyObj(this.dialog.data, this.formData)
      this.dialog.data.remark = ''
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
      let formData = Object.assign({}, this.getImages(this.dialog.data), { orderId: this.formData.id, totalAmount: this.totalAmount})
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.dialog.loading = true
          this.$api.order.verifyAmount(formData).then(({data}) => {
            this.$message.success('结算金额成功，等待财务审核确认')
            this.$emit('change', data)
            this.closeDialog()
          }).finally(() => {
            this.dialog.loading = false
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    }
  }
}
</script>
<style scoped lang="less">

</style>