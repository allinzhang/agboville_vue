export interface ProjectMeeting {
  id: number;
  projectId: number;
  assignee: number; // 负责人
  name: string; // 会议名称
  address: string; // 地址
  recorder: string; // 记录人
  target: string; // 会议目标
  material: string; // 会议发放资料
  record: string; // 会议记录
  document: string; // 会议资源
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
