export interface Project {
  id: number;
  name: string;
  content: string;
  status: number;
  type: number;
  assignee: number;
  stageId: number;
}
export interface ProjectUser {
  id: number;
  avatar: string;
  nickname: string;
  realname: string;
}