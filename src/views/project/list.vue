<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-19 15:44:47
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/project/list.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-container">
    <CommonTable
      @toProjectUserPage="toProjectUserPage"
      @toProjectDetailPage="toProjectDetailPage"
    />
    <!-- <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="项目名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        style="margin-left: 10px"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        type="success"
        style="margin-left: 10px"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        style="margin-left: 10px"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column prop="name" label="项目名" width="180" align="center" >
        <template #default="scope">
          <el-link type="primary" @click.stop="toProjectMissionList(scope.row, scope.index)">{{ scope.row.name || "" }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stageId" label="当前阶段" width="100" align="center">
        <template #default="scope">
          <template
            v-for="(stage, stageIndex) in scope.row.stageList"
            :key="stageIndex"
          >
            <el-tag v-if="stage.id == scope.row.stageId" type="info">
              {{ stage.name || "" }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center" >
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">审核中</el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="success">进行中</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="info">已结束</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="info">延期</el-tag>
          <el-tag v-else-if="scope.row.status == 4" type="danger">超时</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="assigneeInfo" label="负责人" width="80" align="center">
        <template #default="scope">
          <el-popover placement="bottom" :width="200" trigger="click">
            <el-select v-model="scope.row.assignee" placeholder="选择项目负责人" @change="assigneeChange($event, scope.row)">
              <el-option
                v-for="assignItem in scope.row.userList"
                :key="assignItem.id"
                :label="assignItem.userNickname"
                :value="assignItem.userId"
              >
                <span style="float: left">{{ assignItem.userNickname }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                  >{{ assignItem.duty || "" }}</span
                >
              </el-option>
            </el-select>
            <template #reference>
              <el-avatar :size="36" :src="scope.row.assigneeInfo.avatar"></el-avatar>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="userList" label="成员" min-width="80" align="center">
        <template #default="scope">
          <el-avatar
            v-for="(player, playerIndex) in scope.row.userList"
            :key="playerIndex"
            :size="36"
            :src="player.userAvatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="planStartDate" label="计划开始时间" width="120" align="center" />
      <el-table-column prop="planEndDate" label="计划结束时间" width="120" align="center" />
      <el-table-column label="操作" width="320" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="default"
            size="mini"
            @click="handleMember(scope.row, scope.$index)"
            >添加成员</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleDetail(scope.row, scope.$index)"
            >详情</el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleEdit(scope.row, scope.$index)"
            >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row, scope.$index)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogTitleMap[dialogStatus]"
    >
      <el-form ref="objForm" :model="objForm" label-width="120px">
        <el-form-item label="项目名称">
          <el-input
            v-model="objForm.name"
            autocomplete="off"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchUser"
            popper-class="my-autocomplete"
            placeholder="名字或手机号码"
            @select="handleSelectUser"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="handleIconClick">
                <edit />
              </el-icon>
            </template>
            <template #default="{ item }">
              <div class="value">{{ item.value }}</div>
              <span class="link">{{ item.link }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="objForm.planStartDate"
            type="datetime"
            placeholder="选择计划开始时间"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划结束时间">
          <el-date-picker
            v-model="objForm.planEndDate"
            type="datetime"
            placeholder="选择计划结束时间"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目介绍">
          <el-input
            v-model="objForm.content"
            show-word-limit
            type="textarea"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入项目介绍"
            maxlength="255"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="dialogFormConfirm">
            {{ dialogTitleMap[dialogStatus] || "" }}
          </el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import { Options, Vue } from "vue-class-component";
// import { ref } from "vue";

// import { ElMessageBox, ElMessage } from "element-plus";
// // import { Search, CirclePlus, TopRight } from '@element-plus/icons'

// import { HttpResponse } from "../../types/http";

// import { ExcelService } from "../../static/utils/exportToExcel";

// import { ProjectState } from "../../store/modules/project";

import CommonTable from '../../components/table/CommonTable.vue';
import { ProjectService } from "../../api/ProjectService";
import { Project } from "../../types/project";

// @Options({
//   components: {},
// })
// export default class ProjectList extends Vue {
export default defineComponent({
  components: {
    CommonTable
  },
  // data() {
  //   return {
      // Search,
      // CirclePlus,
      // TopRight,
      // list: [], // 表格数据
      // total: 0, // 表格总数
      // listLoading: true, // 是否显示表格加载
      // dialogFormVisible: false, // 是否显示新增修改弹窗
      // downloadLoading: false, // 是否正在导出
      // listQuery: {
      //   page: 1,
      //   limit: 20,
      //   sort: "id",
      //   name: undefined,
      // },
      // dialogTitleMap: {
      //   create: "新增",
      //   update: "修改",
      // }, // 弹窗标题
      // dialogStatus: "create", // 弹窗类型
      // objForm: {
      //   name: "",
      //   content: "",
      //   assignee: "",
      //   planStartDate: "",
      //   planEndDate: "",
      // },
    // };
  // },
  // mounted() {
    // this.getList();
  // },
  setup() {
    const router = useRouter();
    const store = useStore();

    let tableOptions = reactive({
      service: new ProjectService(),
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
        { label: "项目名称", key: "name", type: "input", tableWidth: 160, link: '/project/detail', linkParam: ["id"]},
        { label: "当前阶段", key: "stageName", type: "input", selectList: [], selectType: 1},
        // { label: "状态", key: "status", type: "select", selectList: []},
        { label: "负责人", key: "assigneeInfo", type: "image", objKey: "avatar"},
        { label: "项目成员", key: "userList", type: "images", listKey: "userAvator"},
        // { label: "优先级", key: "level", type: "select", selectList: missionLevelArr},
        { label: "计划开始时间", key: "planStartDate", type: "datetime", tableWidth: 200},
        { label: "计划结束时间", key: "planEndDate", type: "datetime", tableWidth: 200},
        { label: "项目介绍", key: "content", type: "textarea" },
      ],
      tableQuery: [
        { type: "input", label: "任务名称", key: "name" },
        // { type: "select", label: "优先级", key: "level", selectList: missionLevelArr },
        // { type: "select", label: "状态", key: "status", selectList: missionStatusArr },
        { type: "datetime", label: "计划开始时间", key: "planStartTime"},
        { type: "datetime", label: "计划结束时间", key: "planEndTime"},
      ],
      tableBtn: [
        { name: "添加成员", classType: "info", eventName: "toProjectUserPage" },
        { name: "详情", classType: "primary", eventName: "toProjectDetailPage" },
      ],
      // detailPath: "/project/detail",
      // tableQueryDefault: {
        // projectId,  
      // } 
    })
    provide("tableOptions", tableOptions);
    // const links = Ref([]);
    // console.log("links", links);
    // const querySearchUser = (queryString: string, cb: (arg: any) => void) => {
    //   let results = [
    //     { value: "name" },
    //     { value: "list" },
    //   ];
    //   cb(results);
    // };
    // console.log(store)
    // const toProjectMissionList = (row: Project) => {
    //   if (row.id) {
    //     store.dispatch("SET_PROJECT_ID", row.id);
    //     router.push({
    //       path: "/mission/table",
    //       query: {
    //         id: row.id,
    //       },
    //     });
    //   }
    // }
    const toProjectUserPage = (row: Project) => {
      console.log("toProjectUserPage", row)
    }
    const toProjectDetailPage = (row: Project) => {
      console.log("toProjectDetailPage", row)
    }
    return {
      // state: ref(''),
      // querySearchUser,
      // toProjectMissionList,
      toProjectUserPage,
      toProjectDetailPage,
    };
  },
  methods: {
    // async getList() {
    //   this.listLoading = true;
    //   const res: HttpResponse = await ProjectService.list(this.listQuery);
    //   if (res.status === 200 && res.data.code === 0) {
    //     this.list = res.data.data.list;
    //     this.total = res.data.data.total;
    //     setTimeout(() => {
    //       this.listLoading = false;
    //     }, 1000);
    //   }
    // },
    // handleFilter(): void {
    //   this.listQuery.page = 1;
    //   this.getList();
    // },
    // handleCreate(): void {
    //   this.clearObjForm();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["objForm"].clearValidate();
    //   })
    // },
    // handleEdit(row: Project): void {
    //   this.objForm = Object.assign({}, row);
    //   this.dialogStatus = "update";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["objForm"].clearValidate();
    //   })
    // },
    // clearObjForm(): void {
    //   this.objForm = {
    //     name: "",
    //     content: "",
    //     assignee: "",
    //     planStartDate: "",
    //     planEndDate: "",
    //   };
    // },
    // dialogFormConfirm(): void {
    //   console.log("dialogFormConfirm", this.objForm);
    //   this.$refs["objForm"].validate((valid: any) => {
    //     if(valid) {
    //       if (this.dialogStatus === "create") {
    //         this.createProject(this.objForm);
    //       } else if (this.dialogStatus === "update") {
    //         // this.objForm.id = "";
    //         this.editProject(this.objForm);
    //       }
    //     }
    //   })
    // },
    // handleSelectUser(): void {
    //   console.log("handleSelectUser")
    // },
    
    // handleDetail(row: Project): void {
    //   if (row.id) {
    //     this.$router.push("/project/detail", {
    //       id: row.id,
    //     });
    //   }
    // },
    // handleDelete(row: Project, index: number): void {
    //   ElMessageBox.confirm(`确认删除${row.name}项目?`, "确认操作", {
    //     confirmButtonText: "删除",
    //   }).then(() => {
    //     this.deleteObj(row, index);
    //   });
    // },
    // handleDownload(): void {
    //   this.downloadLoading = true;
    //   const excelService = new ExcelService();
    //   excelService.exportAsExcelFile(this.list, "项目列表");
    //   this.downloadLoading = false;
    // },
    // async createProject(project: Project) {
    //   console.log("project", project);
    //   const res: HttpResponse = await ProjectService.create(project);
    //   if (res.status === 200 && res.data.code === 0) {
    //     ElMessage({ type: "success", message: "新增成功" });
    //     this.list.unshift(project);
    //     this.dialogFormVisible = false;
    //   } else {
    //     ElMessage.error(res.data.msg || "新增失败");
    //   }
    // },
    // async editProject(project: Project) {
    //   const res: HttpResponse = await ProjectService.update(project);
    //   if (res.status === 200 && res.data.code === 0) {
    //     const index = this.list.findIndex((v: Project) => v.id === project.id);
    //     this.list.splice(index, 1, project);
    //     ElMessage({ type: "success", message: "修改成功" });
    //     this.dialogFormVisible = false;
    //   } else {
    //     ElMessage.error(res.data.msg || "修改失败");
    //   }
    // },
    // async deleteObj(row: Project, index: number) {
    //   const res: HttpResponse = await ProjectService.delete({
    //     projectId: row.id,
    //   });
    //   if (res.status === 200 && res.data.code === 0) {
    //     this.list.splice(index, 1);
    //     ElMessage({ type: "success", message: "删除成功" });
    //   } else {
    //     ElMessage.error(res.data.msg || "修改失败");
    //   }
    // },
    // assigneeChange(newAssigneeId: number, row: Project): void {
    //   console.log("assigneeChange", newAssigneeId, row);
    // },
    // handleMember(row: Project, index: number) {
    //   if (row.id) {
    //     this.$router.push({
    //       path: "/project/member",
    //       query: {
    //         id: row.id,
    //       },
    //     });
    //   }
    // }
  }
})
</script>
