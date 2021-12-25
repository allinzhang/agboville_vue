/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:18:28
 * @LastEditTime: 2021-12-14 17:22:42
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/api/MissionService.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Axios from "./http";
import { HttpResponse } from "../types/http";
import { ProjectStage } from "../types/ProjectStage";

export interface listParam {
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
export interface deleteParam {
  id: number;
}

export class ProjectStageService {
  static async list(params: listParam): Promise<HttpResponse> {
    return Axios("/web/prostage/list", {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  static async detail(params: ProjectStage): Promise<HttpResponse> {
    return Axios("/web/prostage/add", {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  static async create(params: ProjectStage): Promise<HttpResponse> {
    return Axios("/web/prostage/add", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  static async update(params: ProjectStage): Promise<HttpResponse> {
    return Axios("/web/prostage/update", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  static async delete(params: deleteParam): Promise<HttpResponse> {
    return Axios("/web/prostage/delete", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
