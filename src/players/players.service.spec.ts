import { Test } from '@nestjs/testing';
import { PlayersService } from './players.service';

const mockPlayersModel = () => ({
  viewPlayerByEmail: jest.fn(),
  viewPlayerByPhoneNumber: jest.fn(),
  createPlayer: jest.fn(),
});

const mockPlayer = {
  phoneNumber: 'somePhoneNumber',
  email: 'test@mail.com',
  name: 'test',
};

describe('PlayersService', () => {
  let playersService: PlayersService;
  let playersModel: any;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlayersService,
        { provide: PlayersService, useFactory: mockPlayersModel },
      ],
    }).compile();
    playersService = module.get<PlayersService>(PlayersService);
    playersModel = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersService).toBeDefined();
  });

  describe('viewPlayerByEmail', () => {
    it('calls PlayersServie.viewPlayerByEmail and returns the result', async () => {
      playersModel.viewPlayerByEmail.mockResolvedValue('test@mail.com');
      const result = await playersService.viewPlayerByEmail(null);
      expect(result).toEqual('test@mail.com');
    });
  });

  describe('viewPlayerByPhoneNumber', () => {
    it('calls PlayersServie.viewPlayerByPhoneNumber and returns the result', async () => {
      playersModel.viewPlayerByPhoneNumber.mockResolvedValue('somePhoneNumber');
      const result = await playersService.viewPlayerByPhoneNumber(null);
      expect(result).toEqual('somePhoneNumber');
    });
  });

  describe('createPlayer', () => {
    it('calls PlayersService.createPlayer and returns the result', async () => {
      playersModel.createPlayer.mockResolvedValue('somePlayer');
      const result = await playersService.createPlayer(mockPlayer);
      expect(result).toEqual('somePlayer');
    });
  });
});
