import { Test } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Response } from 'express';

const mockPlayersModel = () => ({
  // Should be defined, used by services.
  viewPlayers: jest.fn(),
  deletePlayerByEmail: jest.fn(),
  deletePlayerByPhoneNumber: jest.fn(),
  deletePlayerByName: jest.fn(),
  // Should be defined, used by controller.
  viewPlayerById: jest.fn(),
  viewPlayerByEmail: jest.fn(),
  viewPlayerByPhoneNumber: jest.fn(),
  viewPlayerByName: jest.fn(),
  viewPlayerByRanking: jest.fn(),
  createPlayer: jest.fn(),
  updatePlayerEmail: jest.fn(),
  updatePlayerPhoneNumber: jest.fn(),
  deleteByEmail: jest.fn(),
  deleteByPhoneNumber: jest.fn(),
  deleteByName: jest.fn(),
});

const mockPlayer = {
  phoneNumber: 'somePhoneNumber',
  email: 'test@mail.com',
  name: 'test',
};

const statusResponseMock = {
  send: jest.fn((x) => x),
};

const responseMock = {
  status: jest.fn(() => statusResponseMock),
  send: jest.fn((x) => x),
} as unknown as Response;

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersModel: any;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        PlayersService,
        { provide: PlayersService, useFactory: mockPlayersModel },
      ],
    }).compile();
    playersController = module.get<PlayersController>(PlayersController);
    playersModel = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersModel).toBeDefined();
    expect(playersController).toBeDefined();
  });

  describe('players', () => {
    it('calls PlayersController.players and returns a list of players', async () => {
      playersModel.viewPlayers.mockResolvedValue('attribute');
      const result = await playersController.players();
      expect(result).toEqual('attribute');
    });
  });

  describe('playerById', () => {
    it('calls PlayersController.playerById and return the player by id', async () => {
      playersModel.viewPlayerById.mockResolvedValue('someId');
      const result = await playersController.playerById(null);
      expect(result).toEqual('someId');
    });
  });

  describe('playerByEmail', () => {
    it('calls PlayersController.playerByEmail and return the player by email', async () => {
      playersModel.viewPlayerByEmail.mockResolvedValue('someEmail');
      const result = await playersController.playerByEmail(null);
      expect(result).toEqual('someEmail');
    });
  });

  describe('playerByPhoneNumber', () => {
    it('calls PlayersController.playerByPhoneNumber and return the player by phoneNumber', async () => {
      playersModel.viewPlayerByPhoneNumber.mockResolvedValue('somePhoneNumber');
      const result = await playersController.playerByPhoneNumber(null);
      expect(result).toEqual('somePhoneNumber');
    });
  });

  describe('playerByName', () => {
    it('calls PlayersController.playerByName and returns a object list of players by name', async () => {
      playersModel.viewPlayerByName.mockResolvedValue('name');
      const result = await playersController.playerByName(null);
      expect(result).toEqual('name');
    });
  });

  describe('playerByRanking', () => {
    it('calls PlayersController.playerByRanking and returns a object list of players by ranking', async () => {
      playersModel.viewPlayerByRanking.mockResolvedValue('someRank');
      const result = await playersController.playerByRanking(null);
      expect(result).toEqual('someRank');
    });
  });

  describe('createPlayer', () => {
    it('calls PlayersController.createPlayer and should return a status code 201', async () => {
      playersModel.createPlayer.mockResolvedValue(mockPlayer);
      const result = await playersController.createPlayer(
        mockPlayer,
        responseMock,
      );
      expect(result.status).toEqual(201);
    });
  });

  describe('updatePlayerByEmail', () => {
    it('calls PlayersController.updateByEmail and should return a status code 200', async () => {
      playersModel.updatePlayerEmail.mockResolvedValue(mockPlayer);
      const result = await playersController.updatePlayerByEmail(
        mockPlayer,
        responseMock,
      );
      expect(result.status).toEqual(200);
    });
  });

  describe('updatePlayerByPhoneNumber', () => {
    it('calls PlayersController.updateByPhoneNumber and should return a status code 200', async () => {
      playersModel.updatePlayerPhoneNumber.mockResolvedValue(mockPlayer);
      const result = await playersController.updatePlayerByPhoneNumber(
        mockPlayer,
        responseMock,
      );
      expect(result.status).toEqual(200);
    });
  });

  describe('deleteByEmail', () => {
    it('calls PlayersController.deleteByEmail and should return a status code 200', async () => {
      playersModel.deleteByEmail.mockResolvedValue('test@mail.com');
      const result = await playersController.deleteByEmail(
        'test@mail.com',
        responseMock,
      );
      expect(result.status).toEqual(200);
    });
  });

  describe('deleteByNumber', () => {
    it('calls PlayersController.deleteByEmail and should return a status code 200', async () => {
      playersModel.deleteByPhoneNumber.mockResolvedValue('somePhoneNumber');
      const result = await playersController.deleteByPhoneNumber(
        'somePhoneNumber',
        responseMock,
      );
      expect(result.status).toEqual(200);
    });
  });

  describe('deleteByName', () => {
    it('calls PlayersController.deleteByEmail and should return a status code 200', async () => {
      playersModel.deleteByName.mockResolvedValue('test');
      const result = await playersController.deleteByName('test', responseMock);
      expect(result.status).toEqual(200);
    });
  });
});
