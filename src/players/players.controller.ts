import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
    
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    public async getAllPlayers(@Query('email') email: string): Promise<Player | Player[]> {
        if (email) {
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getAllPlayers();
        }
    }

    @Post()
    public async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Delete()
    public async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
