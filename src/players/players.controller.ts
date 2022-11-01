import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  private async getAllPlayers(
    @Query('email', PlayersValidationParametersPipe) email: string,
  ): Promise<Player | Player[]> {
    if (email) {
      return await this.playersService.viewPlayerByEmail(email);
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
  ) {
    await this.playersService.createOrUpdatePlayerByEmail(createPlayerDto);
  }

  @Post('phone')
  private async createUpdatePlayerByPhoneNumber(
    @Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto,
  ) {
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
  private async deletePlayerByName(@Query('name') name: string): Promise<void> {
    this.playersService.deletePlayerByName(name);
  }
}
