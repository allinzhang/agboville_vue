/**
 * because table is reusable, so change composition
 */
import { onMounted, ref, reactive, Ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from "element-plus";

import { ExcelService } from "../static/utils/exportToExcel";
import { HttpResponse } from "../types/http";
import { CommonTableQuery, UseCommonTableOptions, TableObj, dialogTitle } from "../types/CommonTable";

export default function useCommonTable(obj: TableObj, service: any, options: UseCommonTableOptions) {
  const router = useRouter();

  const infoDialogVisible = ref(false);
  const listLoading = ref(true);
  const downloadLoading = ref(false);
  const listData: Ref<Array<TableObj>> = ref([]);
  const listTotal = ref(0);
  const listQuery = reactive(Object.assign({}, {
    page: 1,
    limit: 20,
    sort: "id",
  }, options.listQuery))
  let objForm = reactive(Object.assign({}, obj));
  const infoDialogTitleMap: dialogTitle = { create: "新增", update: "编辑" };
  let infoDialogType: Ref<string> = ref("create");

  const handleFilter = () => {
    listQuery.page = 1;
    getList()
  }
  const handleCreate = () => {
    //   this.clearObjForm();
    infoDialogType.value = "create";
    infoDialogVisible.value = true;
    //   this.$nextTick(() => {
    //     this.$refs["objForm"].clearValidate();
    //   })
  }
  const handleEdit = (row: TableObj) => {
    console.log("handleEdit", row)
    objForm = row;
    console.log("objForm", objForm)
    infoDialogVisible.value = true;
    infoDialogType.value = "update";
    // this.$nextTick(() => {
    //   this.$refs["objForm"].clearValidate();
    // })
  }
  const handleDelete = (row: TableObj, index: number) => {
    ElMessageBox.confirm(`确认删除?`, "确认操作", {
      confirmButtonText: "删除",
      confirmButtonClass: "danger",
    }).then(() => {
      deleteObj(row, index);
    });
  }
  const handleDownload = () => {
    downloadLoading.value = true;
    const excelService = new ExcelService();
    excelService.exportAsExcelFile(listData.value, options.title || "表格");
    downloadLoading.value = false;
  }
  const handleMore = () => {
    listQuery.page++;
    getList()
  }
  const handleDetail = (row: TableObj) => {
    if (row.id) {
      router.push({
        path: options.detailPath,
        query: {
          id: row.id,
        }
      });
    }
  }
  const infoDialogCancel = () => {
    infoDialogVisible.value = false;
  }
  const infoDialogConfirm = () => {
    console.log("infoDialogConfirm", objForm);
    if (objForm.id) {
      editObj(objForm);
    } else {
      createObj(objForm);
    }
    infoDialogVisible.value = false;
    // this.$refs["objForm"].validate((valid: any) => {
    //   if(valid) {
    //     console.log("valid", objForm)
    //     // console.log(this.objForm.planStartTime.toString())
    //     // this.objForm.planStartTime = this.objForm.planTime[0];
    //     // this.objForm.planEndTime = this.objForm.planTime[1];
    //     // this.objForm.planTime = "";
    //     // if (this.dialogStatus === "create") {
    //     //   this.objForm.projectId = this.projectId;
    //     //   this.createObj(this.objForm);
    //     // } else if (this.dialogStatus === "update") {
    //     //   // this.objForm.id = "";
    //     //   this.editObj(this.objForm);
    //     // }
    //   }
    // })
  }

  const getList = () => {
    service.list(listQuery).then((res: HttpResponse) => {
      if (res.status === 200 && res.data.code === 0) {
        listData.value = res.data.data.list;
        listTotal.value = res.data.data.total;
        setTimeout(() => {
          listLoading.value = false;
        }, 1000);
      }
    });
  }
  const deleteObj = (row: TableObj, index: number) => {
    service.delete({
      id: row.id
    }).then((res: HttpResponse) => {
      if (res.status === 200 && res.data.code === 0) {
        listData.value.splice(index, 1);
        ElMessage({ type: "success", message: "删除成功" });
      } else {
        ElMessage({ type: "error", message: res.data.msg || "删除失败" });
      }
    });
  }
  const createObj = async (obj: TableObj) => {
    
    const res: HttpResponse = await service.create(Object.assign({}, obj, listQuery));
    if (res.status === 200 && res.data.code === 0) {
      ElMessage({ type: "success", message: "新增成功" });
      listData.value.unshift(obj);
      infoDialogVisible.value = false;
    } else {
      ElMessage.error(res.data.msg || "新增失败");
    }
  }
  const editObj = async (obj: TableObj) => {
    const res: HttpResponse = await service.update(Object.assign({}, obj, listQuery));
    if (res.status === 200 && res.data.code === 0) {
      const index = listData.value.findIndex((v: TableObj) => v.id === obj.id);
      listData.value.splice(index, 1, obj);
      ElMessage({ type: "success", message: "修改成功" });
      infoDialogVisible.value = false;
    } else {
      ElMessage.error(res.data.msg || "修改失败");
    }
  }
  
  onMounted(() => {
    getList()
  });
  return {
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
    infoDialogTitleMap,
    infoDialogType,
    objForm: computed(() => objForm),
    infoDialogCancel,
    infoDialogConfirm,

    editObj,
  }
}