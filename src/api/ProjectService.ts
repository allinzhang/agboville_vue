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
import { HttpResponse } from "../types/http";
import { Project } from "../types/project";

export interface listParam {
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
export interface deleteParam {
  projectId: number;
}

export class ProjectService {
  static async list(params: listParam): Promise<HttpResponse> {
    return Axios("/web/project/list", {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  static async detail(params: Project): Promise<HttpResponse> {
    return Axios("/web/project/add", {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  static async create(params: Project): Promise<HttpResponse> {
    return Axios("/web/project/add", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  static async update(params: Project): Promise<HttpResponse> {
    return Axios("/web/project/update", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  static async delete(params: deleteParam): Promise<HttpResponse> {
    return Axios("/web/project/delete", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
