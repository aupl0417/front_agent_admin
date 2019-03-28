<template>
  <el-container v-if="info" class="l-h100">
    <el-header class="l-padding-0" height="auto">
      <div :class="stateList[info.state].css">
        <i :class="stateList[info.state].icon"></i>&ensp;{{stateList[info.state].label}}
        <span v-if="info.state < 0">（{{info.reason}}）</span>

        <span class="l-margin-l-x2"></span>
        <span v-if="info.state === 0" class="l-margin-l">
          <el-button type="danger" size="mini" @click.native="formData.visible = true">拒绝通过</el-button>
          <el-button type="success" size="mini" @click.native="submitConfirm()">通过申请</el-button>
        </span>

        <span v-if="info.state === 10" class="l-margin-l">
          <el-button type="success" size="mini" @click.native="sureInsurance()">确认保险已出</el-button>
        </span>

        <span class="l-margin-l" v-if="info.state !== -3">
          <el-button white size="mini" @click.native="closeReason.visible = true">关闭订单</el-button>
        </span>
      </div>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="$router.back()"><b>会员分期管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        <el-breadcrumb-item class="l-fs-xs">
          <span class="l-margin-r-x2">订单编号：{{info.orderId}}</span>
          <span class="l-margin-r-x2">汽贸店名称：{{info.createName}}</span>
          <span>渠道商名称：{{info.agentName || '无'}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="l-margin-t l-zoom">
        <div class="l-order-info l-margin-r l-fl" style="width: 790px;">
          <!-- 保理信息 -->
          <div class="l-panel-item">
            <div class="_hd"><i class="l-txt-gray">保理信息</i></div>
            <div class="_bd">
              <div class="l-zoom">
                <b class="l-minw-33">会费总额：<i class="l-rmb l-txt-main">{{info.amount | Currency}}</i></b>
                <p class="l-minw-33">分期期数：{{info.period}}期</p>
                <p class="l-minw-33">月利率：{{info.rate}}%</p>
                <p class="l-minw-33">每月还款日期：{{info.payDate}}号</p>
                <p class="l-minw-33">每期还款金额：<i class="l-rmb">{{info.monthFee}}</i></p>
                <p class="l-minw-33">备注：{{info.remark}}</p>
              </div>
              <div class="l-zoom l-margin-t-m">
                <div class="l-minw-33">
                  <p>贷款合同</p>
                  <image-previewer :file-list="info.loanContract"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>划款授权及承诺协议</p>
                  <image-previewer :file-list="info.protocol"></image-previewer>
                </div>
              </div>
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>会员服务合同</p>
                  <image-previewer :file-list="info.serviceContract"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>会员服务合同发票</p>
                  <image-previewer :file-list="info.contractTicket"></image-previewer>
                </div>
              </div>
            </div>
          </div>

          <!-- 客户资料 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><i class="l-txt-gray">客户资料</i></div>
            <div class="_bd">
              <div class="l-zoom">
                <b class="l-minw-33">客户姓名：{{info.userName}}</b>
                <p class="l-minw-33">客户类型：{{info.type}}</p>
                <p class="l-minw-33">手机号码：{{info.phone}}</p>
              </div>
              <div class="l-zoom l-margin-t-m">
                <div class="l-minw-33">
                  <p>身份证号：<i class="l-fs-xs">{{info.idCard}}</i></p>
                  <image-previewer :file-list="[info.idCardOn, info.idCardOff]"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>还款卡号：<i class="l-fs-xs">{{info.bankAccount}}</i></p>
                  <image-previewer :file-list="[info.bankCardOn, info.bankCardOff]"></image-previewer>
                </div>
                <div class="l-minw-33" v-if="info.type === '保有客户'">
                  <p>行驶证</p>
                  <image-previewer :file-list="info.drivingLicense"></image-previewer>
                </div>
              </div>
            </div>
          </div>

          <!-- 保理车辆信息 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><i class="l-txt-gray">保理车辆信息</i></div>
            <div class="_bd">
              <div class="l-zoom">
                <b class="l-minw-33">车型：{{info.carName}}</b>
              </div>
              <div class="l-zoom l-margin-t-m">
                <p class="l-minw-33">车&ensp;架&ensp;号：{{info.frameNumber}}</p>
                <p class="l-minw-33">车身颜色：{{info.color}}</p><br>
                <p class="l-minw-33">发动机号：{{info.engine}}</p>
                <p class="l-minw-33">车辆合同价：<i class="l-rmb">{{info.purchasePrice}}</i></p>
              </div>
              <div class="l-zoom l-margin-t-m" v-if="info.type === '新车客户'">
                <div class="l-minw-33">
                  <p>订车合同</p>
                  <image-previewer :file-list="info.drivingLicense"></image-previewer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.state >= 10" class="l-order-info l-fl" response style="width: 450px;">
          <div class="l-repay-now" v-if="info.state === 50">
            <div class="_inner l-flex-vhc">
              <h3 class="l-fs-x2">
                <i class="l-icon l-txt-blue">&#xe672;</i>&nbsp;<span class="l-fs-xl">订单已还清</span>
              </h3>
            </div>
          </div>
          <div class="l-repay-now" v-else-if="payToday">
            <div class="_inner l-flex-hc">
              <div class="l-rest">
                <h3>今日应还</h3>
                <p class="l-txt-gray">请催促客户及时还款</p>
              </div>
              <i class="l-fs-x2 l-txt-main l-rmb">{{payToday.amount | Currency}}</i>
            </div>
          </div>
          <div class="l-repay-list">
            <div class="_hd"><h3>还款计划</h3></div>
            <div class="_bd">
              <div class="_item" v-for="item in info.monthlyRecord" :key="item.id">
                <p>
                  <span class="l-fr" :class="payState[item.state].css">
                    {{item.stateName}}<i v-if="item.state === 3">{{item.overDueDays}}天，罚息{{item.overdueFee}}</i>
                  </span>
                  <span>应还金额：<i class="l-rmb l-txt-ok">{{item.amount | Currency}}</i></span>
                  <span class="l-liney"></span>
                  <span class="l-fs-xxs l-txt-gray l-dib">含手续费：<i class="l-rmb">{{item.fee}}</i></span>
                </p>
                <p>
                  <span class="l-fr" v-if="[-1, 3].includes(item.state)">
                    <i class="l-txt-link l-margin-l" @click="showPaySure(item.id)">确认收款</i>
                    <i class="l-txt-link l-margin-l" @click="showPayAgain(item)">发起扣款</i>
                  </span>

                  <span class="l-margin-r-m">还款日期：{{item.payDate}}</span>
                  <el-popover v-if="item.state !== 0" placement="bottom" width="230" trigger="click" @show="getPayRecord(item.id)">
                    <span slot="reference">
                      <i class="l-txt-blue">支付记录</i>&nbsp;<i class="l-fs-xs el-icon-caret-bottom l-txt-gray2"></i>
                    </span>
                    <div class="l-pay-record">
                      <div v-show="payRecord.loading" class="l-padding l-txt-center l-txt-gray"><i class="el-icon-loading"></i></div>
                      <div v-show="!payRecord.loading && payRecord.data.length === 0" class="l-padding l-txt-center l-txt-gray">暂无记录</div>
                      <div class="_item" v-for="payItem in payRecord.data" :key="payItem.id">
                        <p class="l-txt-gray">操作时间：{{payItem.createTime}}</p>
                        <!-- <p>商户订单号：{{payItem.orderId}}</p> -->
                        <p v-if="payItem.transId">交易编号：{{payItem.transId}}</p>
                        <p>交易金额：<i class="l-rmb">{{payItem.amount}}</i></p>
                        <p>交易状态：<i :class="payState2[payItem.state].css">{{payState2[payItem.state].label}}</i></p>
                        <p v-if="payItem.voucher">交易凭证：<span class="l-txt-link" @click="previewImage(0, [payItem.voucher])">点击查看</span></p>
                        <p>交易备注：{{payItem.remark}}</p>
                      </div>
                    </div>
                  </el-popover>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单审核通过/拒绝 -->
      <el-dialog :title="formData.title" :visible.sync="formData.visible" width="500px">
        <el-input v-model="formData.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入拒绝原因，如个人资料缺失，上传错误资料等"></el-input>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="formData.visible = false">取消</el-button>
          <el-button type="primary" :loading="formData.loading" @click="submit(-1)">{{ formData.loading ? '提交中...' : '确定拒绝'}}</el-button>
        </span>
      </el-dialog>

      <!-- 订单关闭 -->
      <el-dialog :title="closeReason.title" :visible.sync="closeReason.visible" width="500px">
        <el-input v-model="closeReason.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入关闭原因"></el-input>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeReason.visible = false">取消</el-button>
          <el-button type="primary" :loading="closeReason.loading" @click="submitClose">{{ closeReason.loading ? '提交中...' : '确定关闭'}}</el-button>
        </span>
      </el-dialog>

      <!-- 发起扣款 -->
      <el-dialog title="发起扣款" :visible.sync="payAgain.visible" width="450px">
        <div style="margin: -15px 0 10px;">
          <p>本次扣款金额：<i class="l-rmb l-txt-error">{{payAgain.info.amount}}</i></p>
          <p>扣款银行卡号：</p>
        </div>
        <div class="l-flex-hc">
          <el-select style="width: 300px;" v-model="payAgain.sltedCard" placeholder="请选择">
            <el-option v-for="item in payAgain.cardList" :key="item.id" :label="item.account" :value="item.account"></el-option>
          </el-select>
          <el-button class="l-margin-l" type="success" @click.native="payAgain.innerVisible = true">使用新卡</el-button>
        </div>
        <br>
        <el-dialog append-to-body title="新卡扣款" :visible.sync="payAgain.innerVisible" width="450px">
          <el-form label-position="top" style="margin: 0 30px 0 20px;">
            <el-form-item label="扣款银行卡号">
              <el-input v-model="payAgain.account" maxlength="100" placeholder="请输入扣款银行卡号"></el-input>
            </el-form-item>
            <el-form-item label="绑卡验证码">
              <div class="l-flex-hc">
                <el-input v-model="payAgain.code" maxlength="6" placeholder="请输入绑卡验证码"></el-input>
                <el-button class="l-margin-l" style="width: 120px;" ref="sendCodeBtn" type="success" @click.prevent="sendBindCode()">获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="l-txt-center">
            <el-button white @click="payAgain.innerVisible = false">返回</el-button>
            <el-button type="primary" :loading="payAgain.loading" @click="submitPayAgain(1)">{{ payAgain.loading ? '扣款中...' : '确定扣款'}}</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="l-txt-center">
          <el-button white @click="payAgain.visible = false">取消</el-button>
          <el-button type="primary" :loading="payAgain.loading" @click="submitPayAgain(0)">{{ payAgain.loading ? '扣款中...' : '确定扣款'}}</el-button>
        </div>
      </el-dialog>

      <!-- 确认收款 -->
      <el-dialog title="确认收款" :visible.sync="paySure.visible" width="450px">
        <el-form label-position="top" style="margin: 0 30px 0 20px;">
          <el-form-item label="收款凭证：">
            <uploader :file-list.sync="paySure.voucher" :sample-pic="['https://placeholdit.imgix.net/~text?txtsize=20&bg=eee&txtclr=999&txt=image&w=100&h=100']"></uploader>
          </el-form-item>
          <el-form-item label="收款备注：">
            <el-input type="textarea" :rows="3" placeholder="请输入收款备注说明" v-model="paySure.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="l-txt-center">
          <el-button white @click="paySure.visible = false">取消</el-button>
          <el-button type="primary" :loading="paySure.loading" @click="submitPaySure()">{{ paySure.loading ? '确认中...' : '确认已收款'}}</el-button>
        </div>
      </el-dialog>

      <!-- 预览图片 -->
      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import ImagePreviewer from '@/components/image-previewer'
import Uploader from '@/components/uploader'
import { mapGetters } from 'vuex'
export default {
  name: 'hyfq-order-info',
  components: {
    ImagePreviewer,
    Uploader,
  },
  data() {
    return {
      stateList: {
        '0': { label: '审核中', value: 0, css: 'l-alert-ok', icon: 'el-icon-warning' },
        '5': { label: '待放款', value: 5, css: 'l-alert-ok', icon: 'el-icon-warning' },
        '10': { label: '放款成功，待出保险', value: 10, css: 'l-alert-ok', icon: 'el-icon-success' },
        '20': { label: '已出保险，待还款中', value: 20, css: 'l-alert-warn', icon: 'el-icon-warning' },
        '30': { label: '扣款失败', value: 30, css: 'l-alert-error', icon: 'el-icon-error' },
        '40': { label: '已逾期', value: 40, css: 'l-alert-error', icon: 'el-icon-error' },
        '50': { label: '已还清', value: 50, css: 'l-alert-ok', icon: 'el-icon-success' },
        '-3': { label: '已关闭', value: -3, css: 'l-alert-gray' },
        '-2': { label: '不放款', value: -2, css: 'l-alert-gray' },
        '-1': { label: '已拒绝', value: -1, css: 'l-alert-gray' },
      },
      payState: { // 还款记录状态
        '-1': { label: '扣款失败', value: 0, css: 'l-txt-error' },
        '0': { label: '未还款', value: 5, css: 'l-txt-gray' },
        '1': { label: '已还款', value: 10, css: 'l-txt-ok' },
        '2': { label: '处理中', value: 20, css: 'l-txt-warn' },
        '3': { label: '已逾期', value: 30, css: 'l-txt-error' },
      },
      payState2: { // 支付记录状态
        '-2': { label: '失败', value: -2, css: 'l-txt-error' },
        '-1': { label: '失败', value: -1, css: 'l-txt-error' },
        '0': { label: '--', value: 0, css: 'l-txt-gray' },
        '1': { label: '成功', value: 1, css: 'l-txt-ok' },
        '2': { label: '处理中', value: 2, css: 'l-txt-warn' },
        '3': { label: '成功', value: 2, css: 'l-txt-warn' },
        '4': { label: '处理中', value: 2, css: 'l-txt-warn' },
      },
      payRecord: { // 支付记录
        loading: false,
        data: []
      },
      // 图片预览
      images: [],
      // 审核信息
      formData: {
        title: '拒绝原因',
        loading: false,
        visible: false,
        orderId: '',
        state: '',          // 1拒绝 2通过
        reason: '',         // 拒绝原因
      },
      // 关闭原因
      closeReason: {
        title: '关闭订单',
        loading: false,
        visible: false,
        reason: ''
      },
      // 发起扣款
      payAgain: {
        loading: false,
        visible: false,
        innerVisible: false,
        cardList: [],
        info: {},
        sltedCard: '',
        account: '',
        code: '',
      },
      // 确认收款
      paySure: {
        loading: false,
        visible: false,
        id: '',
        voucher: [],
        remark: ''
      },
      // 订单信息
      info: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    payToday() {
      return this.info.monthlyRecord && this.info.monthlyRecord.filter(item => item.isPayDate === 1)[0]
    },
  },
  methods: {
    sendBindCode() {
      if(!this.payAgain.account){
        return this.$message.error('请输入扣款银行卡号')
      }

      let btn = this.$refs.sendCodeBtn.$el
      if(btn.time >= 0) return 

      btn.time = 60
      btn.timeId = 0
      btn.oldText = btn.textContent
      btn.setAttribute('disabled', true)
      btn.textContent = '60s'
      btn.timeId = setInterval(() => {
        if(--btn.time >= 0) {
          btn.textContent = `${btn.time}s`
        } else {
          clearInterval(btn.timeId)
          btn.removeAttribute('disabled')
          btn.textContent = btn.oldText
        }
      }, 1000)

      this.$api.hyfq.sendBindCode({
        id: this.payAgain.info.id,
        account: this.payAgain.account
      }).then(() => {
        this.$message.success('绑卡验证码已发送到扣款银行卡预留手机，请提醒客户查收！')
      }).catch(() => {
        clearInterval(btn.timeId)
        btn.time = -1
        btn.removeAttribute('disabled')
        btn.textContent = btn.oldText
      })
    },
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getPayRecord(id = '') { // 获取支付记录
      this.payRecord.data = []
      this.payRecord.loading = true
      this.$api.hyfq.getPayRecord(id).then(({data}) => {
        if(data && data.length > 0) {
          this.payRecord.data = data
        }
      }).finally(() => {
        this.payRecord.loading = false
      })
    },
    getInfo() {
      this.$nprogress.start()
      this.$api.hyfq.getOrderInfo(this.$route.query.id).then(({data}) => {
        if(data) {
          this.info = data
        }
      }).finally(() => {
        this.$nprogress.done()
      })
    },
    // 订单审核
    submitConfirm() {
      this.$confirm('请确认资料无误，通过审核？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认通过',
        cancelButtonText: '取消'
      }).then(() => {
        this.submit(5)
      })
    },
    submit(type = 5) {
      let formData = this.$utils.copyObj({ orderId: '', reason: '' }, this.formData)
      let message = '通过成功，等待放款'
      if(type === -1){ // 拒绝通过
        if(!formData.reason) {
          return this.$message.error('请输入拒绝原因')
        }
        this.formData.visible = false
        message = '拒绝成功'
      }

      formData.orderId = this.info.id
      formData.state = type
      let loading = this.$loading()
      this.$api.hyfq.verifyOrder(formData).then(() => {
        this.$message({
          type: 'success',
          message,
          duration: 1000,
          onClose: () => {
            this.getInfo()
          }
        })
      }).finally(() => {
        loading.close()
      })
    },
    // 订单关闭
    submitClose() {
      let loading = this.$loading()
      this.$api.hyfq.closeOrder({
        orderId: this.info.id,
        reason: this.closeReason.reason
      }).then(() => {
        this.closeReason.visible = false
        this.$message({
          type: 'success',
          message: '订单关闭成功',
          duration: 1000,
          onClose: () => {
            this.getInfo()
          }
        })
      }).finally(() => {
        loading.close()
      })
    },
    // 确认保险已出
    sureInsurance() {
      this.$confirm('是否确定保险已出？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let loading = this.$loading()
        this.$api.hyfq.sureInsurance(this.info.id).then(() => {
          this.$message.success('操作成功')
          this.getInfo()
        }).finally(() => {
          loading.close()
        })
      })
    },
    showPayAgain(item) {
      let loading = this.$loading()
      this.$api.hyfq.getCardList(item.id).then(({data}) => {
        this.payAgain.info = item
        if(data) {
          this.payAgain.cardList = data
          this.payAgain.sltedCard = data[0].account
        }else{
          this.payAgain.cardList = []
        }
        this.payAgain.visible = true
      }).finally(() => {
        loading.close()
      })
    },
    // 确认扣款
    submitPayAgain(type = 0) {
      let formData = {
        type,
        id: this.payAgain.info.id,
      }
      if(type === 0){
        if(!this.payAgain.sltedCard) {
          return this.$message.error('请选择扣款银行卡')
        }
        formData.account = this.payAgain.sltedCard
      }else {
        if(!this.payAgain.account) {
          return this.$message.error('请输入扣款银行卡')
        }
        if(!this.payAgain.code) {
          return this.$message.error('请输入绑卡验证码')
        }
        formData.account = this.payAgain.account
        formData.code = this.payAgain.code
      }
      
      this.payAgain.loading = true
      this.$api.hyfq.payAgain(formData).then(() => {
        this.$message.success('操作成功')
        this.payAgain.visible = false
        this.payAgain.innerVisible = false
        this.getInfo()
      }).finally(() => {
        this.payAgain.loading = false
      })
    },
    // 确认收款
    showPaySure(id = '') {
      this.paySure.id = id
      this.paySure.visible = true
    },
    submitPaySure() {
      if(this.paySure.voucher.length === 0){
        return this.$message.error('请上传收款凭证')
      }

      this.paySure.loading = true
      this.$api.hyfq.payConfirm({
        id: this.paySure.id,
        voucher: this.paySure.voucher,
        remark: this.paySure.remark,
      }).then(() => {
        this.$message.success('确认收款成功')
        this.paySure.visible = false
        this.getInfo()
      }).finally(() => {
        this.paySure.loading = false
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
.l-repay-now{
  background-color: #fff; padding: 15px;
  ._inner{ background-color: #eee; padding: 15px; }
}
.l-repay-list{
  background-color: #fff; padding: 15px; max-height: 603px; overflow: auto;
  ._item{
    border-top: 1px solid #eee; margin-top: 15px; padding-top: 10px; font-size: 12px;
    p{margin: 5px 0;}
  }
}

.l-pay-record{
  padding: 5px 10px; font-size: 12px; max-height: 300px; overflow: auto;
  p{margin: 3px 0;}
  ._item{border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;word-break: break-all;}
  ._item:last-child{
    border-bottom: none; padding-bottom: 0; margin-bottom: 0;
  }
}

@media screen and (max-width: 1600px) {  
  .l-order-info[response]{width: 790px !important;  margin-top: 15px;}
  .l-repay-list{max-height: none !important;}
}
</style>