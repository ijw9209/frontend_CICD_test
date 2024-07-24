import { BaseDto } from "@/core";
import { IsNotEmpty } from "class-validator";

export class SeniorlifeRequestDetailDto extends BaseDto {
  @IsNotEmpty()
  id: string;
}
