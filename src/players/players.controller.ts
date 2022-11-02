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

  public async createOrUpdatePlayerByEmail(
    createPlayerDto: CreatePlayerDto,
    response: Response,
  ): Promise<void> {
    await this.createUpdatePlayerByEmail(createPlayerDto, response);
  }

  public async createOrUpdatePlayerByPhoneNumber(
    createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.createUpdatePlayerByPhoneNumber(createPlayerDto);
  }

  public async deleteByEmail(email: string): Promise<void> {
    await this.deletePlayerByEmail(email);
  }

  public async deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await this.deletePlayerByPhoneNumber(phoneNumber);
  }

  public async deleteByName(name: string): Promise<void> {
    await this.deletePlayersByName(name);
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

  @Get('name')
  private async getPlayerByName(
    @Query('name') name: string,
  ): Promise<Player[]> {
    return await this.playersService.viewPlayerByName(name);
  }

  @Post('email')
  private async createUpdatePlayerByEmail(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const request = await this.playersService.createOrUpdatePlayerByEmail(
      createPlayerDto,
    );
    if (request)
      return res
        .status(HttpStatus.CREATED)
        .send({ status: 201, message: 'success' });
  }

  @Post('phone')
  private async createUpdatePlayerByPhoneNumber(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.playersService.createOrUpdatePlayerByPhoneNumber(
      createPlayerDto,
    );
  }

  @Delete('email')
  private async deletePlayerByEmail(
    @Query('email', PlayersValidationParametersPipe) email: string,
  ): Promise<void> {
    this.playersService.deletePlayerByEmail(email);
  }

  @Delete('phoneNumber')
  private async deletePlayerByPhoneNumber(
    @Query('phone') phoneNumber: string,
  ): Promise<void> {
    this.playersService.deletePlayerByPhoneNumber(phoneNumber);
  }

  @Delete('name')
  private async deletePlayersByName(
    @Query('name') name: string,
  ): Promise<void> {
    this.playersService.deletePlayerByName(name);
  }
}
