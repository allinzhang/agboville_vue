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
import { ProjectWbsService } from '../../api/ProjectWbsService'

export default defineComponent({
  components: {
    CommonTable
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();

    let projectId = "";
    if (route.query.id) {
      projectId = route.query.id as string;
    }
    let tableOptions = reactive({
      service: new ProjectWbsService(),
      formObj: {},
      formOption: [
        { label: "编号", key: "code", type: "input"},
        { label: "需求名称", key: "name", type: "input"},
        { label: "描述", key: "content", type: "input", tableWidth: 240},
        { label: "负责人", key: "assignee", type: "input"},
        { label: "总工时", key: "timeTotal", type: "input"},
        { label: "总人力", key: "userTotal", type: "input"},
        { label: "总费用", key: "priceTotal", type: "input"},
      ],
      tableQuery: [
        { type: "input", label: "需求名称", key: "name" },
      ],
      tableBtn: [
        { name: "添加任务", classType: "info", eventName: "showSubMissionDialog" },
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
