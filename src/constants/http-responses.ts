import { HttpStatus } from '@nestjs/common';
import { IResponseMessage } from 'src/interfaces/http-response.interface';

export const responseHttpErrorMessage: IResponseMessage = {
  [HttpStatus.BAD_REQUEST]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: ['Request is inválid'],
    error: 'Bad Request'
  },
  [HttpStatus.NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: ['Resource not found'],
    error: 'Not found'
  },
  [HttpStatus.UNAUTHORIZED]: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: ['Inválid credentials'],
    error: 'Unauthorized'
  },
  [HttpStatus.FORBIDDEN]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: ['Not authorized'],
    error: 'Unauthorized'
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ['Unexpected error'],
    error: 'Internal server error'
  },
  [HttpStatus.REQUEST_TIMEOUT]: {
    statusCode: HttpStatus.REQUEST_TIMEOUT,
    message: ['Request timeout'],
    error: 'Request timeout'
  }
};
