import { BaseDto } from "@/core";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthRequestDto extends BaseDto {
  @IsString()
  @IsNotEmpty({
    message: "아이디를 입력해주세요.",
  })
  username: string;

  @IsNotEmpty({
    message: "비밀번호를 입력해주세요.",
  })
  password: string;

  @IsBoolean()
  redirect: boolean = false;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean = false;
}
