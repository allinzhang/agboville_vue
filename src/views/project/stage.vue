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
import { defineComponent, reactive, provide, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CommonTable from '../../components/table/CommonTable.vue';
import { ProjectStageService } from '../../api/ProjectStageService'

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
      service: new ProjectStageService(),
      formObj: {},
      formOption: [
        { label: "阶段名称", key: "name", type: "input"},
        { label: "描述", key: "content", type: "input"},
        { label: "负责人", key: "assingee", type: "input"},
        { label: "状态", key: "status", type: "select", selectList: ["审核中", "进行中", "已结束", "已延期", "超时"]},
        { label: "排序", key: "sort", type: "input"},
        { label: "输入", key: "enter", type: "input"},
        { label: "输出", key: "exit", type: "input"},
        { label: "开始时间", key: "startTime", type: "datetime"},
        { label: "结束时间", key: "endTime", type: "datetime"},
      ],
      tableQuery: [
        { type: "input", label: "阶段名称", key: "name" },
      ],
      tableBtn: [
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
