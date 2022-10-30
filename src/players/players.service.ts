import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersServiceLogger } from './logs/players-service.logger';
import { PlayersServiceVerbose } from './logs/players-service.verbose';

@Injectable()
export class PlayersService { 

    private readonly logger = new Logger('PlayersService.name');
    private readonly playersServiceLogger = new PlayersServiceLogger();
    private readonly playersServiceVerboser = new PlayersServiceVerbose();

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    public async viewPlayers(): Promise<Player[]> {
        const playersFound = await this.getAllPlayers();
        return playersFound;
    }

    public async viewPlayerById(_id: string): Promise<Player> {
        const playerFound = await this.getPlayerById(_id);
        return playerFound;
    }

    public async viewPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.getPlayerByEmail(email);
        return playerFound;
    }

    public async viewPlayerByPhoneNumber(phoneNumber: string): Promise<Player> {
        const playerFound = await this.getPlayerByPhoneNumber(phoneNumber);
        return playerFound;
    }

    // TODO: implement viewPlayerBy: name, ranking, rankingPosition, photoUrlPlayer.

    public async createOrUpdatePlayerByEmail(createPlayerDto: CreatePlayerDto): Promise<void> {
        await this.createUpdatePlayerByEmail(createPlayerDto);
    }

    public async createOrUpdatePlayerByPhoneNumber(createPlayerDto: CreatePlayerDto): Promise<void> {
        this.createUpdatePlayerByPhoneNumber(createPlayerDto);
    }

    public async updatePlayerPhoto(createPlayerDto: CreatePlayerDto): Promise<void> {
        await this.updatePlayerPhotoUrl(createPlayerDto);
    }

    public async deletePlayerById(_id: string): Promise<void> {
        this.deleteOneById(_id);
    }

    public async deletePlayerByEmail(email: string): Promise<void> {
        this.deleteOneByEmail(email);
    }

    public async deletePlayerByPhoneNumber(phoneNumber: string): Promise<void> {
        this.deleteOneByPhoneNumber(phoneNumber);
    }

    public async deletePlayerByName(name: string): Promise<void> {
        this.deleteManyByName(name);
    }

    public async deletePlayerByRanking(ranking: string): Promise<void> {
        this.deleteManyByRanking(ranking);
    }

    public async deletePlayerByRankingPosition(rankingPosition: number): Promise<void> {
        this.deleteManyByRankingPosition(rankingPosition);
    }

    private async getAllPlayers(): Promise<Player[]> {
        this.playersServiceLogger.viewAllPlayersLogger();
        this.playersServiceVerboser.viewAllPlayersVerboser();
        return await this.playerModel.find().exec();
    }

    private async getPlayerById(_id: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ _id }).exec();
        if (!playerFound) {
            throw new NotFoundException(`Player with _id ${ _id } not found.`);
        }

        this.playersServiceLogger.viewPlayerByIdLogger();
        this.playersServiceVerboser.viewPlayerByIdVerboser(_id);
        return playerFound;
    }

    private async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (!playerFound) {
            throw new NotFoundException(`Player with email ${ email } not found.`);
        }

        this.playersServiceLogger.viewPlayerByEmailLogger();
        this.playersServiceVerboser.viewPlayerByEmailVerboser(email);
        return playerFound;
    }

    private async getPlayerByPhoneNumber(phoneNumber: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ phoneNumber }).exec();
        if (!playerFound) {
            throw new NotFoundException(`Player with phoneNumber ${ phoneNumber } not found.`);
        }

        this.logger.log('GET getPlayerByPhoneNumber with phoneNumber.');
        this.logger.verbose(`Getting player with phoneNumber: ${ phoneNumber }`);
        return playerFound;
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const playerCreated = new this.playerModel(createPlayerDto);
        this.logger.log('POST create.');
        this.logger.verbose(`Creating player ${ playerCreated }`);
        return await playerCreated.save();
    }

    private async createUpdatePlayerByEmail(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (playerFound) {
            this.logger.log('UPDATE createUpdatePlayerByEmail.');
            this.logger.verbose(`Updating player ${ playerFound }`);
            await this.updateByEmail(createPlayerDto); 
        } else {
            this.logger.log('POST createUpdatePlayerByEmail.');
            this.logger.verbose(`Creating player ${ playerFound }`);
            await this.create(createPlayerDto);
        }
    }

    private async createUpdatePlayerByPhoneNumber(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { phoneNumber } = createPlayerDto;
        const playerFound = await this.playerModel.findOne({ phoneNumber }).exec();
        if (playerFound) {
            this.logger.log('UPDATE createUpdatePlayerByPhoneNumber.');
            this.logger.verbose(`Updating player ${ playerFound }`);
            await this.updateByPhoneNumber(createPlayerDto);
        } else {
            this.logger.log('POST createUpdatePlayerByPhoneNumber.');
            this.logger.verbose(`Creating player ${ playerFound }`);
            await this.create(createPlayerDto);
        }
    }

    private async updatePlayerPhotoUrl(createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({});
    }

    private async updateByEmail(createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({ email: createPlayerDto.email}, { $set: createPlayerDto }).exec();
    }

    private async updateByPhoneNumber(createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({ phoneNumber: createPlayerDto.phoneNumber}, { $set: createPlayerDto }).exec();
    }

    private async deleteOneById(_id: string): Promise<any> {
        return await this.playerModel.deleteOne({ _id }).exec();
    }

    private async deleteOneByEmail(email: string): Promise<any> {
        return await this.playerModel.deleteOne({ email }).exec();
    }

    private async deleteOneByPhoneNumber(phoneNumber: string): Promise<any> {
        return await this.playerModel.deleteOne({ phoneNumber }).exec();
    }

    private async deleteManyByName(name: string): Promise<any> {
        return await this.playerModel.deleteMany({ name }).exec();
    }

    private async deleteManyByRanking(ranking: string): Promise<any> {
        return await this.playerModel.deleteMany({ ranking }).exec();
    }

    private async deleteManyByRankingPosition(rankingPosition: number): Promise<any> {
        return await this.playerModel.deleteMany({ rankingPosition }).exec();
    }
}
