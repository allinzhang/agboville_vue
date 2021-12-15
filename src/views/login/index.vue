<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-15 22:58:11
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/login/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
<!-- (window:resize)="onResizeHandler($event)" -->
  <div>
    <div class="container-login">
      <img
        class="bg-login"
        src="https://picsum.photos/id/96/2048/1365"
        alt=""
        :style="{ height: pageHeight + 'px', width: pageWidth + 'px' }"
      >
      <div class="content-login">
        <div>
          <h1 class="slogan-app">长计划 短安排</h1>
          <!-- <p class='slogan-desc_app'>时间是无声的脚步,不会由于我们有很多事情需要处理而稍停片刻</p> -->
          <p class="slogan-desc_app">管理就是预测和计划、组织、指挥、协调以及控制</p>
        </div>
        <div class="wrapper-login">
          <div class="bg-wrapper">
            <div class="container-form">
              <div class="container-main_login">
                <!-- <p> -->
                  <!-- </p> -->
                <form class="form-main_login">
                  <div class="tab-form_main">
                    <div
                      class="item-tab_form"
                      :class="{ selected: loginMethod == 0 }"
                      @click.stop="changeLoginMethod(0)"
                    >
                      账号登录
                    </div>
                    <div
                      class="item-tab_form"
                      :class="{ selected: loginMethod == 1 }"
                      @click.stop="changeLoginMethod(1)"
                    >
                      验证码登录
                    </div>
                  </div>
                  <div class="line-form_main"></div>
                  <div v-if="loginMethod == 0">
                    <div>
                      <input
                        v-model="username"
                        class="input-main_login input-account_form"
                        name="username"
                        type="text"
                        placeholder="用户名"
                        autocomplete="off"
                      />
                    </div>
                    <div>
                      <input
                        v-model="password"
                        class="input-main_login"
                        type="password"
                        name="pwd"
                        placeholder="密码"
                        autocomplete="off"
                      />
                    </div>
                    <el-row class="row-forgot_main">
                      <el-col :span="12"></el-col>
                      <el-col :span="12">
                        <a class="btn-forget_main">忘记密码?</a>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="loginMethod == 1">
                    <div>
                      <input
                        v-model="mobileParams.mobile"
                        class="input-main_login input-account_form"
                        name="mobile"
                        type="text"
                        placeholder="手机号码"
                        maxlength="11"
                        autocomplete="off"
                      />
                    </div>
                    <div class="row-input_login">
                      <input
                        class="input-code_login"
                        type="text"
                        name="code"
                        v-model="mobileParams.code"
                        placeholder="验证码"
                        maxlength="6"
                        autocomplete="off"
                      />
                      <el-button
                        class="btn-code_mobile"
                        type="primary"
                        @click.stop="getCodeVali()"
                      >
                        <span v-if="isGetCode">{{ codeSecond }}s</span>
                        <span v-if="!isGetCode">发送验证码</span>
                      </el-button>
                    </div>
                  </div>
                  <el-button
                    class="button-login_main"
                    type="primary"
                    @click.stop="toLoginVali()"
                  >
                    登录
                  </el-button>
                </form>
                <div class="btn-register_main" >
                  <span v-if="loginMethod == 0">注册账号</span>
                  <span v-if="loginMethod == 1">未注册手机号码自动注册</span>
                </div>
              </div>
              <div class="form-qrcode_login">
                <p class="logo-from_qrcode">扫码登录</p>
                <div class="content-form_qrcode">
                  <div class="qrcode-login">
                    <img class="img-qrcode_login" src="" alt="" />
                  </div>
                </div>
                <div class="tips-form_qrcode">打开微信</div>
                <div class="tips-form_qrcode">扫描二维码登录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, computed } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
// import { Component, Vue } from "vue-property-decorator";
// import Vue from 'vue'
// import Component from 'vue-class-component'
// import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

import { AuthService, MobileLoginParams } from "../../api/AuthService";

import { UserState } from "../../store/modules/user";
// import { HttpResponse } from "@/types/http";
// @Component({
//   components: {},
//   mixins: []
// })



export default defineComponent({
  // data() {
  //   return {
  //     pageWidth: 0,
  //     pageHeight: 0,
  //     loginMethod: 1,
  //     username: "",
  //     password: "",
  //     mobile: "",
  //     code: "",
  //   };
  // };

  setup() {
    const router = useRouter();
    const store = useStore<UserState>();
    const pageWidth = ref(0);
    const pageHeight = ref(0);
    const loginMethod = ref(1);
    const isGetCode = ref(false);
    const accountParams = reactive({
      username: "",
      password: ""
    })
    const mobileParams: MobileLoginParams = reactive({
      mobile: "",
      code: ""
    })
    const toLoginVali = async () => {
      const res: HttpResponse = await AuthService.loginByMobile(mobileParams);
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        const { token, userInfo } = res.data.data;
        localStorage.setItem("SET_TOKEN", token);
        store.dispatch("SET_TOKEN", token);
        store.dispatch("SET_USER_ID", userInfo.id);
        store.dispatch("SET_USER_INFO", userInfo);
        router.replace("/");
      } else {
        ElMessage.error(res.data.msg)
      }
    };
    const changeLoginMethod = (method: number) => {
      console.log('method', method)
      loginMethod.value = method;
    }
    return {
      isGetCode,
      pageWidth,
      pageHeight,
      loginMethod,
      accountParams,
      mobileParams,
      toLoginVali,
      changeLoginMethod,
    };
  },
  mounted() {
    this.bindResize();
  },
  methods: {
    bindResize(): void {
      this.getImageScale(window.innerWidth, window.innerHeight);
      window.onresize = (e: UIEvent) => {
        const w = e.target as Window;
        this.getImageScale(w.innerWidth, w.innerHeight);
      };
    },
    getImageScale(width: number, height: number): void {
      // 2048 1365
      if (width > 2048) {
        height = (height * 2048) / width;
        width = 2048; 
      }
      if (height > 1365) {
        width = (width * 1365) / height;
        height = 1365;
      }
      this.pageWidth = width;
      this.pageHeight = height;
    }
  }
})
</script>
<style lang="scss" scoped>
.container-login{
  min-height: 700px;
  min-width: 1366px;
  overflow: hidden;
  width: 1366px;
  height: 900px;
}
.bg-login{
  position: absolute;
  top: 0;
}
.content-login{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.slogan-app{
  text-align: center;
  color: #fff;
  font-size: 80px;
  line-height: 80px;
  font-weight: bold;
  /* margin-bottom: 0.5em; */
  user-select: none;
  letter-spacing: 10px;
}
.slogan-desc_app{
  color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  margin-bottom: 60px;
  margin-top: 20px;
}
.wrapper-login{
  border: 1px solid hsla(0,0%,100%,.3);
  border-radius: 15px;
  margin: 0 auto;
  width: 600px;
}
.bg-wrapper{
  position: relative;
  background: #fff;
  border-radius: 15px;
  margin: 0 auto;
  width: 600px;
}
.bg-wrapper:after{
  background: #e9ecf3;
  content: " ";
  height: 220px;
  position: absolute;
  right: 227px;
  top: 76px;
  width: 1px;
}
.container-form{
  background: #fff;
  border-radius: 15px;
  display: -ms-flexbox;
  display: flex;
  font-family: PingFangSC-Regular!important;
  height: 358px;
  margin: 0 auto;
  overflow: hidden;
  width: 600px;
}
.container-main_login{
  position: relative;
  flex: 1;
  display: block;
  opacity: 1;
  visibility: visible;
  border-top: 1px solid transparent;
  min-height: 312px;
}
.form-qrcode_login{
  border-top: 1px solid transparent;
  min-height: 312px;
  flex-shrink: 0;
  width: 227px;
}
.form-main_login{
  width: 300px;
  margin: 0 36px;
  padding: 0;
}
.tab-form_main{
  font-size: 14px;
  height: 18px;
  line-height: 14px;
  margin-bottom: 0;
  margin-top: 36px;
  background: none;
  margin-left: 0;
  padding-left: 0;
  text-align: center;
  margin-bottom: 20px;
}
.item-tab_form{
  position: relative;
  color: #666;
  font-family: PingFangSC-Regular;
  cursor: pointer;
  float: left;
  height: 13px;
  margin-right: 24px;
}
.item-tab_form.selected{
  color: #000;
  font-family: PingFangSC-Medium;
}
.input-main_login{
  background-color: #f6f7f8;
  border: 0;
  border-radius: 8px;
  color: #000;
  font-family: PingFangSC-regular;
  font-size: 14px;
  height: 48px;
  line-height: 14px;
  text-indent: 12px;
  width: 300px;
}
.input-account_form{
  margin-bottom: 18px;
}
.row-forgot_main{
  margin-top: 26px;
  padding-top: 0;
  padding-bottom: 0;
}
.btn-forget_main{
  float: right;
  color: #666;
  font-size: 12px;
}
.button-login_main{
  width: 100%;
  margin-top: 16px;
  height: 48px;
  border-radius: 8px;
}
.btn-register_main{
  margin-top: 16px;
  text-align: center;
  font-family: PingFangSC-Regular;
  color: #999;
  font-size: 12px;
}
/*  */
.logo-from_qrcode{
  color: #333;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
  margin: 36px auto 0;
  text-align: center;
}
.content-form_qrcode{
  height: 120px;
  margin-bottom: 26px;
  margin-top: 24px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}
.qrcode-login{
  background-color: #f6f7f8;
  height: 120px;
  width: 120px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
}
.img-qrcode_login{
  width: 100px;
  height: 100px;
}
.tips-form_qrcode{
  color: #666;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular;
}
.tips-form_qrcode{}

.row-input_login{
  display: flex;
  background: #f6f8f9;
  justify-content: space-between;
  padding: 0 6px;
  height: 48px;
  width: 300px;
  border-radius: 8px;

}
.input-code_login{
  float: left;
  width: 168px;
  height: 100%;
  background-color: #f6f8f9;
  color: #000;
  text-indent: 6px;
  border: none;
}
.btn-code_mobile{
  width: 124px;
  background: none;
  color: #3855d5;
  border: none;
}
</style>