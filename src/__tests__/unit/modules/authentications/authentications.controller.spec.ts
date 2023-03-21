import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationsController } from 'src/modules/authentications/authentications.controller';
import { AuthenticationsService } from 'src/modules/authentications/authentications.service';

describe('AuthenticationsController', () => {
  let controller: AuthenticationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationsController],
      providers: [AuthenticationsService]
    }).compile();

    controller = module.get<AuthenticationsController>(AuthenticationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
