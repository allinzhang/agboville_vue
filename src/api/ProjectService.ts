/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:18:28
 * @LastEditTime: 2021-12-14 17:21:07
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/api/ProjectService.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Axios from "./http";
import BaseService from './BaseService';
import { Project } from "../types/project";

export class ProjectService extends BaseService<Project> {
  constructor() {
    super("/web/project");
  }
  report(projectId: number) {
    return Axios(`${this.getBaseUrl()}/report`, {
      method: "GET",
      responseType: "json",
      params: {
        projectId,
      },
    });
  }
}
