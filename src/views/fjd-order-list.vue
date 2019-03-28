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
            <el-input style="width: 280px;" placeholder="订单号/客户名称/手机号码" v-model="list.filter.keywords"></el-input>
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

      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" highlight-current-row :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column label="附加贷单号" prop="orderId" width="200"></el-table-column>
        <el-table-column label="汽贸店名称" prop="shopName" width="140"></el-table-column>
        <el-table-column label="渠道商名称" prop="agentName" width="140"></el-table-column>
        <el-table-column label="客户姓名" prop="userName" width="120" align="center"></el-table-column>
        <el-table-column label="客户身份证" prop="idCard" width="160" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" width="120" align="center"></el-table-column>
        <el-table-column label="申请时间" prop="createTime" width="120" align="center"></el-table-column>
        <el-table-column label="申请金额(元)" prop="amount" fixed="right" width="120" align="center"></el-table-column>
        <el-table-column label="分期期数" prop="period" fixed="right" width="120" align="center"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column label="状态" prop="state" fixed="right" width="120" align="center">
          <template slot-scope="scope">
            <span :class="getState(scope.row.state).css">{{getState(scope.row.state).label}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button class="l-text-link" type="text" size="small" @click="showDialogInfo(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 订单详情 -->
      <el-dialog :title="dialogInfo.title" :before-close="closeDialogInfo" :visible.sync="dialogInfo.visible" width="1000px">
        <div v-if="dialogInfo.info" class="l-order-info">
          <div class="l-zoom">
            <div class="l-minw-33">
              <span>{{dialogInfo.info.shopName}} / <i class="l-fs-xs">{{dialogInfo.info.orderId}}</i></span>
            </div>
            <div class="l-minw-33">
              <span class="l-txt-nowrap l-txt-theme">{{getState(dialogInfo.info.state).label}}</span>
            </div>
          </div>
          <div class="l-zoom l-txt-gray">
            <div class="l-minw-33">
              <p>申请时间：{{dialogInfo.info.createTime | Ymd}}</p>
            </div>
            <div class="l-minw-33">
              <p>渠道商：{{dialogInfo.info.agentName}}</p>
            </div>
          </div>
          <div v-if="[-5, -10, -15, -25, -30, -40, -45, -1].includes(dialogInfo.info.state)" class="l-notice-bar l-margin-t">
            拒绝原因：{{dialogInfo.info.reason}}
          </div>
          <!-- 上牌资料 -->
          <div v-if="dialogInfo.info.carLicense" class="l-panel-item l-margin-t">
            <div class="_hd">
              <b>上牌资料</b>
            </div>
            <div class="_bd l-fs-s">
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>购置税缴纳证明</p>
                  <image-previewer :file-list="dialogInfo.info.carLicense.purchaseTax ? dialogInfo.info.carLicense.purchaseTax.split(',') : []"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>车辆行驶证</p>
                  <image-previewer :file-list="dialogInfo.info.carLicense.drivingLicense ? dialogInfo.info.carLicense.drivingLicense.split(',') : []"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>车辆登记证</p>
                  <image-previewer :file-list="dialogInfo.info.carLicense.registration ? dialogInfo.info.carLicense.registration.split(',') : []"></image-previewer>
                </div>
              </div>
              <div class="l-flex-h l-margin-t">
                <span>其他备注：</span>
                <span class="l-rest">{{dialogInfo.info.carLicense.remark}}</span>
              </div>
            </div>
          </div>
          <!-- 家访资料 -->
          <div v-if="dialogInfo.info.homeVisit" class="l-panel-item l-margin-t">
            <div class="_hd">
              <b>家访资料</b>
            </div>
            <div class="_bd l-fs-s">
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>家访视频</p>
                  <image-previewer :file-list="dialogInfo.info.homeVisit.videoUrl ? dialogInfo.info.homeVisit.videoUrl.split(',') : []" type="video"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>相关资料原件</p>
                  <image-previewer :file-list="dialogInfo.info.homeVisit.images ? dialogInfo.info.homeVisit.images.split(',') : []"></image-previewer>
                </div>
              </div>
              <div class="l-flex-h l-margin-t">
                <span>家访情况说明：</span>
                <span class="l-rest">{{dialogInfo.info.homeVisit.remark}}</span>
              </div>
            </div>
          </div>
          <!-- 申请人基本信息 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><b>申请人基本信息（{{dialogInfo.info.material.type}}）</b></div>
            <div class="_bd">
              <div class="l-zoom">
                <div class="l-minw-33 l-margin-b">
                  <p>客户姓名：{{dialogInfo.info.info.userName}}（{{dialogInfo.info.info.gender}}）</p>
                  <p>手机号码：{{dialogInfo.info.info.phone}}</p>
                  <p>手机号服务密码：{{dialogInfo.info.info.pinCode}}</p>
                </div>
                <div class="l-minw-33 l-margin-b">
                  <p>人行征信账号：{{dialogInfo.info.info.verifyAccount}}</p>
                  <p>人行征信密码：{{dialogInfo.info.info.verifyPwd}}</p>
                  <p>人行征信验证码：{{dialogInfo.info.info.verifyCode}}</p>
                </div>
                <div class="l-minw-33 l-margin-b">
                  <p>微信账号：{{dialogInfo.info.info.wechat}}</p>
                  <p>婚姻状况：{{dialogInfo.info.info.marriageState}}</p>
                  <p>教育程度：{{dialogInfo.info.info.education}}</p>
                </div>
                <div class="l-minw-33">
                  <p>身份证号：{{dialogInfo.info.info.idCard}}</p>
                  <p>有效期至：{{dialogInfo.info.info.expireTime}}</p>
                </div>
                <div class="l-minw-33">
                  <p>户口地址：{{dialogInfo.info.info.familyAddress}}</p>
                  <p>邮政编码：{{dialogInfo.info.info.familyZipCode}}</p>
                </div>
                <div class="l-minw-33">
                  <p>现居地址：{{dialogInfo.info.info.address}}</p>
                  <p>邮政编码：{{dialogInfo.info.info.zipCode}}</p>
                </div>
              </div>
              <div class="l-zoom l-margin-t">
                <div class="l-minw-33">
                  <p>身份证正反面</p>
                  <image-previewer :file-list="[dialogInfo.info.material.idCardOn, dialogInfo.info.material.idCardOff]"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p v-if="dialogInfo.info.info.marriageState === '已婚'">结婚证</p>
                  <p v-else-if="dialogInfo.info.info.marriageState === '离异'">离婚证/判决书</p>
                  <p v-else>户口本首页、户主页及本人页</p>
                  <image-previewer :file-list="dialogInfo.info.material.marriageEvidence ? dialogInfo.info.material.marriageEvidence.split(',') : []"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>收款银行卡正反面</p>
                  <image-previewer :file-list="[dialogInfo.info.material.bankCardOn, dialogInfo.info.material.bankCardOff]"></image-previewer>
                </div>
              </div>
            </div>
          </div>
          <!-- 借款需求 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><b>借款需求</b></div>
            <div class="_bd">
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>申请金额：<i class="l-rmb">{{dialogInfo.info.loan.amount}}</i></p>
                </div>
                <div class="l-minw-33">
                  <p>申请期限：{{dialogInfo.info.loan.period}}期（月息率：{{rate[dialogInfo.info.loan.period]}}%）</p>
                </div>
                <div class="l-minw-33">
                </div>
              </div>
              <div class="l-zoom l-margin-t">
                <div class="l-minw-33">
                  <p>车辆销售单位名称：{{dialogInfo.info.loan.shopName}}</p>
                  <p>购买车型：{{dialogInfo.info.loan.carName}}</p>
                </div>
                <div class="l-minw-33">
                  <p>按揭贷款结构名称：{{dialogInfo.info.loan.bankName}}</p>
                  <p>贷款金额：<i class="l-rmb">{{dialogInfo.info.loan.loanAmount}}</i>（共{{dialogInfo.info.loan.loanPeriod}}期）</p>
                </div>
              </div>
              <div class="l-zoom l-margin-t">
                <div class="l-minw-33">
                  <p>购车合同</p>
                  <image-previewer :file-list="dialogInfo.info.material.purchaseContract ? dialogInfo.info.material.purchaseContract.split(',') : []"></image-previewer>
                </div>
                <div class="l-minw-33">
                  <p>贷款批复方式：批复函</p>
                  <image-previewer :file-list="dialogInfo.info.material.bankApproval ? dialogInfo.info.material.bankApproval.split(',') : []"></image-previewer>
                </div>
              </div>
            </div>
          </div>
          <!-- 家庭房产信息 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><b>家庭房产信息</b></div>
            <div class="_bd">
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>房产类别：{{dialogInfo.info.property.type}}</p>
                </div>
                <div class="l-minw-33">
                  <p>房产地址：{{dialogInfo.info.property.address}}</p>
                </div>
              </div>
              <div class="l-zoom">
                <div class="l-minw-33">
                  <p>房产证及按揭合同、近两个月物业管理费收据</p>
                  <image-previewer :file-list="dialogInfo.info.material.addressEvidence ? dialogInfo.info.material.addressEvidence.split(',') : []"></image-previewer>
                </div>
              </div>
              <div class="l-zoom l-margin-t">
                <div class="l-minw-33">
                  <p>房产购买时间：{{dialogInfo.info.property.purchaseTime}}</p>
                  <p>购买总价：<i class="l-rmb">{{dialogInfo.info.property.price | Int0}}万</i></p>
                  <p>建筑面积：{{dialogInfo.info.property.area | Int0}}平方米</p>
                </div>
                <div class="l-minw-33">
                  <p>按揭银行：{{dialogInfo.info.property.bankName}}</p>
                  <p>按揭年限：{{dialogInfo.info.property.period}}年</p>
                  <p>当前市场价值：<i class="l-rmb">{{dialogInfo.info.property.marketValue | Int0}}</i>万</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 工作信息 -->
          <div class="l-panel-item l-margin-t">
            <div class="_hd"><b>工作信息</b></div>
            <div class="_bd">
              <div class="l-zoom">
                <div class="l-minw-33 l-margin-b">
                  <p>单位名称：{{dialogInfo.info.work.workplace}}</p>
                  <p>单位地址：{{dialogInfo.info.work.address}}</p>
                </div>
                <div class="l-minw-33 l-margin-b">
                  <p>公司规模：{{dialogInfo.info.work.companySize}}</p>
                  <p>单位电话：{{dialogInfo.info.work.telephone}}</p>
                </div>
                <div class="l-minw-33 l-margin-b">
                  <p>单位性质：{{dialogInfo.info.work.type}}</p>
                  <p>邮政编码：{{dialogInfo.info.work.zipCode}}</p>
                </div>
                <div class="l-minw-33">
                  <p>是否持股：{{dialogInfo.info.work.shareholding}}</p>
                  <p>持股比例：{{dialogInfo.info.work.shareholdrate | Int0}}%</p>
                </div>
                <div class="l-minw-33">
                  <p>任职部门：{{dialogInfo.info.work.department}}</p>
                  <p>职务名称：{{dialogInfo.info.work.position}}</p>
                </div>
              </div>
            
              <div class="l-zoom l-margin-t">
                <div class="l-minw-33">
                  <p>发薪方式：{{dialogInfo.info.work.payMode}}</p>
                  <p>基本薪资：<i class="l-rmb">{{dialogInfo.info.work.salary}}</i></p>
                  <p>租金收入：<i class="l-rmb">{{dialogInfo.info.work.rent}}</i></p>
                  <p>经营收入：<i class="l-rmb">{{dialogInfo.info.work.engagedIn}}</i></p>
                  <p>其他收入：{{dialogInfo.info.work.other}}</p>
                </div>
                <div class="l-minw-33">
                  <p>发薪日：{{dialogInfo.info.work.payDate}}</p>
                  <p>是否提供代发工资流水：{{dialogInfo.info.work.hasPayroll}}</p>
                  <image-previewer :file-list="dialogInfo.info.material.payroll ? dialogInfo.info.material.payroll.split(',') : []"></image-previewer>
                </div>
              </div>
            </div>
          </div>
          <!-- 紧急联系人 -->
          <div v-if="dialogInfo.info.contact.length > 0" class="l-panel-item l-margin-t">
            <div class="_hd">
              <b>紧急联系人</b>
            </div>
            <div class="_bd l-zoom">
              <div class="l-contact-item" v-for="(item,index) in dialogInfo.info.contact" :key="index">
                <p>与联系人关系：<b>({{relation[item.type]}}){{item.relatives || item.relationShip}}</b></p>
                <p>姓名：{{item.username}}</p>
                <p>手机号码：{{item.phone}}</p>
                <p v-if="item.company">工作单位：{{item.company}}</p>
                <p v-if="item.address">工作地址：{{item.address}}</p>
                <p v-if="item.department">职位名称：{{item.department}}</p>
                <p v-if="item.income">月均收入：{{item.income | Int0}}</p>
                <p>是否知晓此借款：{{item.isKnown}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dialogInfo.info" slot="footer">
          <el-button size="small" @click="closeDialogInfo()">&emsp;返回&emsp;</el-button>
          <el-button v-if="dialogInfo.info.state !== -1 && dialogInfo.info.state !== 50" class="l-margin-l" size="small" @click="verifyConfirm(-1)">&emsp;关闭订单&emsp;</el-button>
          <!-- 后台总部审核客户资料 -->
          <template v-if="dialogInfo.info.state === 5">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-10)">审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(10)">审核通过</el-button>
          </template>
          <!-- 后台总部审核家访资料 -->
          <template v-if="dialogInfo.info.state === 20">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-25)">审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(25)">审核通过</el-button>
          </template>
          <!-- 后台总部审核上牌资料 -->
          <template v-if="dialogInfo.info.state === 35">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-40)">审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(40)">审核通过</el-button>
          </template>
          <!-- 花生审核客户资料 -->
          <template v-if="dialogInfo.info.state === 10">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-15)">花生审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(15)">花生审核通过</el-button>
          </template>
          <!-- 花生审核家访资料 -->
          <template v-if="dialogInfo.info.state === 25">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-30)">花生审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(30)">花生审核通过</el-button>
          </template>
          <!-- 花生审核上牌资料 -->
          <template v-if="dialogInfo.info.state === 40">
            <el-button class="l-margin-l" size="small" type="danger" @click="verifyConfirm(-45)">花生审核不通过</el-button>
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(45)">花生审核通过</el-button>
          </template>
          <!-- 花生待放款 -->
          <template v-if="dialogInfo.info.state === 45">
            <el-button class="l-margin-l" size="small" type="success" @click="verifyConfirm(50)">通知已放款</el-button>
          </template>
        </div>
      </el-dialog>

      <!-- 拒绝原因 -->
      <el-dialog :title="dialogRemark.title" :visible.sync="dialogRemark.visible" append-to-body :show-close="false" width="500px">
        <div style="margin: -20px 0;">
          <el-input type="textarea" :rows="5" :placeholder="dialogRemark.placeholder" v-model="dialogRemark.data"></el-input>
        </div>
        <span slot="footer">
          <el-button class="l-margin-l" size="small" @click="dialogRemarkClose('cancel')">取消</el-button>
          <el-button class="l-margin-l" size="small" type="primary" @click="dialogRemarkClose('confirm')">{{dialogRemark.confirmText}}</el-button>
        </span>
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
  name: 'fjd-order-list',
  components: { ImagePreviewer, pagination },
  data() {
    return {
      stateList: [
        { label: '全部',  value: '', css: '' },
        { label: '客户资料审核中', desc: '汽贸店提交待渠道商审核客户资料',                   value: 0,   css: 'l-txt-ok' },
        { label: '客户资料不通过', desc: '渠道商审核客户资料不通过，汽贸店重新提交客户资料',   value: -5,  css: 'l-txt-error' },
        { label: '客户资料待审核', desc: '渠道商审核客户资料通过，待总部审核',                value: 5,   css: 'l-txt-ok' },
        { label: '客户资料不通过', desc: '总部审核客户资料不通过，待渠道商重新审核客户资料',   value: -10,  css: 'l-txt-error' },
        { label: '客户资料待审核', desc: '总部审核客户资料通过，待花生审核',                 value: 10,   css: 'l-txt-ok' },
        { label: '客户资料不通过', desc: '花生审核客户资料不通过，待总部审核客户资料',        value: -15, css: 'l-txt-error' },
        { label: '待渠道商家访',   desc: '花生审核客户资料通过，待渠道商家访',                value: 15,  css: 'l-txt-warn' },
        { label: '家访资料待审核', desc: '渠道商提交家访资料-待总部审核',                    value: 20, css: 'l-txt-theme' },
        { label: '家访资料不通过', desc: '总部审核家访资料不通过，渠道商重新提交家访资料',     value: -25, css: 'l-txt-error' },
        { label: '家访资料审核中', desc: '总部审核家访资料通过，待花生审核',                  value: 25, css: 'l-txt-theme' },
        { label: '家访资料不通过', desc: '花生审核家访资料不通过，总部重新审核家访资料',       value: -30, css: 'l-txt-error' },
        { label: '待汽贸店上牌',   desc: '花生审核家访资料通过，待汽贸店上牌',                 value: 30, css: 'l-txt-warn' },
        { label: '上牌资料审核中', desc: '汽贸店提交上牌资料-待总部审核',                     value: 35,  css: 'l-txt-ok' },
        { label: '上牌资料不通过', desc: '总部审核上牌资料不通过，汽贸店重新提交上牌资料',     value: -40,  css: 'l-txt-error' },
        { label: '上牌资料审核中', desc: '总部审核上牌资料通过，待花生审核',                  value: 40,  css: 'l-txt-ok' },
        { label: '上牌资料不通过', desc: '花生审核上牌资料不通过，总部重新审核上牌',           value: -45, css: 'l-txt-error' },
        { label: '待放款',        desc: '花生审核上牌资料通过，待放款',                      value: 45, css: 'l-txt-ok' },
        { label: '已放款',        desc: '已放款',                                          value: 50, css: '' },
        { label: '已关闭',        desc: '已关闭',                                          value: -1, css: 'l-txt-gray' },
      ],
      tabList: [
        { label: '全部', value: '' },
        { label: '待审核客户资料', value: '5, -15' },
        { label: '待花生审核客户', value: '10' },
        { label: '待审核家访', value: '15, 20, -25' },
        { label: '待花生审核家访', value: '25' },
        { label: '待审核上牌', value: '30, 35, -40' },
        { label: '待花生审核上牌', value: '40' },
        { label: '待放款', value: '45' },
        { label: '已放款', value: '50' },
      ],
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
      dialogRemark: {
        type: '',
        action: 'confirm',
        visible: false,
        title: '',
        confirmText: '确定',
        placeholder: '请输入',
        data: ''
      },
      relation: ['配偶', '直系亲属', '同事', '其他'],
      rate: {
        '12': 0.95,
        '24': 0.92,
        '36': 0.88,
      },
      dialogInfo: { // 详情
				title: '附加贷订单详情',
				visible: false,
				loading: false,
				info: null
			},
    }
  },
  methods: {
    getState(state) {
      return this.stateList.filter(item => item.value === state)[0] || {}
    },
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
    search() {
			this.getList(1)
    },
    clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList(1)
    },
    getList(page = this.list.pager.page, rows = this.list.pager.rows) {
			this.list.loading = true
			this.$api.order.getList(this.list.filter, page, rows)
			.then(({data}) => {
        this.$utils.copyObj(this.list.pager, data, { page, rows })
        this.list.data = data.list
			}).finally(() => {
				this.list.loading = false
			})
    },
    showDialogInfo(row) { // 详情
      const loading = this.$loading()
      this.$api.order.getInfo(row.id).then(({data}) => {
        this.dialogInfo.info = data
        this.dialogInfo.visible = true
			}).finally(() => {
				loading.close()
			})
    },
    closeDialogInfo(done) {
			if(done) {
				done()
			}else{
				this.dialogInfo.visible = false	
			}
    },
    dialogRemarkClose(action = 'confirm'){
      if(action === 'confirm') {
        switch(this.dialogRemark.type) {
          case 'close_order':     // 关闭订单
            this.$api.order.close({
              orderId: this.dialogInfo.info.id,
              reason: this.dialogRemark.data
            }).then(() => {
              this.dialogRemark.visible = false
              this.dialogRemark.data = ''
              this.$message.success('该订单已关闭')
              this.getList()
              this.showDialogInfo({id: this.dialogInfo.info.id})
            })
            break
          case 'refuse_customer_info':  // 拒绝审核客户资料
          case 'refuse_visit_info':     // 拒绝审核家访资料
          case 'refuse_license_info':   // 拒绝审核上牌资料
            this.verifySubmit(this.dialogRemark.state, this.dialogRemark.data).then(() => {
              this.dialogRemark.visible = false
              this.dialogRemark.data = ''
              this.getList()
              this.showDialogInfo({id: this.dialogInfo.info.id})
            })
            break
        }
      }else{
        this.dialogRemark.visible = false
      }
    },    
    verifyConfirm(state) { // 审核客户资料
      switch(state) {
        case 5:
          this.$confirm('是否确定客户资料无误，通过审核？', {
            title: '客户资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 10:
          this.$confirm('确定客户资料无误后，客户资料将会通过邮件发送给花生金融，是否继续？', {
            title: '客户资料审核通过',
            cancelButtonText: '我再看看',
            confirmButtonText: '确定并发送邮件'
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 15:
          this.$confirm('客户资料已通过花生金融审核，请通知渠道商进行家访。', {
            title: '客户资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 25:
          this.$confirm('确定家访资料无误后，家访资料将会通过邮件发送给花生金融，是否继续？', {
            title: '家访资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 30:
          this.$confirm('家访资料已通过花生金融审核，请通知渠道商、汽贸店上牌。', {
            title: '家访资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 40:
          this.$confirm('确定上牌资料无误后，上牌资料将会通过邮件发送给花生金融，是否继续？', {
            title: '上牌资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 45:
          this.$confirm('上牌资料已通过花生金融审核，等待花生金融放款。', {
            title: '上牌资料审核通过',
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case 50:
          this.$confirm('已收到花生金融放款通知，短信通知渠道商和汽贸店已放款。', {
            title: '已放款',
            confirmButtonText: '通知已放款'
          }).then(() => {
            this.verifySubmit(state)
          })
          break
        case -1:
          this.dialogRemark.type = 'close_order'
          this.dialogRemark.title = '关闭订单'
          this.dialogRemark.placeholder = '请输入关闭理由（关闭订单将终止订单流程，不可撤回）'
          this.dialogRemark.visible = true
          break
        case -5:
        case -10:
        case -15:
          this.dialogRemark.type = 'refuse_customer_info'
          this.dialogRemark.title = '客户资料审核不通过'
          this.dialogRemark.placeholder = '请说明不通过原因（订单将会打回给汽贸店重新编辑信息，完善后再重新提交申请，说明原因便于汽贸店修正完善资料）'
          this.dialogRemark.state = state
          this.dialogRemark.visible = true
          break
        case -25:
        case -30:
          this.dialogRemark.type = 'refuse_visit_info'
          this.dialogRemark.title = '家访资料审核不通过'
          this.dialogRemark.placeholder = '请说明不通过原因（订单将会打回给渠道商重新家访，说明原因便于渠道商修正完善资料）'
          this.dialogRemark.state = state
          this.dialogRemark.visible = true
          break
        case -40:
        case -45:
          this.dialogRemark.type = 'refuse_license_info'
          this.dialogRemark.title = '上牌资料审核不通过'
          this.dialogRemark.placeholder = '请说明不通过原因（订单将会打回给汽贸店重新提交上牌资料，说明原因便于汽贸店修正完善资料）'
          this.dialogRemark.state = state
          this.dialogRemark.visible = true
          break
      }
    },
    verifySubmit(state, reason = '') {
      if(state == undefined) return Promise.reject('订单状态错误')

      let promise = this.$api.order.verify({
        orderId: this.dialogInfo.info.id,
        state, reason
      })
      
      const loading = this.$loading()
      promise.then(() => {
        this.dialogRemark.data = ''
        this.$message.success('审核操作成功')
        this.getList()
        this.showDialogInfo({id: this.dialogInfo.info.id})
      }).finally(() => {
        loading.close()
      })

      return promise
    },
  },
  mounted() {
    this.tabClick(Number(this.$route.query.tab) || 0, this.list.pager.page)
  }
}
</script>
<style lang="less" scoped>
.l-order-info{margin: -20px 0 -10px; max-height: 500px; overflow: auto;}
.l-contact-item{
  width: 40%; display: inline-block; margin-bottom: 10px; vertical-align: top;
}
</style>
