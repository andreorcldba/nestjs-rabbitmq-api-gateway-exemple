import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DefaultResponse } from 'src/swagger/default-response';

export function SwaggerDecorator() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: DefaultResponse
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: DefaultResponse
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: DefaultResponse
    })
  );
}

export function BadRequestAndInternalServerErrorSwagger() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request',
      type: DefaultResponse
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: DefaultResponse
    })
  );
}
