import { Body, Controller, Delete, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    public async getAllPlayers(@Query('email', PlayersValidationParametersPipe) email: string): Promise<Player | Player[]> {
        if (email) {
            return await this.playersService.viewPlayerByEmail(email);
        } else {
            return await this.playersService.viewPlayers();
        }
    }

    @Post()
    public async createUpdatePlayer(@Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto) {
        await this.playersService.createOrUpdatePlayerByEmail(createPlayerDto);
    }

    @Delete()
    public async deletePlayer(@Query('email', PlayersValidationParametersPipe) email: string): Promise<void> {
        this.playersService.deletePlayerByEmail(email);
    }
}
