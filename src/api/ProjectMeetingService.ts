/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:18:28
 * @LastEditTime: 2021-12-14 17:22:42
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/api/MissionService.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import BaseService from './BaseService';
import { ProjectMeeting } from "../types/ProjectMeeting";

export class ProjectMeetingService extends BaseService<ProjectMeeting> {
  constructor() {
    super("/web/promeet");
  }
}
