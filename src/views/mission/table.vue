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
import { missionLevelArr, missionStatusArr } from '../../types/status';

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



    let tableOptions = reactive({
      service: MissionService,
      formObj: {
        // name: "",
        // content: "",
        // stageId: "",
        // status: "",
        // assignee: "",
        // level: "",
        // assignee: "",
        // planStartTime: "",
        // planEndTime: "",
      },
      formOption: [
        { label: "任务名称", key: "name", type: "input", tableWidth: 160},
        { label: "负责人", key: "assignee", type: "select", selectList: [], selectType: 1},
        { label: "优先级", key: "level", type: "select", selectList: missionLevelArr},
        { label: "状态", key: "status", type: "select", selectList: missionStatusArr},
        { label: "计划开始时间", key: "planStartTime", type: "datetime", tableWidth: 200},
        { label: "计划结束时间", key: "planEndTime", type: "datetime", tableWidth: 200},
        { label: "任务介绍", key: "content", type: "textarea" },
      ],
      tableQuery: [
        { type: "input", label: "任务名称", key: "name" },
        { type: "select", label: "优先级", key: "level", selectList: missionLevelArr },
        { type: "select", label: "状态", key: "status", selectList: missionStatusArr },
        { type: "datetime", label: "计划开始时间", key: "planStartTime"},
        { type: "datetime", label: "计划结束时间", key: "planEndTime"},
      ],
      tableBtn: [],
      detailPath: "/mission/detail",
      tableQueryDefault: {
        projectId,
      } 
    })
    ProjectUserService.list({projectId: projectId.value}).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        res.data.data.list.forEach((e, i) => {
          // projectUserList[e.id] = e;
          projectUserList.push({
            label: e.userId,
            value: e.userId,
          })
          if (i === res.data.data.list.length - 1) {
            tableOptions.formOption[1].selectList = projectUserList
            // console.log("tableOptions", tableOptions)
          }
        });
      }
    });

    provide("tableOptions", tableOptions);

    return {
      // projectId,
      // projectUserList,
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
