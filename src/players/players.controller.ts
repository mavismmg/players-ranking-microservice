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
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getAllPlayers();
        }
    }

    @Post()
    public async createUpdatePlayer(@Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Delete()
    public async deletePlayer(@Query('email', PlayersValidationParametersPipe) email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
