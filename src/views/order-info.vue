<template>
  <el-container v-if="info" class="l-h100">
    <el-header class="l-padding-0" height="auto">
      <div :class="getState(info.state).css">
        <i :class="getState(info.state).icon"></i>&ensp;{{getState(info.state).label}}
        <span v-if="[0, 3, 4, 6].includes(info.state)">&ensp;-&ensp;{{statusList[info.status].label}}</span>
        <span v-else-if="info.state < 0">（{{info.reason}}）</span>
        <span v-if="info.status === 10 && info.pay4sState">（{{pay4sState[info.pay4sState]}}）</span>
        <span v-if="info.status === -1">（{{info.reason}}）</span>

        <span class="l-margin-l-x2"></span>
        <span v-if="info.state === 0 && info.status === 0" class="l-margin-l">
          <el-button white size="mini" @click.native="formData.visible = true">拒绝通过</el-button>
          <el-button type="success" size="mini" @click.native="submitConfirm()">通过申请</el-button>
        </span>

        <span class="l-margin-l" v-if="info.state !== -11">
          <el-button type="danger" size="mini" @click.native="closeReason.visible = true">关闭订单</el-button>
        </span>
      </div>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/order/list">垫资单管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.orderId}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="l-margin-t l-zoom">
        <div class="l-panel-item l-margin-b">
          <div class="_hd l-border-b" style="padding-bottom: 15px;max-width: 1170px;">
            <span class="l-fr l-txt-gray l-margin-t-s">
              申请垫资门店：<router-link class="l-txt-link" :to="'/shop/info?id=' + info.orgId">{{info.orgName}}</router-link>
            </span>
            <span class="l-dib">
              <b class="l-fs-xl">计息融资金额：</b>
              <i class="l-fs-x2 l-rmb l-txt-theme">{{info.adjustAmount || info.amount}}</i>
            </span>
            <span v-if="info.state <= 2" class="l-margin-l l-dib l-txt-error">
              应收保证金：<i class="l-rmb">{{info.adjustBond || info.bond}}</i>
            </span>
            
            <span v-if="info.state === 6 && info.status > 18" class="l-margin-l l-dib">
              <b class="l-fs-xl">溢价回购总额：</b>
              <i class="l-fs-x2 l-rmb l-txt-theme">{{info.totalAmount}}</i>
            </span>
            <span v-if="info.status > 18" class="l-margin-l l-dib">其他第三方费用：<i class="l-rmb">{{info.otherFee}}</i></span>

            <!-- 订单状态对应操作 -->
            <span v-if="info.state === 0" class="l-margin-l l-txt-link l-dib">
              <b v-if="info.status === 0" @click="showDialogAmount()">
                <i class="el-icon-edit-outline"></i>&nbsp;调整融资金额及利率
              </b>
            </span>
            <span v-else-if="info.state === 3" class="l-margin-l l-txt-link l-dib">
              <b v-if="info.status === 2" @click="wuliuVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;录入物流信息
              </b>
              <b v-else-if="info.status === 4" @click="checkcarVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;录入验车信息
              </b>
              <b v-else-if="info.status === 10 && info.pay4sState != 0 " @click="dialog4sAmount.visible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;财务确认放款 <i class="l-rmb">{{pay4sAmount}}</i>
              </b>
              <b v-else-if="info.status === 12" @click="loadcarVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;录入装车信息
              </b>
            </span>
            <span v-else-if="info.state === 4" class="l-margin-l l-txt-link l-dib">
              <b v-if="info.status === 14" @click="instockVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;录入入库信息
              </b>
            </span>
            <span v-else-if="info.state === 6" class="l-margin-l l-txt-link l-dib">
              <b v-if="info.status === 18" @click="settleVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;请审核结算申请
              </b>
              <b v-else-if="info.status === 20" @click="showDialogAmount2()">
                <i class="el-icon-edit-outline"></i>&nbsp;请确认结算金额
              </b>
              <b v-else-if="info.status === 24" @click="dialogAmount3.visible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;请确认收齐款项
              </b>
            </span>
            
            <!-- 其他订单信息 -->
            <div class="l-order-info1">
              <span>融资期限：{{info.period}}天</span>
              <span class="l-liney"></span>
              <el-popover placement="bottom-start" width="300" trigger="hover" content="以实际放款日为准，乙方按照合同约定无条件溢价回购已转让债权，并向甲方按照合同之约定支付回购价款的行为">
                <span slot="reference">
                  <i class="el-icon-question l-txt-theme" title=""></i>
                  溢价回购期限：{{info.deadline}}
                </span>
              </el-popover>
              <template v-if="info.status > 10">
                <span class="l-liney"></span>
                <span class="l-dib">实际放款日期：{{info.voucherTime}}</span>
              </template>
              <template  v-if="info.state > 2">
                <span class="l-liney"></span>
                <span class="l-dib">已收保证金：<i class="l-rmb">{{info.adjustBond || info.bond}}</i></span>
              </template>
              <span class="l-liney"></span>
              <span class="l-dib">日利率：{{info.rate ? (info.rate + '%') : '未设置'}}</span>
              <template v-if="info.status > 16">
                <span class="l-liney"></span>
                <span class="l-dib">产生利息：<i class="l-rmb">{{info.interests}}</i></span>
              </template>
              <template v-if="info.status > 18">
                <span class="l-liney"></span>
                <span class="l-dib">票证滞纳费：<i class="l-rmb">{{info.ticketFee}}</i></span>
              </template>
            </div>
          </div>
          <div class="l-zoom l-padding-x">
            <div class="l-carsInfo l-fl">
              <p>
                <i class="_tag">垫资车辆</i>
                <b class="l-fs-l l-margin-r">{{info.carName}} {{info.style}}</b>
                <span>车架号：{{info.frameNumber}}</span>
              </p>
              <div class="l-margin-t">
                <p>
                  <span class="_item">车辆变速箱：{{info.gearbox}}</span>
                  <span class="_item">车身颜色：{{info.color}}</span>
                  <span class="_item">内饰颜色：{{info.interiorColor}}</span>
                </p>
                <p>
                  <span class="_item">官方指导价：<i class="l-rmb">{{info.guidePrice}}</i></span>
                  <span class="_item">提车时间：{{info.pickUpTime}}</span>
                  <el-popover v-if="info.type === '选配'" placement="bottom-start" width="300" trigger="hover" :content="info.remark">
                    <span class="_item" slot="reference">车辆配置：{{info.type}} <i class="el-icon-caret-bottom"></i></span>
                  </el-popover>
                  <span v-else class="_item">车辆配置：{{info.type}}</span>
                </p>
              </div>
              <div class="l-margin-t-s">
                <p class="_tag2 l-margin-r">
                  <span class="l-dib" style="min-width: 200px;">
                    4S店采购价：<i class="l-rmb">{{info.purchasePrice}}</i>
                  </span>
                  <i class="l-liney"></i>
                  <span class="l-dib" style="min-width: 200px;">
                    已付4S店定金：<i class="l-rmb">{{info.paidDeposit}}</i>
                  </span>
                </p>
                <p class="_tag2 l-margin-r">
                  <span class="l-dib" style="min-width: 200px;">
                    买方成交价：<i class="l-rmb">{{info.price}}</i>
                  </span>
                  <i class="l-liney"></i>
                  <span class="l-dib" style="min-width: 200px;">
                    买方已付定金：<i class="l-rmb">{{info.deposit}}</i>
                  </span>
                </p>
              </div>
            </div>
            <div class="l-order-news l-fl">
              <h4>订单动态</h4>
              <el-steps v-if="info.records && info.records.length > 0" class="l-margin-t" direction="vertical" :active="0">
                <el-step v-for="(item,index) in info.records" :key="index">
                  <img slot="icon" src="../assets/images/20180828001.jpg" alt="">
                  <div slot="description">
                    <p>{{item.createTime}} <el-tag v-if="index === 0" class="l-margin-l-s" type="danger" size="mini">最新</el-tag></p>
                    <p>
                      {{item.title}} 
                      <a class="l-txt-link l-margin-l-s" v-if="[0, 1, 3, 5, 26, 31].includes(item.type)" @click="showViewer(item)">查看详情</a>
                    </p>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <div class="l-zoom l-bg-white">
          <div class="l-fl l-margin-r" style="width: 790px;">
            <div class="l-panel-item l-margin-b">
              <div class="_hd l-fs-xl"><b>买方（车主）信息</b></div>
              <div class="l-padding-x">
                <table class="l-table-02" style="width: 100%;">
                  <tr>
                    <td width="100" class="_tit">买方姓名</td>
                    <td>{{info.userName}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">手机号码</td>
                    <td>{{info.phone}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">身份证号</td>
                    <td>{{info.idCard}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">居住地址</td>
                    <td>{{info.address}}</td>
                  </tr>
                </table>
                <div class="l-margin-t">
                  <div class="l-image-preview l-margin-r">
                    <div class="_tit">定金凭证</div>
                    <div class="_img" :style="{'background-image': 'url('+info.voucher[0]+')'}">
                      <b @click="previewImage(0, info.voucher)">点击查看大图({{info.voucher.length}}张)</b>
                    </div>
                  </div>
                  <div class="l-image-preview l-margin-r">
                    <div class="_tit">购车合同</div>
                    <div class="_img" :style="{'background-image': 'url('+info.contractUrl[0]+')'}">
                      <b @click="previewImage(0, info.contractUrl)">点击查看大图({{info.contractUrl.length}}张)</b>
                    </div>
                  </div>
                  <!-- <div class="l-image-preview">
                    <div class="_tit">对公收款账号复印件</div>
                    <div class="_img" :style="{'background-image': 'url('+info.bankCard[0]+')'}">
                      <b @click="previewImage(0, info.bankCard)">点击查看大图({{info.bankCard.length}}张)</b>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="l-panel-item l-margin-b">
              <div class="_hd l-fs-xl"><b>销售商（4S店）信息</b></div>
              <div class="l-padding-x">
                <table class="l-table-02" style="width: 100%;">
                  <tr>
                    <td width="100" class="_tit">销售商名称</td>
                    <td>{{info.shopName}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">公司详细地址</td>
                    <td>{{info.orgAddress}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">公司联系人</td>
                    <td>{{info.orgLink}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">联系人手机</td>
                    <td>{{info.orgPhone}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">对公收款账户</td>
                    <td>{{info.account}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">收款账户开户支行</td>
                    <td>{{info.bankBranch}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="l-fl" style="width: 380px;">
            <div class="l-panel-item" style="width: 380px; margin: 0 15px 15px 0;">
              <div class="_hd l-fs-xl"><b>相关合同签署</b></div>
              <div class="l-padding-xl" v-if="info.state === 0 && info.status === 0">
                <div class="l-contract-pre l-flex-vhc _1">
                  <div class="_tag" :title="contractList.B3.type === 1 ? '自定义' : '默认'"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="contractList.B3.contractUrl">{{contractList.B3.title}}</a>
                  </div>
                  <div class="l-txt-center l-margin-t l-fs-xs">
                    <el-upload style="display:inline-block;" ref="upload" :show-file-list="false" accept=".pdf" action="" :auto-upload="false" :on-change="uploadChange">
                      <a slot="trigger" class="l-txt-link" @click="uploadClick('B3', 1)">上传自定义合同</a>
                    </el-upload>
                    <a class="l-txt-link l-margin-l" @click="uploadClick('B3', 0)">使用默认合同</a>
                  </div>
                  <div v-show="contractList.B3.loading" class="l-flex-vhc _loading">
                    <i class="el-icon-loading" style="font-size: 20px; margin-bottom: 10px;"></i>
                    <p class="l-fs-s">合同上传中</p>
                  </div>
                </div>
                <div class="l-contract-pre l-flex-vhc _1 l-margin-t">
                  <div class="_tag" :title="contractList.B4.type === 1 ? '自定义' : '默认'"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="contractList.B4.contractUrl">{{contractList.B4.title}}</a>
                  </div>
                  <div class="l-txt-center l-margin-t l-fs-xs">
                    <el-upload style="display:inline-block;" ref="upload" :show-file-list="false" accept=".pdf" action="" :auto-upload="false" :on-change="uploadChange">
                      <a slot="trigger" class="l-txt-link" @click="uploadClick('B4', 1)">上传自定义合同</a>
                    </el-upload>
                    <a class="l-txt-link l-margin-l" @click="uploadClick('B4', 0)">使用默认合同</a>
                  </div>
                  <div v-show="contractList.B4.loading" class="l-flex-vhc _loading">
                    <i class="el-icon-loading" style="font-size: 20px; margin-bottom: 10px;"></i>
                    <p class="l-fs-s">合同上传中</p>
                  </div>
                </div>
              </div>
              <div class="l-padding-xl" v-else>
                <div class="l-contract-pre l-flex-vhc">
                  <div :class="'_tag' + info.contractList.B3.state" :title="info.contractList.B3.stateName"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="info.contractList.B3.Template">{{info.contractList.B3.Title}}</a>
                  </div>
                </div>

                <div class="l-contract-pre l-flex-vhc l-margin-t">
                  <div :class="'_tag' + info.contractList.B4.state" :title="info.contractList.B4.stateName"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="info.contractList.B4.Template">{{info.contractList.B4.Title}}</a>
                  </div>
                </div>
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
          <el-button type="primary" :loading="formData.loading" @click="submit(1)">{{ formData.loading ? '提交中...' : '确定拒绝'}}</el-button>
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

      <!-- 调整费率 -->
      <el-dialog :title="dialogAmount.title" :before-close="closeDialogAmount" :visible.sync="dialogAmount.visible" width="750px">
        <div class="l-carsInfo" style="border:none;">
          <p>
            <i class="_tag">垫资车辆</i>
            <b class="l-fs-xl l-margin-r-x2">{{info.carName}} {{info.style}}</b>
            <span>车架号：{{info.frameNumber}}</span>
          </p>
          <div class="l-margin-t-s">
            <p class="_tag2 l-margin-r">
              <span class="l-dib" style="min-width: 200px;">
                4S店采购价：<i class="l-rmb">{{info.purchasePrice}}</i>
              </span>
              <i class="l-liney"></i>
              <span class="l-dib" style="min-width: 200px;">
                已付定金：<i class="l-rmb">{{info.paidDeposit}}</i>
              </span>
            </p>
            <p class="_tag2 l-margin-r">
              <span class="l-dib" style="min-width: 200px;">
                买方成交价：<i class="l-rmb">{{info.price}}</i>
              </span>
              <i class="l-liney"></i>
              <span class="l-dib" style="min-width: 200px;">
                已收定金：<i class="l-rmb">{{info.deposit}}</i>
              </span>
            </p>
          </div>
          <br>
          <el-form class="l-form-1 l-margin-t" inline label-position="top" ref="infoForm" label-width="90px" :model="dialogAmount.data">
            <el-form-item label="计息融资金额" prop="amount">
              <el-input style="width: 350px;" v-model="dialogAmount.data.amount" placeholder="请输入" :maxlength="10">
                <template slot="prepend">￥</template>
                <span class="l-fs-xs" slot="append">
                  原申请金额：<i>{{info.amount}}</i>
                </span>
              </el-input>
            </el-form-item>
            <el-form-item label="日利率" prop="rate">
              <el-input style="width: 200px;" v-model="dialogAmount.data.rate" placeholder="请输入" :maxlength="11">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialogAmount()">取消</el-button>
          <el-button type="primary" :loading="dialogAmount.loading" @click="submitDialogAmount">{{ dialogAmount.loading ? '提交中...' : '确定提交'}}</el-button>
        </span>
      </el-dialog>
      <!-- 业务员录入物流信息 -->
      <dialog-wuliu :visible.sync="wuliuVisible" :form-data="{ orderId: info.id }" @change="getInfo"></dialog-wuliu>
      <!-- 业务员录入验车信息 -->
      <dialog-checkcar :visible.sync="checkcarVisible" :form-data="{ orderId: info.id }" @change="getInfo"></dialog-checkcar>
      <!-- 财务放款给4s店 -->
      <el-dialog :before-close="closeDialog4sAmount" :visible.sync="dialog4sAmount.visible" width="400px">
        <b slot="title" class="l-fs-xl">
          代付车款：<i class="l-rmb l-txt-error">{{pay4sAmount}}</i>
        </b>
        <p class="l-txt-gray" style="margin: -10px 0 10px;">付款前请核对金额是否正确</p>
        <el-form ref="loanForm" label-position="left">
          <el-form-item>
            <div class="l-flex-hc">
              <el-input type="text" v-model.trim="dialog4sAmount.code" placeholder="请输入短信授权码"  :maxlength="6">
              </el-input>
              <el-button class="l-margin-l-m" style="width: 120px;" type="primary" plain @click.prevent="sendCode($event)">获取授权码</el-button>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button  white @click="closeDialog4sAmount()">取消</el-button>
          <el-button style="width: 112px;" type="primary" :loading="dialog4sAmount.loading" @click="submitDialog4sAmount()">{{ dialog4sAmount.loading ? '提交中...' : '确定放款'}}</el-button>
        </span>
      </el-dialog>
      <!-- 业务员录入装车信息 -->
      <dialog-loadcar :visible.sync="loadcarVisible" :form-data="{ orderId: info.id }" @change="getInfo"></dialog-loadcar>
      <!-- 业务员录入入库信息 -->
      <dialog-instock :visible.sync="instockVisible" :form-data="{ orderId: info.id }" @change="getInfo"></dialog-instock>
      <!-- 业务员结算金额 -->
      <dialog-settle :visible.sync="settleVisible" :form-data="info" @change="getInfo"></dialog-settle>
      <!-- 财务确认结算金额 -->
      <el-dialog :title="dialogAmount2.title" :before-close="closeDialogAmount2" :visible.sync="dialogAmount2.visible" width="600px">
        <p class="l-txt-error" style="margin: -20px 0 0 0;">请确认以下金额是否有误：</p>
        <p class="l-margin-t-m">
          <b class="l-fs-xl">溢价回购总额：</b>
          <i class="l-fs-x2 l-rmb l-txt-theme">{{info.totalAmount}}</i>
        </p>
        <p class="l-fs-xs l-txt-gray l-margin-t-s">
          <span class="l-w33">实际放款日期：{{info.voucherTime}}</span>
          <span class="l-w33">计息融资金额：<i class="l-rmb">{{info.adjustAmount || info.amount}}</i></span>
          <span class="l-w33">日利率：{{info.rate}}%</span>
        </p>
        <p class="l-fs-xs l-txt-gray l-margin-t-s">
          <span class="l-w33">结算提车日期：{{info.settleDate}}</span>
          <span class="l-w33">产生利息：<i class="l-rmb">{{info.interests || 0}}</i></span>
          <!-- <span class="l-w33">罚息：<i class="l-rmb">{{info.faxi || 0}}</i></span> -->
          <!-- <span>垫资时长：{{loanTime}}天</span> -->
        </p>
        <p class="l-fs-xs l-txt-gray l-margin-t-s">
          <span class="l-w33">票证收齐日期：{{info.ticketDate}}</span>    
          <span class="l-w33">票证滞纳费：<i class="l-rmb">{{info.ticketFee || 0}}</i></span> 
        </p>
        <p v-if="dialogAmount2.info" class="l-fs-xs l-txt-gray l-margin-t-s">
          结算备注信息：{{dialogAmount2.info.remark || '无'}}
          <a class="l-margin-l l-txt-link" v-if="dialogAmount2.info.remarkImage.length > 0" @click="previewImage(0, dialogAmount2.info.remarkImage)">查看附件</a>
        </p>

        <p class="l-margin-t-m">
          <b class="l-fs-xl">其他第三方费用：</b>
          <i class="l-fs-x2 l-rmb l-txt-theme">{{info.otherFee || 0}}</i>
        </p>

        <p class="l-margin-t">
          <el-input v-model="dialogAmount2.reason" type="textarea" placeholder="如果拒绝结算，请说明原因" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </p>
        <span slot="footer">
          <el-button style="width: 112px;" type="danger"  :loading="dialogAmount2.loading" @click="submitDialogAmount2(0)">拒绝</el-button>
          <el-button style="width: 112px;" type="success" :loading="dialogAmount2.loading" @click="submitDialogAmount2(1)">确定</el-button>
        </span>
      </el-dialog>
      <!-- 财务确认收款 -->
      <el-dialog :title="dialogAmount3.title" :before-close="closeDialogAmount3" :visible.sync="dialogAmount3.visible" width="400px">
        <p class="l-txt-gray" style="margin: -15px 0 0 0;">请确认是否收齐以下款项：</p>
        <p class="l-margin-tb">
          <b>溢价回购金额：<i class="l-rmb l-txt-error">{{info.amount || 0}}</i></b><br>
          <b>第三方相关费用：<i class="l-rmb l-txt-error">{{info.otherFee || 0}}</i></b>
        </p>
        <el-form ref="loanForm" label-position="left">
          <el-form-item>
            <div class="l-flex-hc">
              <el-input type="text" v-model.trim="dialogAmount3.code" placeholder="请输入短信授权码"  :maxlength="6">
              </el-input>
              <el-button class="l-margin-l-m" style="width: 120px;" type="primary" plain @click.prevent="sendCode($event)">获取授权码</el-button>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button  white @click="closeDialogAmount3()">取消</el-button>
          <el-button style="width: 112px;" type="primary" :loading="dialogAmount3.loading" @click="submitDialogAmount3()">{{ dialogAmount3.loading ? '确定中...' : '确定'}}</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情 -->
      <dialog-viewer :visible.sync="dialogViewer.visible" :form-type="dialogViewer.type" :form-data="dialogViewer.info" @change="getInfo"></dialog-viewer>
      <!-- 预览图片 -->
      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import * as qiniu from 'qiniu-js'
import ImagePreviewer from '@/components/image-previewer'
import dialogWuliu from './dialog-wuliu'
import dialogCheckcar from './dialog-checkcar'
import dialogLoadcar from './dialog-loadcar'
import dialogInstock from './dialog-instock'
import dialogSettle from './dialog-settle2'
import dialogViewer from './dialog-viewer'
import { mapGetters } from 'vuex'

// 签署合同 签署状态-1：撤消 0：待签署（初始） 5：花生已签署 -5：花生签署失败 10：客户已签署 -10：客户签署失败

// 订单动态 0：验车(后台）  1：装车  2：允许物流提车并放款(汽贸店） 3：途中待入库  4：添加垫资单 5：录入物流信息 6：录入入库信息  7：提出结算申请  8：财务确认金额 9：总经理确认放款 10：财务已放款  11：总经理确认结算金额 12：订单审核  13：总经理签约订单 14：客户已签约，订单正式受理 15：汽贸店订单审核通过  16：汽贸店签署合同，订单签署完成  17：已交保证金（后台）  18：已交保证金（汽贸店）19：录入物流信息（汽贸店）20：验车（汽贸店）21：允许物流提车并放款（后台） 22：验车申请（汽贸店）
export default {
  name: 'order-info',
  components: {
    ImagePreviewer,
    dialogWuliu,
    dialogCheckcar,
    dialogLoadcar,
    dialogInstock,
    dialogSettle,
    dialogViewer,
  },
  data() {
    return {
      stateList: [
        { label: '全部', value: '',  css: ''},
        { label: '待受理', value: 0,  css: 'l-alert-warn', icon: 'el-icon-warning'},
        { label: '待收保证金', value: 2,  css: 'l-alert-warn', icon: 'el-icon-warning'},
        { label: '待物流装车', value: 3, css: 'l-alert-warn', icon: 'el-icon-warning'},
        { label: '途中待入库', value: 4, css: 'l-alert-warn' },
        { label: '车辆已入库', value: 5, css: 'l-alert-warn' },
        { label: '结算申请', value: 6, css: 'l-alert-warn' },
        { label: '待出票证', value: 7, css: 'l-alert-warn' },
        { label: '已逾期', value: 8, css: 'l-alert-error', },
        { label: '已完成', value: 9, css: 'l-alert-ok', icon: 'el-icon-success' },
        { label: '不受理', value: -2, css: 'l-alert-gray' },
        { label: '不同意放车', value: -9, css: 'l-alert-gray' },
        { label: '订单异常', value: -10, css: 'l-alert-error' },
        { label: '已关闭', value: -11, css: 'l-alert-gray' },
      ],
      statusList: {
        // state = 0 待受理
        '-1': { label: '总经理已拒绝' },                  // 总经理拒绝（订单信息不对或合同内容有误）
        '0': { label: '订单审核中' },                     // 风控申请订单中（准备签署合同，调整金额及利率等）
        '1': { label: '待签署合同' },                     // 等待徐总发起合同，袁婷签署
        // state = 3 待物流装车
        '2': { label: '待录入物流信息' },           
        '4': { label: '待录入验车信息' },           
        '6': { label: '待汽贸店允许提车' },                // 待汽贸店允许提车并同意放款给4S店            
        '8': { label: '待总经理同意放款 ' },               // 待徐总确认放款
        '10': { label: '待财务放款给4S店' },               // 徐总确认授权，待财务放款给4S店
        '12': { label: '待录入装车信息' },
        // state = 4 途中待入库
        '14': { label: '待录入入库信息' },
        // state = 6 汽贸店已申请结算
        '16': { label: '待汽贸店申请结算' },              // 车辆已入库，待汽贸店结算申请
        '18': { label: '待审核结算申请' },                // 已申请结算，等待业务员确认金额（利息，滞纳金及额外费用等）
        '20': { label: '待财务确认结算' },                // 待财务确认结算金额
        '22': { label: '待汽贸店付款提车' },              // 待汽贸店付款提车
        '24': { label: '待财务确认收款' },                // 汽贸店已付款，待财务确认收到车款
        '26': { label: '待总经理确认放车'},               // 财务已确认收到款，待徐总确认放车
      },
      pay4sState: { // 宝付放款状态
        '0': '放款成功，银行处理中',
        '-1': '转账失败，资金将原路退回',
        '1': '转账成功',
        '2': '转账失败，资金已原路退回'
      },
      // 图片预览
      images: [],
      // 签署合同
      contractList: {
        B3: {
          loading: false,
          type: 0,
          state: 0,
          title: '',
          contractUrl: '',
        },
        B4: {
          loading: false,
          type: 0,
          state: 0,
          title: '',
          contractUrl: '',
        },
      },
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
      // 调整融资金额及利率
      dialogAmount: {
        title: '调整融资金额及利率',
        loading: false,
        visible: false,
        data: {
          orderId: '',
          amount: '',
          rate: ''
        }
      },
      wuliuVisible: false,    // 录入物流信息
      checkcarVisible: false, // 录入验车信息
      loadcarVisible: false,  // 录入装车信息
      instockVisible: false,  // 录入入库信息
      settleVisible: false,   // 业务员结算金额
      dialogViewer: {
        visible: false,
        type: '',
        info: {}
      },
      // 财务确认结算金额
      dialogAmount2: {
        title: '确认结算金额',
        visible: false,
        loading: false,
        info: null,
        state: 0,
        reason: ''
      },
      // 财务付车款
      dialog4sAmount: {
        title: '代付车款',
        visible: false,
        loading: false,
        amount: 0,
        code: '',
      },
      // 财务确认收款
      dialogAmount3: {
        title: '确认收款',
        visible: false,
        loading: false,
        code: '',
      },
      // 订单信息
      info: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    pay4sAmount() {
      return Number(this.info.adjustAmount || this.info.amount) + Number(this.info.adjustBond || this.info.bond)
    },
    loanTime() { // 垫资时长
      // 结算提车日期 - 实际放款日期
      let endTime = this.$utils.str2date(this.info.settleDate).getTime()
      let startTime = this.$utils.str2date(this.info.voucherTime).getTime()
      return Math.ceil((endTime - startTime) / (3600 * 24 * 1000)) + 1
    },
  },
  methods: {
    sendCode(event) {
      this.$api.sendMobiCode(this.userInfo.phone, event.target).then(() => {
        this.$message.success('短信授权码已发送到手机，请留意查收。')
      })
    },
    uploadClick(index = 'B3', type = 1) {
      this.contractType = index

      if(type === 0) { // 默认合同
        this.contractList[index].type = type
        this.contractList[index].contractUrl = this.info.contractList[index].Template
      }
    },
    uploadChange(file) { // 上传合同
      let that = this
      that.contractList[that.contractType].type = 1

      that.$utils.fileToBlob(file.raw).then(blobData => {
        that.contractList[that.contractType].loading = true
        that.$api.getQiniuToken().then(data => {
          if(data.token) {
            qiniu.upload(blobData, Date.now() + '_' + file.name, data.token).subscribe({
              next(/* { total } */){
                // Math.ceil(total.percent)
              },
              error({ message }){
                that.$message.error(message)
              }, 
              complete(res){
                that.contractList[that.contractType].loading = false
                that.contractList[that.contractType].contractUrl = that.$api.qiniuURL + res.key
              }
            })
          }else{
            that.$message.error('合同上传失败')
            that.contractList[that.contractType].loading = false
          }
        }).catch(() => {
          that.contractList[that.contractType].loading = false
        })
      }).catch(({ message }) => {
        that.$message.error(message)
      })
    },
    getState(state) {
      return this.stateList.filter(item => item.value === state)[0] || {}
    },
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getInfo() {
      this.$nprogress.start()
      this.$api.order.getInfo(this.$route.query.id).then(({data}) => {
        data.voucher = data.voucher ? data.voucher.split(',') : []
        data.bankCard = data.bankCard ? data.bankCard.split(',') : []
        data.contractUrl = data.contractUrl ? data.contractUrl.split(',') : []
        // 默认合同模板/或预览
        if(this.contractList.B3.type === 0) {
          this.contractList.B3.contractUrl = data.contractList.B3.Template
          this.contractList.B3.title = data.contractList.B3.Title
        }
        if(this.contractList.B4.type === 0) {
          this.contractList.B4.contractUrl = data.contractList.B4.Template
          this.contractList.B4.title = data.contractList.B4.Title
        }

        this.info = data
      }).finally(() => {
        this.$nprogress.done()
      })
    },
    // 调整计息金融金额及利率
    showDialogAmount() {
      this.dialogAmount.data.amount = this.info.adjustAmount
      this.dialogAmount.data.rate = this.info.rate
      this.dialogAmount.visible = true
    },
    closeDialogAmount(done) {
      if(done) {
				done()
			}else{
				this.dialogAmount.visible = false	
      }
    },
    submitDialogAmount() {
      if(!this.dialogAmount.data.amount) {
        return this.$message.error('请输入计息融资额度')
      }

      if(!this.dialogAmount.data.rate) {
        return this.$message.error('请输入日利率')
      }

      this.dialogAmount.data.orderId = this.info.id
      this.dialogAmount.loading = true
      this.$api.order.changeAmount(this.dialogAmount.data).then(() => {
        this.$message.success('调整计息融资金额及利率成功')
        this.closeDialogAmount()
        this.getInfo()
      }).finally(() => {
        this.dialogAmount.loading = false
      })
    },
    // 订单审核
    submitConfirm() {
      this.$confirm('请确认计息融资金额及利率无误，签署合同内容正确<br/>确认通过会向总经理发起签署合同请求，是否继续？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认通过',
        cancelButtonText: '取消'
      }).then(() => {
        this.submit(2)
      })
    },
    submit(type = 2) {
      let formData = Object.assign({}, this.formData)
      if(type === 2) { // 通过审核
        if(!this.info.rate) {
          return this.$message.error('请设置日利率')
        }
        formData.contractList = JSON.stringify(this.contractList)
      }else if(type === 1){ // 拒绝通过
        if(!formData.reason) {
          return this.$message.error('请输入拒绝原因')
        }
        this.formData.visible = false
      }

      formData.orderId = this.info.id
      formData.state = type
      let loading = this.$loading()
      this.$api.order.verify(formData).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功',
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
      this.$api.order.close({
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
    // 财务放款
    closeDialog4sAmount(done) {
       if(done) {
				done()
			}else{
				this.dialog4sAmount.visible = false	
      }
    },
    submitDialog4sAmount() {
      if(!this.dialog4sAmount.code) {
        return this.$message.error('请输入短信授权码')
      }

      this.dialog4sAmount.loading = true
      this.$api.order.pay4sAmount({
        orderId: this.info.id,
        amount: this.pay4sAmount,
        code: this.dialog4sAmount.code
      }).then(() => {
        this.closeDialog4sAmount()
        this.$alert('放款成功，等待银行处理。付款状态实际已银行入账为准，如最终入账失败，资金将原路退回！', '放款说明', {
          confirmButtonText: '知道了',
          callback: () => {
            this.getInfo()
          }
        })

      }).finally(() => {
        this.dialog4sAmount.loading = false
      })
    },
    // 财务确认结算金额
    showDialogAmount2() {
      let settleId = (this.info.records.filter(item => item.type === 8)[0] || {}).id
      if(settleId) {
        let loading = this.$loading()
        this.$api.order.getRecordInfo(settleId).then(({ data }) => {
          this.dialogAmount2.info = data
          this.dialogAmount2.visible = true
        }).finally(() => {
          loading.close()
        })
      }else{
        this.dialogAmount2.visible = true
      }
    },
    closeDialogAmount2(done) {
       if(done) {
				done()
			}else{
				this.dialogAmount2.visible = false	
      }
    },
    submitDialogAmount2(state = 1) {
      if(state === 0 && !this.dialogAmount2.reason) {
        return this.$message.error('请输入拒绝原因')
      }
      this.dialogAmount2.loading = true
      this.$api.order.verifyAmount2({
        state,
        orderId: this.info.id,
        reason: this.dialogAmount2.reason
      }).then(() => {
        this.closeDialogAmount2()
        this.$message.success(state === 0 ? '拒绝成功，打回给业务员重新结算' : '确认金额成功，等待汽贸店付款提车')
        this.getInfo()
      }).finally(() => {
        this.dialogAmount2.loading = false
      })
    },
    // 财务确认收款
    closeDialogAmount3(done) {
       if(done) {
				done()
			}else{
				this.dialogAmount3.visible = false	
      }
    },
    submitDialogAmount3() {
      if(!this.dialogAmount3.code) {
        return this.$message.error('请输入短信授权码')
      }
      this.dialogAmount3.loading = true
      this.$api.order.verifyAmount3({
        orderId: this.info.id,
        amount: this.info.amount,
        otherFee: this.info.otherFee,
        code: this.dialogAmount3.code
      }).then(() => {
        this.closeDialogAmount3()
        this.$message.success('确认收款成功，等待总经理确认放车')
        this.getInfo()
      }).finally(() => {
        this.dialogAmount3.loading = false
      })
    },
    showViewer(item = {}) {
      this.$nprogress.start()
      this.$api.order.getRecordInfo(item.id).then(({ data }) => {
        this.dialogViewer.type = item.type
        this.dialogViewer.info = data
        this.dialogViewer.visible = true
      }).finally(() => {
        this.$nprogress.done()
      })
    },
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
.l-order-info1{
  font-size: 13px; margin: 8px 20px 0;
}
.l-carsInfo{
  border: 3px solid #f3f1f2; padding: 15px; width: 771px; margin-right: 15px; min-height: 200px; box-sizing: border-box;
  ._tag{
    background-color: #5c7fc1; color: #fff; padding: 2px 5px; margin-right: 15px;
  }
  ._tag2{display: inline-block; margin-top: 5px; border: 1px solid #e9e9e9; padding: 5px 10px; color: #a1a6ba; background-color: #fdfcfa; white-space: nowrap;}
  ._item{display: inline-block; min-width: 200px; margin-right: 10px; color: #a1a6ba; }
}
.l-order-news{ background-color: #f9f7f8; width: 380px; height: 200px; overflow: auto; box-sizing: border-box; padding: 15px;}
</style>