export interface Mission {
  id: number;
  projectId: number;
  name: string;
  content: string;
  stageId: number;
  assignee: number;
  type: number; // 类型(0其他1开发2修复)
  status: number; // 状态(0任务池1未开始2进行中3已完成4已取消5延期6延误)
  level: number; // 优先级(0紧急1高2中3低)
  planStartTime: Date;
  planEndTime: Date;
  finishedTime: Date;
  createUser: number;
}
