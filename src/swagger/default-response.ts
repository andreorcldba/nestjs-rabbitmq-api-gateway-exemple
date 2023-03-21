import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse {
  @ApiProperty({
    description: 'Number of status code',
    type: Number
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Error code used to identify where the error occurs',
    type: String
  })
  public error: string;

  @ApiProperty({
    description: 'Error description',
    type: String
  })
  public message: string;
}
