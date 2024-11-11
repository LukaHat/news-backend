export enum StatusCodes {
  OK = 200,
  Created = 201,
  Accepted = 202,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export interface GlobalError extends Error {
  statusCode?: StatusCodes;
  message: string;
}
