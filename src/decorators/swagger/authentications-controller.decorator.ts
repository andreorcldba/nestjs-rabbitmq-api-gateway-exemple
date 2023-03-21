import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBody
} from '@nestjs/swagger';
import { badRequestErrorSwagger, unauthorizedErrorSwagger, internalServerErrorSwagger } from 'src/constants/swagger';
import { LogInDto } from 'src/swagger/tags/authentications/log-in.dto';

export function SwaggerLogIn() {
  return applyDecorators(
    ApiBody({ type: LogInDto }),
    ApiBadRequestResponse(badRequestErrorSwagger),
    ApiUnauthorizedResponse(unauthorizedErrorSwagger),
    ApiInternalServerErrorResponse(internalServerErrorSwagger)
  );
}
