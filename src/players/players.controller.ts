import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    async getAllPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers()
    }

    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }
}
