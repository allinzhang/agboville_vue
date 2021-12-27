<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-27 09:32:35
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/components/table/CommonTable.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <div class="filter-container">
      <el-row>
        <template
          v-for="(item, index) in tableQuery"
          :key="index"
          >
          <template v-if="item.type === 'input'">
            <el-input
              v-model="listQuery[item.key]"
              :placeholder="item.label"
              style="width: 200px;"
              class="filter-item"
            />
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="listQuery[item.key]"
              :placeholder="'请选择' + item.label"
              style="width: 200px;"
              class="filter-item"
            >
              <el-option
                v-for="(selectItem, selectIndex) in item.selectList"
                :key="selectIndex"
                :label="selectItem"
                :value="selectIndex"
              ></el-option>
            </el-select>
          </template>
          <template v-if="item.type === 'datetime'">
            <el-date-picker
              v-model="listQuery[item.key]"
              type="datetime"
              class="filter-item"
              :placeholder="'请选择' + item.label"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              :shortcuts="datePickerShortcut"
            >
            </el-date-picker>
          </template>
        </template>
      </el-row>
      <el-row>
        <!-- v-waves -->
        <el-button
          class="filter-item"
          type="primary"
          :icon="Search"
          @click="handleFilter"
        >
          搜索
        </el-button>
        <el-button
          class="filter-item"
          type="success"
          :icon="CirclePlus"
          @click="handleCreate"
        >
          添加
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          :loading="downloadLoading"
          :icon="TopRight"
          @click="handleDownload"
        >
          导出
        </el-button>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="listData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
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
              <el-link v-if="item.link" type="primary" @click.stop="toLink(scope.row, item)">{{ scope.row[item.key] || "" }}</el-link>
              <span v-else>{{scope.row[item.key]}}</span>
            </template>
            <template v-if="item.type === 'select'">
              <el-popover placement="bottom" :width="200" trigger="click">
                <el-select
                    v-model="scope.row[item.key]"
                    :placeholder="'请选择' + item.label"
                    @change="changeRow($event, scope.row)"
                >
                  <el-option
                    v-for="(selectItem, selectIndex) in item.selectList"
                    :key="selectIndex"
                    :label="selectItem.label"
                    :value="selectItem.value"
                  ></el-option>
                </el-select>
                <template #reference>
                  <el-tag type="success" v-if="scope.row[item.key]">
                    <span v-if="item.selectType == 1"></span>
                    <span v-else>{{item.selectList[scope.row[item.key]]}}</span>
                  </el-tag>
                  <el-tag type="info" v-else>未设置</el-tag>
                </template>
              </el-popover>
            </template>
            <template v-if="item.type === 'datetime'">
              <el-popover placement="bottom" :width="260" trigger="click">
                <el-date-picker
                  v-model="scope.row[item.key]"
                  type="datetime"
                  :placeholder="'请选择' + item.label"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :shortcuts="datePickerShortcut"
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
            <template v-if="item.type === 'images'">
              <template v-for="(imgItem, imgIndex) in scope.row[item.key]" :key="imgIndex">
                <el-avatar :size="36" :src="imgItem[item.listKey]"></el-avatar>
              </template>
            </template>
            <template v-if="item.type === 'image'">
              <el-avatar :size="36" :src="item.objKey ? scope.row[item.key][item.objKey] : scope.row[item.key]"></el-avatar>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" :width="tableBtn.length * 80 + 200" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <template v-if="tableBtn.length > 0">
            <el-button
              v-for="(item, index) in tableBtn"
              :key="index"
              :type="item.classType"
              size="mini"
              @click.stop="toEmitEvent(item.eventName, scope.row)"
              >{{item.name || ""}}
            </el-button>
          </template>
          <el-button
            type="success"
            size="mini"
            @click="handleEdit(scope.row)"
            >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row, scope.$index)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      v-show="listTotal > 0"
      :total="listTotal"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @pagination="handleMore"
      style="margin-top: 10px;"
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
              :shortcuts="datePickerShortcut"
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

import { Search, CirclePlus, TopRight } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';

import useCommonTable from '../../hooks/useCommonTable';
import { CommonTableOptions, CommonTableFormOption } from '../../types/CommonTable';


/**
 * public tabke
 * @Param service Object Service Class(list/create/update/delete)
 * @Param formObj Array object configuration
 * @Param formOption Array<CommonTableFormOption> table column configuration
 * @Param tableQuery Object list or detail must post data
 * @Param tableBtn
 */
export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter();
    const tableOptions: CommonTableOptions = (inject("tableOptions") as CommonTableOptions);
    const datePickerShortcut = [
      {
        text: 'Today',
        value: new Date(),
      },
      {
        text: 'Yesterday',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        },
      },
      {
        text: 'A week ago',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        },
      }
    ] // 日历插件快捷选择配置
    const {
      listLoading, listData, listTotal, listQuery,
      downloadLoading, handleFilter, handleCreate, handleEdit, handleDelete, handleMore, handleDownload, handleDetail,
      infoDialogVisible, objForm, infoDialogCancel, infoDialogConfirm, infoDialogType, infoDialogTitleMap, editObj
    } = useCommonTable(tableOptions.formObj, tableOptions.service, {
      listQuery: Object.assign({}, tableOptions.tableQueryDefault),
      detailPath: tableOptions.detailPath
    })

    const changeRow = (value: any, row: any) => {
      editObj(row);
    }
    const toEmitEvent = (eventName: any, row: any) => {
      emit(eventName, row)
    }
    const toLink = (row: any, options: any) => {
      let obj: any = {};
      if (options.linkParam) {
        for (let key of options.linkParam) {
          obj[key] = row[key];
        }
      }
      console.log(options.link, obj)
      router.push({
        path: options.link,
        query: obj
      })
    }
    return {
      datePickerShortcut,

      tableQuery: tableOptions.tableQuery,
      tableForm: tableOptions.formOption,
      tableBtn: tableOptions.tableBtn,
      Search,
      CirclePlus,
      TopRight,
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
      toEmitEvent,
      toLink,
    }
  }
})
</script>
