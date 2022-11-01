import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

const mockPlayersModel = () => ({
  viewPlayerByEmail: jest.fn(),
});

describe('PlayersService', () => {
  let playersService: PlayersService;
  let playersController: PlayersController;
  let playersModel: any;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [Model<Player>],
      controllers: [PlayersController],
      providers: [
        PlayersService,
        { provide: Model<Player>, useFactory: mockPlayersModel },
      ],
    }).compile();
    playersService = module.get<PlayersService>(PlayersService);
    playersController = module.get<PlayersController>(PlayersController);
    playersModel = module.get<Model<Player>>(Model<Player>);
  });

  describe('viewPlayerByEmail', () => {
    it('calls PlayersServie.viewPlayerByEmail and returns the result', async () => {
      playersModel.viewPlayerByEmail.mockResolvedValue('test@mail.com');
      const result = await playersService.viewPlayerByEmail('test@mail.com');
      expect(result).toEqual('test@mail.com');
    });
  });
});
