import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';
import { PlayerSchema } from './interfaces/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

const mockPlayersModel = () => ({
  // TODO: mock players model.
});

describe('PlayersController', () => {
  let playersService: PlayersService;
  let playersController: PlayersController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        PlayersService,
        { provide: PlayersService, useFactory: mockPlayersModel },
      ],
    }).compile();
    playersService = module.get<PlayersService>(PlayersService);
    playersController = module.get<PlayersController>(PlayersController);
  });

  it('should be defined', () => {
    expect(playersService).toBeDefined();
    expect(playersController).toBeDefined();
  });

  describe('viewPlayerByEmail', () => {
    it('calls PlayersController.viewPlayerByEmail and returns the result', async () => {
      // TODO: tests.
    });
  });
});
