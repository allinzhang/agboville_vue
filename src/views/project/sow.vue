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
import { ProjectSowService } from '../../api/ProjectSowService'

export default defineComponent({
  components: {
    CommonTable
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    // const projectId = computed(() => store.state.project.projectId);
    let projectId = "";
    if (route.query.id) {
      projectId = route.query.id as string;
    }
    let tableOptions = reactive({
      service: new ProjectSowService(),
      formObj: {},
      formOption: [
        { label: "需求名称", key: "name", type: "input"},
        { label: "描述", key: "content", type: "input"},
        // { label: "当前阶段", key: "stageName", type: "input", selectList: [], selectType: 1},
        // { label: "负责人", key: "assigneeInfo", type: "image", objKey: "avatar"},
        // { label: "项目成员", key: "userList", type: "images", listKey: "userAvator"},
        // { label: "计划开始时间", key: "planStartDate", type: "datetime", tableWidth: 200},
        // { label: "计划结束时间", key: "planEndDate", type: "datetime", tableWidth: 200},
        // { label: "项目介绍", key: "content", type: "textarea" },
      ],
      tableQuery: [
        { type: "input", label: "需求名称", key: "name" },
        // { type: "datetime", label: "计划开始时间", key: "planStartTime"},
        // { type: "datetime", label: "计划结束时间", key: "planEndTime"},
      ],
      tableBtn: [
        { name: "添加任务", classType: "info", eventName: "showSubMissionDialog" },
        // { name: "详情", classType: "primary", eventName: "toProjectDetailPage" },
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
