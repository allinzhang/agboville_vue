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
import { ProjectUser } from "../types/project";

export interface auditParam {
  projectUserId: number;
  status: number;
}

export class ProjectUserService extends BaseService<ProjectUser> {
  constructor() {
    super("/web/prouser");
  }
  audit(params: auditParam) {
    return Axios("/web/prouser/audit", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
