import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService { 

    private readonly logger = new Logger('PlayersService.name');

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    public async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    public async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (!playerFound) {
            throw new NotFoundException(`Player with email ${ email } not found.`);
        }

        return playerFound;
    }

    public async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (playerFound) {
            await this.update(createPlayerDto);
        } else {
            await this.create(createPlayerDto);
        }
    }

    public async deletePlayer(email: string): Promise<void> {
        this.delete(email);
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const playerCreated = new this.playerModel(createPlayerDto);
        return await playerCreated.save();
    }

    private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({ email: createPlayerDto.email}, { $set: createPlayerDto }).exec();
    }

    private async delete(email: string): Promise<any> {
        return await this.playerModel.remove({ email }).exec();
    }
}
