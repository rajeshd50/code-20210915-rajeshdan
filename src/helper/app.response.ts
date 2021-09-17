import { HttpStatus } from "@nestjs/common";

export interface AppResponseType {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
  statusCode: number
}

export const AppResponseSuccess = (
  message = 'Response',
  data = null,
  status = HttpStatus.OK,
): AppResponseType => {
  return {
    success: true,
    message,
    data,
    statusCode: status
  }
}

export const AppResponseError = (
  message = 'Response',
  data = null,
  status = HttpStatus.INTERNAL_SERVER_ERROR,
): AppResponseType => {
  return {
    success: false,
    message,
    error: data,
    statusCode: status
  }
}

export const FunctionSuccess = (message = 'Success', data = null, statusCode = 0): AppResponseType => {
  return {
    success: true,
    message,
    error: null,
    data,
    statusCode,
  }
}

export const FunctionError = (message = 'Error', error = null, statusCode = -1): AppResponseType => {
  return {
    success: false,
    message,
    error,
    data: null,
    statusCode,
  }
}