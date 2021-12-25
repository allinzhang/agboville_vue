export interface ProjectPlayer {
  id: number;
  projectId: number;
  userId: number;
  rule: string;
  department: string;
  duty: string;
  status: number;
  source: number;
  inviter: number;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
