export class BaseResponse<T> {
  constructor(data?: any) {
    this.data = data;
  }
  status: string;
  data: T;
  error: T;
}
