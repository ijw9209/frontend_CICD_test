import { BaseDto } from "@/core";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class AuthRequestDto extends BaseDto {
  @IsNotEmpty({
    message: "아이디를 입력해주세요.",
  })
  idHpNo: string;

  @IsNotEmpty({
    message: "비밀번호를 입력해주세요.",
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean = false;
}
