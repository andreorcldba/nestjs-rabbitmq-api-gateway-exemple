import { Test, TestingModule } from '@nestjs/testing';
import { FederalUnitsController } from 'src/modules/federal-units/federal-units.controller';
import { FederalUnitsService } from 'src/modules/federal-units/federal-units.service';


describe('FederalUnitsController', () => {
  let controller: FederalUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FederalUnitsController],
      providers: [FederalUnitsService]
    }).compile();

    controller = module.get<FederalUnitsController>(FederalUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
