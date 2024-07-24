import { BaseService } from "@/core";

class AuthService extends BaseService {
  JWT_TOKEN_NAME = "righthands_jwt_token";

  //일단 세션 스토리지
  getToken(): string {
    return sessionStorage.getItem(this.JWT_TOKEN_NAME);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.JWT_TOKEN_NAME, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.JWT_TOKEN_NAME);
  }
}

export default new AuthService();
