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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CommonTable from '../../components/table/CommonTable.vue';
import { ProjectPlayerService } from '../../api/ProjectPlayerService'

export default defineComponent({
  components: {
    CommonTable
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    let projectId = "";
    if (route.query.id) {
      projectId = route.query.id;
    }
    let tableOptions = reactive({
      service: ProjectPlayerService,
      formObj: {},
      formOption: [
        { label: "成员", key: "userId", type: "input"},
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
      tableBtn: [
        // { name: "添加任务", classType: "info", eventName: "showSubMissionDialog" },
      ],
      tableQueryDefault: {
        projectId,  
      } 
    })
    provide("tableOptions", tableOptions);

    return {

    }
  }
})
</script>
