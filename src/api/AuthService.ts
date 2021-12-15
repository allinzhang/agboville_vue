import Axios from "./http";
import { HttpResponse } from "../types/http";

export interface MobileLoginParams {
  mobile: string;
  code: string;
}

export class AuthService {
  static async loginByMobile(params: MobileLoginParams): Promise<HttpResponse> {
    return Axios("/web/auth/loginByMobile", {
      method: "POST",
      responseType: "json",
      data: {
        ...params,
      },
    });
  }
}
