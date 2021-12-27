/*
 * @Author: allin.zhang
 * @Date: 2021-12-14 17:18:28
 * @LastEditTime: 2021-12-27 09:38:11
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/api/BaseService.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import Axios from "./http";
import { HttpResponse } from "../types/http";
import { Mission } from "../types/mission";

export interface listParam {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  [key: string]: any;
  projectId?: string;
}
export interface deleteParam {
  id: number;
}

export default class BaseService<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(params: listParam) {
    return Axios(`${this.baseUrl}/list`, {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  detail(params: T) {
    return Axios(`${this.baseUrl}/detail`, {
      method: "GET",
      responseType: "json",
      params: {
        ...params,
      },
    });
  }
  create(params: T) {
    return Axios(`${this.baseUrl}/add`, {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  update(params: T) {
    return Axios(`${this.baseUrl}/update`, {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
  delete(params: T) {
    return Axios(`${this.baseUrl}/delete`, {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
