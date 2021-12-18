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
import { computed, defineComponent, ref, provide, reactive } from "vue";
// vuex
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ProjectState } from "../../store/modules/project";

import { ProjectUserService } from "../../api/ProjectUserService";

// import { Mission } from "../../types/mission";

import CommonTable from '../../components/table/CommonTable.vue';

import { MissionService } from "../../api/MissionService";

export default defineComponent({
  components: {
    CommonTable
  },
  setup() {
    const store = useStore<ProjectState>();
    const router = useRouter();
    const route = useRoute();

    const projectId = computed(() => store.state.project.projectId);

    if (!projectId) {
      router.push("/project/list")
      return
    }

    const projectUserList = []

    ProjectUserService.list({projectId: projectId.value}).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        // projectUserList.value = res.data.list;
        res.data.list.forEach(e => {
          console.log('e', e)
          projectUserList[e.id] = projectUserList;
          console.log("projectUserList", projectUserList)
        });
      }
    });
    let tableOptions = reactive({
      service: MissionService,
      formObj: {
        name: "",
        content: "",
        stageId: "",
        status: "",
        assignee: "",
        level: "",
        assignee: "",
        planStartTime: "",
        planEndTime: "",
      },
      formOption: [
        { label: "项目名称", key: "name", type: "input", placeholder: "请输入项目名称", tableWidth: 160},
        { label: "负责人", key: "assignee", type: "select", selectList: {}},
        { label: "优先级", key: "level", type: "select", selectList: [ "紧急", "高", "中", "低" ]},
        { label: "状态", key: "status", type: "select", selectList: ["任务池", "未开始", "进行中", "已结束", "已取消", "延期", "延误"]},
        { label: "计划开始时间", key: "planStartTime", type: "datetime", tableWidth: 200},
        { label: "计划结束时间", key: "planEndTime", type: "datetime", tableWidth: 200},
        { label: "任务介绍", key: "content", type: "textarea" },
      ],
      tableQuery: [
        { type: "input", label: "任务名称", key: "name" }
      ],
      detailPath: "/mission/detail",
      tableQueryDefault: {
        projectId,
      } 
    })
    provide("tableOptions", tableOptions);

    

    return {
      projectId,
      projectUserList,
    };
  },
  methods: {
    
    // clearObjForm(): void {
    //   this.objForm = {
    //     name: "",
    //     content: "",
    //     stageId: "",
    //     status: "",
    //     level: "",
    //     assignee: "",
    //     planStartTime: "",
    //     planEndTime: "",
    //   };
    // },
    // handleSelectUser(): void {
    //   console.log("handleSelectUser");
    // },
  }
})
</script>
