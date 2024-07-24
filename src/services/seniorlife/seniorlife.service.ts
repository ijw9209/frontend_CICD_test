import { BaseService } from "@/core";

import { AxiosResponse } from "axios";
import { API_VERSION, BaseResponse } from "@/common";
import { SeniorlifePostListModel, SeniorlifePostDetailModel } from "@/models";
import { GET_SERVICE } from "@/services/shared/service.endpoint";
import { SeniorlifeSearchReqeustDto, SeniorlifeRequestDetailDto } from "@/dto";

class SeniorlifeService extends BaseService {
  /**
   *
   * GET SERVICE
   */

  /**
   *
   * @param seniorlifeSearchRequestDto
   * @returns SeniorlifePostListModel
   */
  public async findSeniorLife(
    seniorlifeSearchRequestDto: SeniorlifeSearchReqeustDto
  ): Promise<AxiosResponse<BaseResponse<SeniorlifePostListModel>>> {
    return this.get<BaseResponse<SeniorlifePostListModel>>(
      this.versionSwitcher(API_VERSION.NONE),
      this.parameterSwitcher(GET_SERVICE.seniorlife.post),
      seniorlifeSearchRequestDto
    );
  }

  /**
   *
   * @param seniorLifeRequestDetailDto
   *
   * @returns
   */
  public async findSeniorLifeDetail(
    seniorLifeRequestDetailDto: SeniorlifeRequestDetailDto
  ): Promise<AxiosResponse<BaseResponse<SeniorlifePostDetailModel>>> {
    return this.get<BaseResponse<SeniorlifePostDetailModel>>(
      this.versionSwitcher(API_VERSION.NONE),
      this.parameterSwitcher(
        GET_SERVICE.seniorlife.detail,
        ":id",
        seniorLifeRequestDetailDto.id
      )
    );
  }

  /**
   *
   * insert 예시
   * insert form을 맞춰줘야해서 예시만 주석으로 만들어 둠(안돌아가는 코드)
   * 네이밍은 create
   * @param seniorLifeRequestDetailDto
   *
   * @returns
   */
  // public async createSeniorlife(
  //   seniorLifeRequestDetailDto: SeniorlifeRequestDetailDto
  // ): Promise<AxiosResponse<BaseResponse<SeniorlifePostDetailModel>>> {
  //   return this.post<BaseResponse<SeniorlifePostDetailModel>>(
  //     this.versionSwitcher(API_VERSION.NONE),
  //     this.parameterSwitcher(GET_SERVICE.seniorlife.create),
  //     seniorLifeRequestDetailDto
  //   );
  // }

  /**
   * update 예시
   * update form을 맞춰줘야해서 예시만 주석으로 만들어 둠 (안돌아가는 코드)
   * 네이밍은 update
   */
  // public async updateSeniorlife(
  //   seniorLifeRequestDetailDto: SeniorlifeRequestDetailDto
  // ): Promise<AxiosResponse<BaseResponse<SeniorlifePostDetailModel>>> {
  //   return this.post<BaseResponse<SeniorlifePostDetailModel>>(
  //     this.versionSwitcher(API_VERSION.NONE),
  //     this.parameterSwitcher(GET_SERVICE.seniorlife.create),
  //     seniorLifeRequestDetailDto
  //   );
  // }
}

export default new SeniorlifeService();
