export interface ProjectAlter {
  id: number;
  projectId: number;
  reason: string;
  status: number;
  auditor: string;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
