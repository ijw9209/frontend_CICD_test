import { HTTP_METHOD } from "@/common/enums";
import axios, { AxiosResponse } from "axios";
// import JwtStorageService from "@/infrastructure/services/auth/jwt-storage.service";
import { DomainService } from ".";

export class BaseService extends DomainService {
  constructor() {
    super();
  }

  override _api<T>(
    baseUrl: string,
    httpMethod: HTTP_METHOD,
    path: string,
    params?: any
  ): Promise<AxiosResponse<T>> {
    //request intercepter
    axios.interceptors.request.use(
      (config) => {
        let authorization = config.headers.Authorization;
        if (authorization) {
          // 라데나일 경우에만 사용
          // authorization = authorization.replace("LD1 ", "");
          config.headers.Authorization = authorization;
        }

        return config;
      },
      async (error) => {}
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { response } = error;

        if (response.status === 400) {
          ///...
        } else if (response.status === 401) {
          //....
        } else if (response.status === 500) {
        }

        return;
      }
    );
    return super._api(baseUrl, httpMethod, path, params);
  }
}
