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
import { ProjectMeetingService } from '../../api/ProjectMeetingService'

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
      service: new ProjectMeetingService(),
      formObj: {},
      formOption: [
        { label: "会议名称", key: "name", type: "input"},
        { label: "会议地址", key: "address", type: "input"},
        { label: "负责人", key: "assignee", type: "input"},
        { label: "记录人", key: "recorder", type: "input"},
        { label: "审核人", key: "auditor", type: "input"},
        { label: "会议目标", key: "target", type: "input"},
        { label: "会议记录", key: "record", type: "input"},
        // { label: "会议资源", key: "material", type: "input"},
        // { label: "会议资料", key: "document", type: "input"},
      ],
      tableQuery: [
        { type: "input", label: "会议名称", key: "name" },
        // { type: "input", label: "会议地址", key: "address" },
        { type: "input", label: "负责人", key: "assignee" },
        { type: "input", label: "记录人", key: "recorder" },
        { type: "input", label: "审核人", key: "auditor" },
        // { type: "input", label: "会议目标", key: "target" },
        // { type: "input", label: "会议记录", key: "record" },
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
