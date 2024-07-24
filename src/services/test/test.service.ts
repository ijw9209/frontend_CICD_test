import { ProteectedModel } from "@/models";
import { API_VERSION, BaseResponse } from "@/common";
import { BaseService } from "@/core";
import { AxiosResponse } from "axios";
import { GET_SERVICE } from "../shared/service.endpoint";

class TestService extends BaseService {
  //GET SERVICE
  /**
   *
   * TEST API
   */
  public async findProtected(): Promise<
    AxiosResponse<BaseResponse<ProteectedModel>>
  > {
    return this.get<BaseResponse<ProteectedModel>>(
      this.versionSwitcher(API_VERSION.NONE),
      this.parameterSwitcher(GET_SERVICE.test.protected),
      null
    );
  }
}

export default new TestService();
