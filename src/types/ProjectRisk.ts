export interface ProjectRisk {
  id: number;
  projectId: number;
  name: string;
  probabilityLevel: number;
  affectLevel: number;
  riskLevel: number;
  incidence: string;
  assignee: number;
  method: string;
  result: string;
  isHappen: string;
  deleted: Boolean;
  createUser: number;
  createTime: Date;
  updateUser: number;
  updateTime: Date;
  remark: string;
}
