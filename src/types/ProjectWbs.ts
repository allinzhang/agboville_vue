export interface ProjectWbs {
  id: number;
  projectId: number;
  parentId: number;
  assignee: number;
  code: string;
  name: string;
  content: string;
  timeTotal: number;
  userTotal: number;
  priceTotal: number;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
