/*
 * @Author: allin.zhang
 * @Date: 2021-12-15 22:52:55
 * @LastEditTime: 2021-12-20 21:21:38
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/types/user.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

export interface User {
  id: number;
  realname: string;
  nickname: string;
  mobile: string;
  avatar: string;
  age: number;
  gender: number;
  parentId: number;
  type: number;
  source: number;
}
