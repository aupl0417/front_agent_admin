<template>
  <el-container v-if="info" class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="$router.back()"><b>汽贸店管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>详细信息</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="l-margin-r-x2">ID：{{info.id}}</span>
          <span>渠道商名称：{{info.agentName || '无'}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="l-margin-t l-zoom">
        <div class="l-fl" style="width: 920px; margin-right: 15px;">
          <div class="l-panel-item l-margin-b">
            <div class="_hd1 l-fs-xl l-flex-hc">
              <b>汽贸店基本信息</b>
              <span class="l-rest"></span>
              <div v-if="info.state == 0">
                <el-button type="danger" size="mini" @click.native="verifyConfirm(-1, 0)">拒绝</el-button>
                <el-button type="success" size="mini" @click.native="verifyConfirm(1, 0)">通过</el-button>
              </div>
              <div v-else-if="info.state === -1" class="l-txt-error">{{info.stateName}}（原因：{{info.reason}}）</div>
              <div v-else class="l-txt-ok"><i class="l-icon" v-if="info.state === 1">&#xe634;</i>{{info.stateName}}</div>
            </div>
            <div class="l-padding-xl">
              <table class="l-table-02" style="width: 845px;">
                <tr>
                  <td width="100" class="_tit">公司名称</td>
                  <td>{{info.name}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">企业信用代码</td>
                  <td>{{info.creditCode}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">法人姓名</td>
                  <td>{{info.corporation}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">身份证正反面</td>
                  <td><image-previewer :file-list="[info.idCardOn, info.idCardOff]"></image-previewer></td>
                </tr>
                <tr>
                  <td width="100" class="_tit">手机号码</td>
                  <td>{{info.phone}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">电子邮箱</td>
                  <td>{{info.email}}</td>
                </tr>
              </table>
              <div class="l-margin-t">
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">营业执照</div>
                  <div class="_img" :style="{'background-image': 'url('+info.license[0]+')'}">
                    <b @click="previewImage(0, info.license)">点击查看大图({{info.license.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">门店照片</div>
                  <div class="_img" :style="{'background-image': 'url('+info.image[0]+')'}">
                    <b @click="previewImage(0, info.image)">点击查看大图({{info.image.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">展厅照片</div>
                  <div class="_img" :style="{'background-image': 'url('+info.hallImage[0]+')'}">
                    <b @click="previewImage(0, info.hallImage)">点击查看大图({{info.hallImage.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">办公室/财务室照片</div>
                  <div class="_img" :style="{'background-image': 'url('+info.officeImage[0]+')'}">
                    <b @click="previewImage(0, info.officeImage)">点击查看大图({{info.officeImage.length}}张)</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="info.insurance" class="l-panel-item l-margin-b">
            <div class="_hd1 l-fs-xl l-flex-hc">
              <b>会员分期资格认证</b>
              <span class="l-rest"></span>
              <div v-if="info.insurance.state == 0">
                <el-button type="danger" size="mini" @click.native="verifyConfirm(-1, 1)">拒绝</el-button>
                <el-button type="success" size="mini" @click.native="verifyConfirm(1, 1)">通过</el-button>
              </div>
              <div v-else-if="info.insurance.state === -1" class="l-txt-error">{{info.insurance.stateName}}（原因：{{info.insurance.reason}}）</div>
              <div v-else class="l-txt-ok"><i class="l-icon" v-if="info.insurance.state === 5">&#xe634;</i>{{info.insurance.stateName}}</div>
            </div>
            <div class="l-padding-xl">
              <div class="l-image-preview l-margin-r">
                <div class="_tit">框架合同</div>
                <div class="_img" :style="{'background-image': 'url('+info.insurance.contract[0]+')'}">
                  <b @click="previewImage(0, info.insurance.contract)">点击查看大图({{info.insurance.contract.length}}张)</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 拒绝通过 -->
      <el-dialog :before-close="closeDialogReason" :title="dialogReason.title" :visible.sync="dialogReason.visible" width="400px">
        <el-input v-model="dialogReason.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入拒绝原因"></el-input>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialogReason()">取消</el-button>
          <el-button type="primary" :loading="dialogReason.loading" @click="submitDialogReason">{{ dialogReason.loading ? '提交中...' : '确定提交'}}</el-button>
        </span>
      </el-dialog>
      
      <!-- 预览图片 -->
      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import ImagePreviewer from '@/components/image-previewer'

export default {
  name: 'shop-info',
  components: { ImagePreviewer, },
  data() {
    return {
      images: [],
      loading: false,
      formData: {
        orgId: '',
        state: '',    // 2通过 -1拒绝
        reason: '',   // 拒绝原因
        amount: '',
        contractType: 0,
        contractUrl: ''
      },
      dialogReason: {
        title: '审核拒绝',
        type: 0,          // 0 基本认证  1 分期认证
        loading: false,
        visible: false,
        reason: '',
      },
      info: null
    }
  },
  methods: {
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getInfo() {
      this.$nprogress.start()
      this.$api.shop.getInfo(this.$route.query.id).then(({data}) => {
        data.license = data.license ? data.license.split(',') : []
        data.image = data.image ? data.image.split(',') : []
        data.hallImage = data.hallImage ? data.hallImage.split(',') : []
        data.officeImage = data.officeImage ? data.officeImage.split(',') : []
        this.info = data
      }).finally(() => {
        this.$nprogress.done()
      })
    },
    verifyConfirm(state = 1, type = 0) {
      if(state == 1) {
        this.$confirm('是否确定通过审核？', '认证提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确认通过',
          cancelButtonText: '取消'
        }).then(() => {
          let loading = this.$loading()
          let promise = type == 1 ? 
          this.$api.shop.verify2({ 
            orgId: this.info.id, 
            state: 5 
          }) : this.$api.shop.verify({ 
            orgId: this.info.id, 
            state 
          })

          promise.then(() => {
            this.$message.success('审核通过成功')
            this.getInfo()
          }).finally(() => {
            loading.close()
          })
        })
      }else if(state == -1) {
        this.dialogReason.type = type
        this.dialogReason.visible = true
      }
    },
    submitDialogReason() {
      if(!this.dialogReason.reason) {
        return this.$message.error('请输入拒绝原因')
      }

      let formData = {
        orgId: this.info.id,
        state: -1,
        reason: this.dialogReason.reason
      }
      let promise = this.dialogReason.type == 1 ? 
        this.$api.shop.verify2(formData) : this.$api.shop.verify(formData)

      let loading = this.$loading()
      promise.then(() => {
        this.dialogReason.reason = ''
        this.$message.success('已拒绝成功')
        this.closeDialogReason()
        this.getInfo()
      }).finally(() => {
        loading.close()
      })
    },
    closeDialogReason(done) {
      if(done) {
				done()
			}else{
				this.dialogReason.visible = false	
      }
    },
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
.l-info-null{ height: 500px; text-align: center;}
.l-men-info{
  width: 220px; border: 1px solid #efeff4; box-sizing: border-box; margin-right: -1px; padding: 0 0 0 15px;
  p{font-size: 12px; color: #5b7fc1;}
}

.l-shop-amount{
  position: relative; padding: 30px 15px 29px; 
  ._all{position: absolute; text-align: center; top: 50%; left: 50%; margin: -25px 0 0 -75px; width: 150px; height: 51px;}
}
</style>