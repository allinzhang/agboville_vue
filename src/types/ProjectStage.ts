export interface ProjectStage {
  id: number;
  projectId: number;
  name: string;
  content: string;
  assignee: number;
  status: number;
  sort: number;
  enter: string;
  exit: string;
  startTime: Date;
  endTime: Date;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
