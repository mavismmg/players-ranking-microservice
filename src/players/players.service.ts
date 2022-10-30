import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService { 

    private readonly logger = new Logger('PlayersService.name');
    private players: Player[] = [];

    public async getAllPlayers(): Promise<Player[]> {
        return this.players;
    }

    public async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = this.players.find(player => player.email === email);
        if (!playerFound) {
            throw new NotFoundException(`Player with email ${ email } not found.`);
        }

        return playerFound;
    }

    public async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        const playerFound = this.players.find(player => player.email === email);
        if (playerFound) {
            return await this.update(playerFound, createPlayerDto);
        }

        await this.create(createPlayerDto);
    }

    public async deletePlayer(email: string): Promise<void> {
        this.delete(email);
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { name, phoneNumber, email } = createPlayerDto;
        const player: Player = {
            _id: uuid(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            photoUrlPlayer: 'photo_url'
        };

        this.logger.log(`createPlayerDto: ${ JSON.stringify(player) }`);
        this.players.push(player);
    }

    private async update(playerFound: Player, createPlayerDto: CreatePlayerDto): Promise<void> {
        const { name } = createPlayerDto;
        playerFound.name = name;
    }

    private async delete(email: string): Promise<void> {
        const playerFound = this.players.find(player => player.email === email);
        this.players = this.players.filter(player => player.email !== playerFound.email);
    }
}
