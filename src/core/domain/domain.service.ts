import { HTTP_METHOD } from "@/common/enums";
import axios, { AxiosResponse } from "axios";
// import JwtStorageService from "@/infrastructure/services/auth/jwt-storage.service";
import { DomainPaginationDto } from "./domain-pagination.dto";
export class DomainService {
  constructor() {}

  /**
   * GET - get 호출 시 사용
   * @param path\
   * @param params
   * @returns T
   */
  protected get<T>(
    baseUrl: string,
    path: string,
    params?: any
  ): Promise<AxiosResponse<T>> {
    console.log("여ㅛ기111", baseUrl, HTTP_METHOD.GET, path, params);
    return this._api<T>(baseUrl, HTTP_METHOD.GET, path, params);
  }

  /**
   * POST - post할 때 사용
   * @param path
   * @param body
   * @returns T | null
   */
  protected post<T>(
    baseUrl: string,
    path: string,
    body?: any
  ): Promise<AxiosResponse<T>> {
    return this._api<T>(baseUrl, HTTP_METHOD.POST, path, body);
  }

  /**
   * PATCH - 업데이트할 때 사용
   * @param path
   * @param body
   * @returns T | null
   */
  protected patch<T>(
    baseUrl: string,
    path: string,
    body?: any
  ): Promise<AxiosResponse<T>> {
    return this._api<T>(baseUrl, HTTP_METHOD.PATCH, path, body);
  }

  /**
   * PUT - PUT으로 업데이트할 때 사용
   * @param baseUrl
   * @param path
   * @param body
   * @returns T | null
   */
  protected put<T>(
    baseUrl: string,
    path: string,
    body?: any
  ): Promise<AxiosResponse<T>> {
    return this._api<T>(baseUrl, HTTP_METHOD.PUT, path, body);
  }

  /**
   * DELETE - 삭제할 때 사용
   * @param path
   * @param params
   * @returns T | null
   */
  protected delete<T>(
    baseUrl: string,
    path: string,
    params?: any
  ): Promise<AxiosResponse<T>> {
    return this._api<T>(baseUrl, HTTP_METHOD.DELETE, path, params);
  }

  /**
   * Pagination처리 요청
   * @param path
   * @param params
   * @param pagination
   * @returns T[]
   */
  protected paginate<T>(
    baseUrl: string,
    path: string,
    params: any,
    pagination: DomainPaginationDto
  ): Promise<AxiosResponse<T>> {
    let request = {};

    if (params instanceof DomainPaginationDto) {
      request = {
        offset: String(params.limit * params.offset),
        limit: String(params.limit),
      };
    } else {
      request = {
        ...params,
        offset: String(pagination.offset),
        limit: String(pagination.limit),
      };
    }
    return this._api(baseUrl, HTTP_METHOD.GET, path, request);
  }

  protected parameterSwitcher(
    apiUrl: string,
    indicator?: string,
    paramater?: any
  ) {
    if (!indicator) return apiUrl;
    apiUrl = apiUrl.replace(indicator, paramater);
    console.log("apiUrl", apiUrl);
    return apiUrl;
  }

  protected _api<T>(
    baseUrl: string,
    httpMethod: HTTP_METHOD,
    path: string,
    params?: any,
    body?: any
  ): Promise<AxiosResponse<T>> {
    if (path.indexOf("http") !== 0) {
      path = baseUrl + path;
    }

    // header values
    const headers: any = {
      "Content-type": "application/json",
    };

    // const accessToken = JwtStorageService.getToken();
    //로그인 만들고 토큰 삽입
    const accessToken = "";

    // const sesssion = await getSession();

    if (accessToken) {
      console.log("accessToken", accessToken);
      headers.Authorization = `eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..hw8HZpdkjYhlkj5g.EkTQpdG_qnDZCnsZpC7DvPvnKrRPj_BZv4dM_8EAMjIkeObc09Cua5ho2O9yN0Gi6d3073c1eCMKllNTWJ90UnOoxjgHPQlKzw-7qC38V88.77zo6B_k4AeaZNbRL4bjpA`;
    }

    // exclude empty strings
    if (params) params = this.__excludeNullParam(params);

    console.log(httpMethod, path, params, headers);
    if (httpMethod === HTTP_METHOD.GET) {
      const paramsSerializer = {
        indexes: null, // 콜론 표시 제거
      };
      return axios.get(path, {
        params,
        paramsSerializer,
        headers,
      });
    } else if (httpMethod === HTTP_METHOD.POST) {
      return axios.post(path, params, { headers });
    } else if (httpMethod === HTTP_METHOD.PATCH) {
      return axios.patch(path, params, { headers });
    } else if (httpMethod === HTTP_METHOD.DELETE) {
      return axios.delete(path, { params, headers });
    } else if (httpMethod === HTTP_METHOD.PUT) {
      return axios.put(path, params, { headers });
    } else if (httpMethod === HTTP_METHOD.DELETE_BODY && body) {
      const data = body;
      return axios.delete(path, {
        params,
        headers,
        data,
      });
    }
  }

  private __excludeNullParam(value: any) {
    if (!value) {
      return;
    }
    if (typeof value !== "object") {
      return value;
    }
    Object.keys(value).map((prop) => {
      if (value[prop] === "") {
        delete value[prop];
      }
    });

    return value;
  }
}
