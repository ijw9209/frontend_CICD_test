import {
  API_STATUS_CODE_ENUM,
  API_VERSION,
  HTTP_METHOD,
  ALERT_TYPE_ENUM,
} from "@/common/enums";
import axios, { AxiosResponse } from "axios";
// import JwtStorageService from "@/infrastructure/services/auth/jwt-storage.service";
import { getSession } from "next-auth/react";
import { DomainService } from "./domain";
import { useCommonAlertModalStore } from "@/store/common-alert-modal.store";
import { useRouter } from "next/navigation";
import { AlertProps } from "@/types";

export class BaseService extends DomainService {
  constructor() {
    super();
  }

  protected versionSwitcher(version: API_VERSION) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${version}api/admin`;
  }

  override _api<T>(
    baseUrl: string,
    httpMethod: HTTP_METHOD,
    path: string,
    params?: any
  ): Promise<AxiosResponse<T>> {
    //request intercepter
    axios.interceptors.request.use(
      async (config) => {
        let authorization = config.headers.Authorization;
        const session = await getSession();
        console.log("session", session);
        if (session && session.accessToken) {
          // authorization = authorization.replace("LD1 ", "");
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { response } = error;

        console.log("response", response);
        const { setAlertProps } = useCommonAlertModalStore.getState();
        const alertProps = new AlertProps();

        if (response?.status === API_STATUS_CODE_ENUM.STATUS_400) {
          setAlertProps(alertProps);
          ///...
        } else if (response?.status === API_STATUS_CODE_ENUM.STATUS_401) {
          alertProps.display = true;
          alertProps.message = "로그인이 필요합니다.";
          alertProps.alertType = ALERT_TYPE_ENUM.ALERT;
          alertProps.confirmButtonName = "확인";
          alertProps.callBackUrl = "/";

          setAlertProps(alertProps);
          //....
        } else if (response?.status === API_STATUS_CODE_ENUM.STATUS_500) {
        }

        //에러 처리 요구사항에 따라 다를 듯
        //서비스에서 에러 처리
        // return Promise.reject(error);
        //인터셉터에서 에러 처리
        return;
      }
    );
    return super._api(baseUrl, httpMethod, path, params);
  }
}
