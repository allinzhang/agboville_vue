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
import { ProjectAlterService } from '../../api/ProjectAlterService'

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
      projectId = route.query.id as string;
    }
    let tableOptions = reactive({
      service: new ProjectAlterService(),
      formObj: {},
      formOption: [
        { label: "变更原因", key: "reason", type: "input"},
        { label: "状态", key: "status", type: "select", selectList: ["审核中", "通过", "拒绝"]},
        { label: "审核人", key: "auditor", type: "input"},
      ],
      tableQuery: [
        // { type: "input", label: "需求名称", key: "name" },
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
