import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller.js';
import { AdminsService } from './admins.service.js';

describe('AdminsController', () => {
  let controller: AdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [AdminsService],
    }).compile();

    controller = module.get<AdminsController>(AdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
