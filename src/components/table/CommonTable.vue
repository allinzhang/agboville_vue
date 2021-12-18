<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-18 17:31:52
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/components/table/CommonTable.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <div class="filter-container">
      <template
        v-for="(item, index) in tableQuery"
        :key="index"
        >
        <el-input
          v-model="listQuery[item.key]"
          :placeholder="item.label"
          style="width: 200px"
          class="filter-item"
          @keyup.enter="handleFilter"
        />
      </template>
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
    </div>
    <el-table
      v-loading="listLoading"
      :data="listData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column prop="name" label="项目名" width="180" align="center" >
        <template #default="scope">
          <el-link type="primary" @click.stop="toProjectMissionList(scope.row, scope.index)">{{ scope.row.name || "" }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stageId" label="当前阶段" width="80" align="center" />
      <el-table-column prop="level" label="优先级" width="80" align="center" >
        <template #default="scope">
          <el-popover placement="bottom" :width="200" trigger="click">
            <el-select v-model="scope.row.level" placeholder="选择任务优先级" @change="levelChange($event, scope.row)">
              <el-option label="紧急" value="0"></el-option>
              <el-option label="高" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="低" value="3"></el-option>
            </el-select>
            <template #reference>
              <el-tag v-if="scope.row.level == 0" type="danger">紧急</el-tag>
              <el-tag v-else-if="scope.row.level == 1" type="warning">高</el-tag>
              <el-tag v-else-if="scope.row.level == 2" type="success">中</el-tag>
              <el-tag v-else-if="scope.row.level == 3" type="info">低</el-tag>
              <el-tag v-else type="info">未设置</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center" >
        <template #default="scope">
          <el-popover placement="bottom" :width="200" trigger="click">
            <el-select v-model="scope.row.status" placeholder="选择任务状态" @change="statusChange($event, scope.row)">
              <el-option label="任务池" value="0"></el-option>
              <el-option label="未开始" value="1"></el-option>
              <el-option label="进行中" value="2"></el-option>
              <el-option label="已结束" value="3"></el-option>
              <el-option label="已取消" value="4"></el-option>
              <el-option label="延期" value="5"></el-option>
              <el-option label="延误" value="6"></el-option>
            </el-select>
            <template #reference>
              <el-tag v-if="scope.row.status == 0" type="info">任务池</el-tag>
              <el-tag v-else-if="scope.row.status == 1" type="info">未开始</el-tag>
              <el-tag v-else-if="scope.row.status == 2" type="success">进行中</el-tag>
              <el-tag v-else-if="scope.row.status == 3" type="info">已完成</el-tag>
              <el-tag v-else-if="scope.row.status == 4" type="info">已取消</el-tag>
              <el-tag v-else-if="scope.row.status == 5" type="danger">延期</el-tag>
              <el-tag v-else-if="scope.row.status == 6" type="danger">延误</el-tag>
              <el-tag v-else type="info">未开始</el-tag>
            </template>
          </el-popover>
        </template>
        
      </el-table-column>
      <el-table-column prop="assignee" label="负责人" width="80" align="center">
        <template #default="scope">
        </template>
      </el-table-column>
      <el-table-column prop="planStartTime" label="计划开始时间" width="120" align="center" />
      <el-table-column prop="planEndTime" label="计划结束时间" width="120" align="center" /> -->
      <template
         v-for="(item, index) in tableForm"
        :key="index"
      >
        <el-table-column
          v-if="item.type != 'textarea'"
          :prop="item.key"
          :label="item.label"
          :width="item.tableWidth ? item.tableWidth : 120"
          align="center"
        >
          <template #default="scope">
            <template v-if="item.type === 'input'">
              {{scope.row[item.key]}}
            </template>
            <template v-if="item.type === 'select'">
              <el-popover placement="bottom" :width="200" trigger="click">
                <el-select
                    v-model="scope.row[item.key]"
                    :placeholder="'请选择' + item.label"
                    @change="changeRow($event, scope.row)"
                >
                  <el-option v-for="(selectItem, selectIndex) in item.selectList" :key="selectIndex" :label="selectItem" :value="selectIndex"></el-option>
                </el-select>
                <template #reference>
                  <el-tag type="success" v-if="scope.row[item.key]">{{item.selectList[scope.row[item.key]]}}</el-tag>
                  <el-tag type="info" v-else>未设置</el-tag>
                </template>
              </el-popover>
            </template>
            <template v-if="item.type === 'datetime'">
              <!-- <el-popover placement="bottom" :width="200" trigger="click">
                <template #reference>
                  {{scope.row[item.key]}}
                </template>
              </el-popover> -->
              <el-popover placement="bottom" :width="260" trigger="click">
                <el-date-picker
                  v-model="scope.row[item.key]"
                  type="datetime"
                  :placeholder="'请选择' + item.label"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  @change="changeRow($event, scope.row)"
                >
                </el-date-picker>
                <template #reference>
                  <div style="height: 20px;width: 100%">
                    {{scope.row[item.key] || ""}}
                  </div>
                </template>
              </el-popover>
            </template>
          </template>
        </el-table-column>
      </template>
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
      v-show="listTotal > 0"
      :total="listTotal"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @pagination="handleMore"
    />
    <!-- 新增/修改弹窗 -->
    <el-dialog
      v-model="infoDialogVisible"
      :title="infoDialogTitleMap[infoDialogType]"
    >
    <!-- ref="objForm" -->
      <el-form :model="objForm" label-width="120px">
        <el-form-item
          v-for="(item, index) in tableForm"
          :key="index"
          :label="item.label"
          >
          <template v-if="item.type == 'input'">
            <el-input
              v-model="objForm[item.key]"
              autocomplete="off"
              :placeholder="'请输入' + item.label"
            ></el-input>
          </template>
          <template v-if="item.type == 'select'">
            <el-select
              v-model="objForm[item.key]"
              :placeholder="'请选择' + item.label"
              >
              <el-option v-for="(selectItem, selectIndex) in item.selectList" :key="selectIndex" :label="selectItem" :value="selectIndex"></el-option>
            </el-select>
          </template>
          <template v-if="item.type == 'datetime'">
            <el-date-picker
              v-model="objForm[item.key]"
              type="datetime"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              :placeholder="'请选择' + item.label"
            >
            </el-date-picker>
          </template>
          <template v-if="item.type == 'textarea'">
            <el-input
              v-model="objForm[item.key]"
              show-word-limit
              type="textarea"
              autocomplete="off"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :placeholder="'请输入' + item.label"
              maxlength="255"
            ></el-input>
          </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="infoDialogCancel">关闭</el-button>
          <el-button type="primary" @click="infoDialogConfirm">
            {{ infoDialogTitleMap[infoDialogType] || "" }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

import useCommonTable from '../../hooks/useCommonTable';

export default defineComponent({
  setup(props, { emit }) {
    const tableOptions = inject("tableOptions");

    const {
      listLoading, listData, listTotal, listQuery,
      downloadLoading, handleFilter, handleCreate, handleEdit, handleDelete, handleMore, handleDownload, handleDetail,
      infoDialogVisible, objForm, infoDialogCancel, infoDialogConfirm, infoDialogType, infoDialogTitleMap, editObj
    } = useCommonTable(tableOptions.formObj, tableOptions.service, {
      listQuery: Object.assign({}, tableOptions.tableQueryDefault),
      detailPath: tableOptions.detailPath
    })

    const changeRow = (value, row) => {
      console.log("changeRow", value, row)
      editObj(row);
    }
    return {
      tableQuery: tableOptions.tableQuery,
      tableForm: tableOptions.formOption,
      // Search,
      // CirclePlus,
      // TopRight,
      listLoading,
      downloadLoading,
      listData,
      listTotal,
      listQuery,
      
      handleFilter,
      handleCreate,
      handleEdit,
      handleDelete,
      handleMore,
      handleDownload,
      handleDetail,
      infoDialogVisible,
      objForm,
      infoDialogTitleMap,
      infoDialogType,
      infoDialogCancel,
      infoDialogConfirm,

      changeRow,
    }
  }
})
</script>
