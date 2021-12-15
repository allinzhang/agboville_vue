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
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="任务名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <!-- v-waves -->
      <el-button
        class="filter-item"
        type="primary"
        :icon="Search"
        style="margin-left: 10px"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        type="success"
        :icon="CirclePlus"
        style="margin-left: 10px"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        :icon="TopRight"
        style="margin-left: 10px"
        @click="handleDownload"
      >
        导出
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
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
      <el-table-column prop="stageId" label="当前阶段" width="80" align="center" />
      <el-table-column prop="level" label="优先级" width="80" align="center" >
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">紧急</el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="warning">高</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="primary">中</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="info">低</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center" >
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0" type="info">任务池</el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="info">未开始</el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="primary">进行中</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="info">已完成</el-tag>
          <el-tag v-else-if="scope.row.status == 4" type="info">已取消</el-tag>
          <el-tag v-else-if="scope.row.status == 5" type="danger">延期</el-tag>
          <el-tag v-else-if="scope.row.status == 6" type="danger">延误</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="assignee" label="负责人" width="80" align="center">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" align="center">
            <template #default>
              <p>姓名: {{ scope.row.name }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.assignee }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="planStartDate" label="计划开始时间" width="120" align="center" />
      <el-table-column prop="planEndDate" label="计划结束时间" width="120" align="center" />
      <el-table-column label="操作" width="260" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
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
    <!-- 新增/修改弹窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogTitleMap[dialogStatus]"
    >
      <el-form ref="objForm" :model="objForm" label-width="120px">
        <el-form-item label="任务名称">
          <el-input
            v-model="objForm.name"
            autocomplete="off"
            placeholder="请输入任务名称"
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
        <el-form-item label="优先级">
          <el-select v-model="objForm.level" placeholder="请选择优先级">
            <el-option label="紧急" value="0"></el-option>
            <el-option label="高" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="低" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="objForm.status" placeholder="请选择任务状态">
            <el-option label="任务池" value="0"></el-option>
            <el-option label="未开始" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="已结束" value="3"></el-option>
            <el-option label="已取消" value="4"></el-option>
            <el-option label="延期" value="5"></el-option>
            <el-option label="延误" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="objForm.planStartDate"
            type="date"
            placeholder="选择计划开始时间"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划结束时间">
          <el-date-picker
            v-model="objForm.planEndDate"
            type="date"
            placeholder="选择计划结束时间"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务介绍">
          <el-input
            v-model="objForm.content"
            show-word-limit
            type="textarea"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入任务介绍"
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
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ElMessageBox, ElMessage } from "element-plus";
// import { Search, CirclePlus, TopRight } from '@element-plus/icons'

import { MissionService } from "../../api/MissionService";
import { HttpResponse } from "../../types/http";
import { Mission } from "../../types/mission";

import { ExcelService } from "../../static/utils/exportToExcel";

export default defineComponent({
  data() {
    return {
      // Search,
      // CirclePlus,
      // TopRight,
      list: [], // 表格数据
      total: 0, // 表格总数
      listLoading: true, // 是否显示表格加载
      dialogFormVisible: false, // 是否显示新增修改弹窗
      downloadLoading: false, // 是否正在导出
      listQuery: {
        page: 1,
        limit: 20,
        sort: "id",
        projectId: undefined,
        name: undefined,
      },
      dialogTitleMap: {
        create: "新增",
        update: "修改",
      }, // 弹窗标题
      dialogStatus: "create", // 弹窗类型
      objForm: {
        name: "",
        content: "",
        stageId: "",
        status: "",
        level: "",
        assignee: "",
        planStartDate: "",
        planEndDate: "",
      },
      projectId: "",
    };
  },
  mounted() {
    const query = this.$route.query;
    console.log("query", query);
    if (query) {
      this.projectId = query.id;
      this.listQuery.projectId = query.id;
    }
    this.getList();
  },
  setup() {
    // const links = Ref([]);
    // console.log("links", links);
    const querySearchUser = (queryString: string, cb: (arg: any) => void) => {
      let results = [
        { value: "name" },
        { value: "list" },
      ];
      cb(results);
    };
    return {
      // state: ref(''),
      querySearchUser,
    };
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const res: HttpResponse = await MissionService.list(this.listQuery);
      if (res.status === 200 && res.data.code === 0) {
        this.list = res.data.data.list;
        this.total = res.data.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1000);
      }
    },
    handleFilter(): void {
      this.listQuery.page = 1;
      this.getList();
    },
    handleCreate(): void {
      this.clearObjForm();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["objForm"].clearValidate();
      })
    },
    handleEdit(row: Mission): void {
      this.objForm = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["objForm"].clearValidate();
      })
    },
    clearObjForm(): void {
      this.objForm = {
        name: "",
        content: "",
        stageId: "",
        status: "",
        level: "",
        assignee: "",
        planStartDate: "",
        planEndDate: "",
      };
    },
    dialogFormConfirm(): void {
      console.log("dialogFormConfirm", this.objForm);
      this.$refs["objForm"].validate((valid: any) => {
        if(valid) {
          if (this.dialogStatus === "create") {
            this.objForm.projectId = this.projectId;
            this.createObj(this.objForm);
          } else if (this.dialogStatus === "update") {
            // this.objForm.id = "";
            this.editObj(this.objForm);
          }
        }
      })
    },
    handleSelectUser(): void {
      console.log("handleSelectUser");
    },
    // public toProjectMissionList(row: Mission): void {
    //   if (row.id) {
    //     this.$router.push("/mission", {
    //       id: row.id,
    //     });
    //   }
    // }
    handleDetail(row: Mission): void {
      if (row.id) {
        this.$router.push("/project/detail", {
          id: row.id,
        });
      }
    },
    handleDelete(row: Mission, index: number): void {
      ElMessageBox.confirm(`确认删除${row.name}任务?`, "确认操作", {
        confirmButtonText: "删除",
      }).then(() => {
        this.deleteObj(row, index);
      });
    },
    handleDownload(): void {
      this.downloadLoading = true;
      const excelService = new ExcelService();
      excelService.exportAsExcelFile(this.list, "项目任务列表");
      this.downloadLoading = false;
    },
    async createObj(mission: Mission) {
      const res: HttpResponse = await MissionService.create(mission);
      if (res.status === 200 && res.data.code === 0) {
        ElMessage({ type: "success", message: "新增成功" });
        this.list.unshift(mission);
        this.dialogFormVisible = false;
      } else {
        ElMessage.error(res.data.msg || "新增失败");
      }
    },
    async editObj(mission: Mission) {
      const res: HttpResponse = await MissionService.update(mission);
      if (res.status === 200 && res.data.code === 0) {
        const index = this.list.findIndex((v: Mission) => v.id === mission.id);
        this.list.splice(index, 1, mission);
        ElMessage({ type: "success", message: "修改成功" });
        this.dialogFormVisible = false;
      } else {
        ElMessage.error(res.data.msg || "修改失败");
      }
    },
    async deleteObj(row: Mission, index: number) {
      const res: HttpResponse = await MissionService.delete({
        id: row.id,
      });
      if (res.status === 200 && res.data.code === 0) {
        this.list.splice(index, 1);
        ElMessage({ type: "success", message: "删除成功" });
      } else {
        ElMessage.error(res.data.msg || "修改失败");
      }
    }
  }
})
</script>
