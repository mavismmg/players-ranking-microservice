import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
import { PlayersService } from './players.service';
import { Response } from 'express';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  public async playersOrPlayerWithAttribute(): Promise<Player | Player[]> {
    return await this.getPlayersOrPlayerWithAttribute();
  }

  public async playerByName(name: string): Promise<Player[]> {
    return await this.getPlayerByName(name);
  }

  public async playerByRanking(ranking: string): Promise<Player[]> {
    return await this.getPlayerByRanking(ranking);
  }

  public async createOrUpdatePlayerByEmail(
    createPlayerDto: CreatePlayerDto,
    response: Response,
  ): Promise<Response> {
    return await this.createUpdatePlayerByEmail(createPlayerDto, response);
  }

  public async createOrUpdatePlayerByPhoneNumber(
    createPlayerDto: CreatePlayerDto,
    respose: Response,
  ): Promise<Response> {
    return await this.createUpdatePlayerByPhoneNumber(createPlayerDto, respose);
  }

  public async deleteByEmail(
    email: string,
    response: Response,
  ): Promise<Response> {
    return await this.deletePlayerByEmail(email, response);
  }

  public async deleteByPhoneNumber(
    phoneNumber: string,
    response: Response,
  ): Promise<any> {
    return await this.deletePlayerByPhoneNumber(phoneNumber, response);
  }

  public async deleteByName(name: string, response: Response): Promise<any> {
    return await this.deletePlayersByName(name, response);
  }

  @Get()
  private async getPlayersOrPlayerWithAttribute(
    @Query('email') email?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ): Promise<Player | Player[]> {
    if (email) {
      return await this.playersService.viewPlayerByEmail(email);
    } else if (phoneNumber) {
      return await this.playersService.viewPlayerByPhoneNumber(phoneNumber);
    } else {
      return await this.playersService.viewPlayers();
    }
  }

  @Get('id')
  private async getPlayerById(@Query('id') id: string): Promise<Player> {
    return await this.playersService.viewPlayerById(id);
  }

  @Get('name')
  private async getPlayerByName(
    @Query('name') name: string,
  ): Promise<Player[]> {
    return await this.playersService.viewPlayerByName(name);
  }

  @Get('ranking')
  private async getPlayerByRanking(
    @Query('ranking') ranking: string,
  ): Promise<Player[]> {
    return await this.playersService.viewPlayerByRanking(ranking);
  }

  @Get('rankingPosition')
  private async getPlayerByRankingPosition(
    @Query('rankingPosition') rankingPosition: number,
  ): Promise<Player> {
    return await this.playersService.viewPlayerByRankingPosition(
      rankingPosition,
    );
  }

  @Post('email')
  private async createUpdatePlayerByEmail(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerCreated =
      await this.playersService.createOrUpdatePlayerByEmail(createPlayerDto);
    if (isPlayerCreated)
      return response.status(HttpStatus.CREATED).send({ status: 201 });
  }

  @Post('phone')
  private async createUpdatePlayerByPhoneNumber(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerCreated =
      await this.playersService.createOrUpdatePlayerByPhoneNumber(
        createPlayerDto,
      );
    if (isPlayerCreated)
      return response.status(HttpStatus.CREATED).send({ status: 201 });
  }

  @Post('photo')
  private async updatePlayerPhoto(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.playersService.updatePlayerPhoto(createPlayerDto);
  }

  @Delete('email')
  private async deletePlayerByEmail(
    @Query('email', PlayersValidationParametersPipe) email: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByEmail(
      email,
    );
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }

  @Delete('phoneNumber')
  private async deletePlayerByPhoneNumber(
    @Query('phone') phoneNumber: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByPhoneNumber(
      phoneNumber,
    );
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }

  @Delete('name')
  private async deletePlayersByName(
    @Query('name') name: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByName(name);
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }
}
