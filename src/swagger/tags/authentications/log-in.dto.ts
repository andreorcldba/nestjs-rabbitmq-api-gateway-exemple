import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({
    description: 'User login',
    example: 'xxxx@xxxxx.xx',
    required: true
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '99999999',
    required: true
  })
  password: string;
}
