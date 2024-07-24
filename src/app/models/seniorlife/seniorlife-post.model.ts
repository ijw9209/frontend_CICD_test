import { BaseModel } from "@/core/base.model";

export class SeniorlifePostModel extends BaseModel<SeniorlifePostModel> {
  caregiverDisplayYn: string;
  categoryIdx: number = 0;
  categoryName: string;
  coverLinkUrl: string;
  delYn: string;
  id: number;
  kakaoShareCount: number;
  likeCnt: number;
  linkShareCount: number;
  newCategoryName: string;
  partnerDisplayYn: string;
  postEndDate: string;
  postStartDate: string;
  replyCnt: number;
  reportCount: number;
  thumbnailLinkUrl: string;
  title: string;
  userDisplayYn: string;

  description?: string;
}
