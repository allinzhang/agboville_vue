export interface ProjectPlan {
  id: number;
  projectId: number;
  assignee: number;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
