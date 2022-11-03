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
  viewPlayerByName: jest.fn(),
  viewPlayerByRanking: jest.fn(),
  createOrUpdatePlayerByEmail: jest.fn(),
  createOrUpdatePlayerByPhoneNumber: jest.fn(),
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

  describe('playersOrPlayerWithAttribute', () => {
    it('calls PlayersController.playersOrPlayerWithAttribute and returns a player or a list of players', async () => {
      playersModel.viewPlayers.mockResolvedValue('attribute');
      const resultWithQueryParam =
        await playersController.playersOrPlayerWithAttribute();
      expect(resultWithQueryParam).toEqual('attribute');
      playersModel.viewPlayers.mockResolvedValue([]);
      const resultWithoutQueryParam =
        await playersController.playersOrPlayerWithAttribute();
      expect(resultWithoutQueryParam).toEqual([]);
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

  describe('createOrUpdatePlayerByEmail', () => {
    it('calls PlayersController.createOrUpdatePlayerByEmail and should return a status code 201', async () => {
      playersModel.createOrUpdatePlayerByEmail.mockResolvedValue(mockPlayer);
      const result = await playersController.createOrUpdatePlayerByEmail(
        mockPlayer,
        responseMock,
      );
      expect(result.status).toEqual(201);
    });
  });

  describe('createOrUpdatePlayerByPhoneNumber', () => {
    it('calls PlayersController.createOrUpdatePlayerByPhoneNumber and should return a status code 201', async () => {
      playersModel.createOrUpdatePlayerByPhoneNumber.mockResolvedValue(
        mockPlayer,
      );
      const result = await playersController.createOrUpdatePlayerByPhoneNumber(
        mockPlayer,
        responseMock,
      );
      expect(result.status).toEqual(201);
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
