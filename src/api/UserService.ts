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
import { User } from "../types/user";

export class UserService {
  static async detail(): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      Axios("/web/user/detail", {
        method: "GET",
        responseType: "json"
      }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          resolve(res.data.data);
        } else {
          reject(res)
        }
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    });
  }
  static async update(params: User): Promise<HttpResponse> {
    return Axios("/web/user/update", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
