export interface ProjectSow {
  id: number;
  projectId: number;
  parentId: number;
  name: string;
  content: string;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
