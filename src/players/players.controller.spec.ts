import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Response } from 'express';

const mockPlayersModel = () => ({
  viewPlayers: jest.fn(),
  viewPlayerByName: jest.fn(),
  createOrUpdatePlayerByEmail: jest.fn(),
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
  status: jest.fn((x) => statusResponseMock),
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
    it('calls PlayersController.playerByName and returns a player by name', async () => {
      playersModel.viewPlayerByName.mockResolvedValue('name');
      const result = await playersController.playerByName(null);
      expect(result).toEqual('name');
    });
  });

  describe('createOrUpdatePlayerByEmail', () => {
    it('calls PlayersController.createOrUpdatePlayerByEmail and returns a created or updated player', async () => {
      //
    });
  });
});
