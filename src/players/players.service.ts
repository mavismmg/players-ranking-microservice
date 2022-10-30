import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService { 
    private readonly logger = new Logger('PlayersService.name');
    private players: Player[] = [];

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        await this.create(createPlayerDto);
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const { name, phoneNumber, email } = createPlayerDto;
        const player: Player = {
            _id: uuid(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            photoUrlPlayer: 'www.google.com.br/foto123.jpg'
        };

        this.logger.log(`createPlayerDto: ${ JSON.stringify(player) }`);
        this.players.push(player);
    }
}
