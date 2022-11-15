import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
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

  public async players(): Promise<Player | Player[]> {
    return await this.getAllPlayers();
  }

  public async playerById(_id: string): Promise<Player> {
    return await this.getPlayerById(_id);
  }

  public async playerByEmail(email: string): Promise<Player> {
    return await this.getPlayerByEmail(email);
  }

  public async playerByPhoneNumber(phoneNumber: string): Promise<Player> {
    return await this.getPlayerByPhoneNumber(phoneNumber);
  }

  public async playerByName(name: string): Promise<Player[]> {
    return await this.getPlayerByName(name);
  }

  public async playerByRanking(ranking: string): Promise<Player[]> {
    return await this.getPlayerByRanking(ranking);
  }

  public async createPlayer(
    createPlayerDto: CreatePlayerDto,
    res: Response,
  ): Promise<Response> {
    return await this.create(createPlayerDto, res);
  }

  public async updatePlayerByEmail(
    createPlayerDto: CreatePlayerDto,
    res: Response,
  ): Promise<Response> {
    return await this.updateByEmail(createPlayerDto, res);
  }

  public async updatePlayerByPhoneNumber(
    createPlayerDto: CreatePlayerDto,
    res: Response,
  ): Promise<Response> {
    return await this.updateByPhoneNumber(createPlayerDto, res);
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
  private async getAllPlayers(): Promise<Player | Player[]> {
    return await this.playersService.viewPlayers();
  }

  @Get('/:id')
  private async getPlayerById(@Param('id') id: string): Promise<Player> {
    return await this.playersService.viewPlayerById(id);
  }

  @Get('/:email')
  private async getPlayerByEmail(
    @Param('email') email: string,
  ): Promise<Player> {
    return await this.playersService.viewPlayerByEmail(email);
  }

  @Get('/:phone')
  private async getPlayerByPhoneNumber(
    @Param('phone') phoneNumber: string,
  ): Promise<Player> {
    return await this.playersService.viewPlayerByPhoneNumber(phoneNumber);
  }

  @Get('/:name')
  private async getPlayerByName(
    @Param('name') name: string,
  ): Promise<Player[]> {
    return await this.playersService.viewPlayerByName(name);
  }

  @Get('/:ranking')
  private async getPlayerByRanking(
    @Param('ranking') ranking: string,
  ): Promise<Player[]> {
    return await this.playersService.viewPlayerByRanking(ranking);
  }

  @Get('/:rankingPosition')
  private async getPlayerByRankingPosition(
    @Param('rankingPosition') rankingPosition: number,
  ): Promise<Player> {
    return await this.playersService.viewPlayerByRankingPosition(
      rankingPosition,
    );
  }

  @Post('player')
  private async create(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    @Res() response: Response,
  ): Promise<Response> {
    const created = await this.playersService.createPlayer(createPlayerDto);
    if (created)
      return response.status(HttpStatus.CREATED).send({ status: 201 });
  }

  @Post('/email')
  private async updateByEmail(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const updated = await this.playersService.updatePlayerEmail(
      createPlayerDto,
    );
    if (updated) return res.status(HttpStatus.CREATED).send({ status: 200 });
  }

  @Post('/phoneNumber')
  private async updateByPhoneNumber(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    res: Response,
  ): Promise<Response> {
    const updated = await this.playersService.updatePlayerPhoneNumber(
      createPlayerDto,
    );
    if (updated) return res.status(HttpStatus.CREATED).send({ status: 200 });
  }

  @Post('photo')
  private async updatePlayerPhoto(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.playersService.updatePlayerPhoto(createPlayerDto);
  }

  @Delete('/:email')
  private async deletePlayerByEmail(
    @Param('email', PlayersValidationParametersPipe) email: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByEmail(
      email,
    );
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }

  @Delete('/:phoneNumber')
  private async deletePlayerByPhoneNumber(
    @Param('phone') phoneNumber: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByPhoneNumber(
      phoneNumber,
    );
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }

  @Delete('/:name')
  private async deletePlayersByName(
    @Param('name') name: string,
    @Res() response: Response,
  ): Promise<Response> {
    const isPlayerDeleted = await this.playersService.deletePlayerByName(name);
    if (!isPlayerDeleted)
      return response.status(HttpStatus.ACCEPTED).send({ status: 200 });
  }
}
