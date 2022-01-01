<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-03 17:09:51
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_user_vue/src/views/dashboard/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-container">
    <CommonTable
      @showInviteDialog="showInviteDialog"
    />
    <el-dialog
      v-model="isShowInviteDialog"
      title="邀请项目成员"
      width="50%"
      :before-close="handleClose"
    >
      <div style="margin-bottom: 20px;">管理员可以邀请和移除项目成员，只有被邀请的团队成员才能访问该项目的信息。</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="链接邀请" name="first">
          <el-button type="primary" @click.stop="copyInviteLink">复制链接</el-button>
        </el-tab-pane>
        <el-tab-pane label="邮件邀请" name="second">
          <template v-for="(item, index) in mailForm" :key="index">
            <el-row style="margin-top:5px;">
              <el-col :span="12">
                <el-input v-model="item.value" placeholder="请输入新成员的邮箱" />
              </el-col>
              <el-button type="danger" style="margin-left: 10px;" @click.stop="deleteMailForm(item, index)">删除</el-button>
            </el-row>
          </template>
          <el-button style="margin-top: 10px;" @click.stop="addMailForm">再加一个</el-button>
          <el-button type="primary" style="margin-top: 10px;">发送邮件</el-button>
        </el-tab-pane>
        <el-tab-pane label="微信邀请" name="third">
          <div class='row-invite_wechat'>
            <img class="qrcode-invite" />
            <div>
              <h3>扫码邀请</h3>
              <div class="str-invite_qrcode">用微信扫描二维码</div>
              <div class="str-invite_qrcode">转发给微信好友，即可邀请他们加入你的项目。</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hideInviteDialog">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import {
  Delete,
} from '@element-plus/icons-vue'

import CommonTable from '../../components/table/CommonTable.vue';
import { ProjectPlayerService } from '../../api/ProjectPlayerService'

export default defineComponent({
  components: {
    CommonTable,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const isShowInviteDialog = ref(false);
    let projectId = "";
    if (route.query.id) {
      projectId = route.query.id as string;
    }
    const mailForm = reactive([
      { value: "" }
    ]);
    let tableOptions = reactive({
      service: new ProjectPlayerService(),
      formObj: {},
      formOption: [
        { label: "成员", key: "userRealname", type: "input"},
        { label: "头像", key: "userAvatar", type: "image"},
        { label: "手机号码", key: "userMobile", type: "input"},
        { label: "角色", key: "rule", type: "input"},
        { label: "部门", key: "department", type: "input"},
        { label: "职责", key: "duty", type: "input"},
        { label: "状态", key: "status", type: "select", selectList: ["审核中", "通过", "拒绝"]},
        { label: "来源", key: "source", type: "select", selectList: ["未知", "链接", "微信"]},
        { label: "邀请人", key: "inviter", type: "input"},
      ],
      tableQuery: [
        { type: "input", label: "会议名称", key: "name" },
      ],
      queryBtn: [
        { name: "邀请成员", classType: "warning", icon: "Share", eventName: "showInviteDialog" },
      ],
      tableBtn: [
        
      ],
      tableQueryDefault: {
        projectId,  
      } 
    })
    provide("tableOptions", tableOptions);
    const showInviteDialog = () => {
      isShowInviteDialog.value = true;
    }
    const hideInviteDialog = () => {
      isShowInviteDialog.value = false;
    }
    const addMailForm = () => {
      mailForm.push({ value: "" })
    }
    const deleteMailForm = (item, index) => {
      if (mailForm.length > 1) {
        mailForm.splice(index, 1);
      }
    }
    const copyInviteLink = () => {
      let url = `${window.location.protocol}//${window.location.host}/project/invite?projectId=${projectId}`
      console.log(url)
      this.$copyText(url)
    }
    return {
      isShowInviteDialog,
      mailForm,
      showInviteDialog,
      hideInviteDialog,
      addMailForm,
      deleteMailForm,
      copyInviteLink,
    }
  }
})
</script>

<style lang="scss" scoped>
.row-invite_wechat{
  display: flex;
  align-items: flex-end;
}
.qrcode-invite{
  height: 200px;
  width: 200px;
  margin-right: 20px;
}
.str-invite_qrcode{
  margin-top: 5px;
}
</style>
