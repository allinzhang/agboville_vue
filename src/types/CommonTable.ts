/*
 * @Author: allin.zhang
 * @Date: 2021-12-27 09:31:55
 * @LastEditTime: 2021-12-27 09:50:27
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/types/CommonTable.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { Ref } from "vue";

export interface CommonTableOptions {
  service: any,
  formObj: any,
  tableQuery: Array<any>;
  formOption: Array<CommonTableFormOption>;
  tableBtn: Array<any>;
  detailPath: string;
  tableQueryDefault: any;
}
export interface CommonTableFormOption{
  label: string;
  key: string;
  type: string; // column type (input/image/images/textarea/datatime)
  tableWidth: number; // table column width
  objKey: string; // if type=image and data is Object
  listKey: string; // if type=images and data is Array
  selectType: number; // value = 0 is ["success", "fail"], value = 1 is [{label, value}]
  selectList: Array<{label: string; value: string}>; // edit data
  link: string;
}
export interface CommonTableQuery {
  page: number;
  limit: number;
  sort?: string;
  order?: string;
  [key: string]: any;
}
export interface UseCommonTableOptions {
  title?: string; // 标题(导出文件名)
  listQuery: CommonTableQuery
  detailPath: string;
}
export interface CommonTableResult<T> {
  listLoading: Ref<boolean>;
  downloadLoading: Ref<boolean>;
  infoDialogVisible: Ref<boolean>;
  listData: Array<TableObj>;
  listTotal: Ref<number>;
  listQuery: Ref<CommonTableQuery>;
  objForm: any;
  handleFilter: () => void;
  handleCreate: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleMore: () => void;
  handleDownload: () => void;
  handleDetail: () => void;
  infoDialogCancel: () => void;
  infoDialogConfirm: () => void;
}
export interface TableObj {
  id: number;
  key: string;
  name: string;
  [key: string]: any;
}
export interface dialogTitle {
  create: string;
  update: string;
  [key:string]: string;
}