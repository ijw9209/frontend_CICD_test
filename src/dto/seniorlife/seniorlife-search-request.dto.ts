import { YN_ENUM } from "@/common";
import { BaseDto } from "@/core";
import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";

export type YNType = YN_ENUM.Y | YN_ENUM.N;

export class SeniorlifeSearchReqeustDto extends BaseDto {
  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  categoryId: string = "";
  @IsString()
  @IsOptional()
  delYn: string = "";

  @IsEnum(YN_ENUM)
  @IsOptional()
  userDisplayYn: YNType;
  @IsEnum(YN_ENUM)
  @IsOptional()
  partnerDisplayYn: YNType;
  @IsEnum(YN_ENUM)
  @IsOptional()
  caregiverDisplayYn: YNType;
}
