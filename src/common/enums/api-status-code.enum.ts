export enum API_STATUS_CODE_ENUM {
  STATUS_200 = 200, //OK
  STATUS_201 = 201, //Created
  STATUS_202 = 202, //Accepted
  STATUS_204 = 204, //No Content
  STATUS_400 = 400, //Bad Request
  STATUS_401 = 401, //Unauthorized
  STATUS_403 = 403, //Forbidden
  STATUS_404 = 404, //Not Found
  STAUTS_405 = 405, //Method Not Allowd
  STAUTS_409 = 409, //Conflict
  STATUS_429 = 429, //Too many Requests
  STATUS_500 = 500, //ServerErrors
  STATUS_502 = 502, //ServerErrors
  STATUS_503 = 503, //ServerErrors
}

export const CONST_API_STATUS_CODE = Object.values(API_STATUS_CODE_ENUM);
