import { BaseModel } from "@/core/base.model";

export class ProteectedModel extends BaseModel<ProteectedModel> {
  message: string;
  userId: string;
}
