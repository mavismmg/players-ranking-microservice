import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersServiceLogger } from './logs/players-service.logger';
import { PlayersServiceVerbose } from './logs/players-service.verbose';
import { PlayersServiceException } from './exceptions/players-service.exception';
import { PlayersServiceError } from './logs/players-service.error';

@Injectable()
export class PlayersService { 

    private readonly playersServiceLogger = new PlayersServiceLogger();
    private readonly playersServiceVerboser = new PlayersServiceVerbose();
    private readonly playersServiceError = new PlayersServiceError();
    private readonly playersServiceException = new PlayersServiceException();

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
            this.playersServiceError.getNotFoundExceptionError(_id);
            throw this.playersServiceException.getNotFoundException(_id); 
        }

        this.playersServiceLogger.viewPlayerByAttributeLogger(_id);
        this.playersServiceVerboser.viewPlayerByAttributeVerboser(_id);
        return playerFound;
    }

    private async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (!playerFound) {
            this.playersServiceError.getNotFoundExceptionError(email);
            throw this.playersServiceException.getNotFoundException(email);
        }

        this.playersServiceLogger.viewPlayerByAttributeLogger(email);
        this.playersServiceVerboser.viewPlayerByAttributeVerboser(email);
        return playerFound;
    }

    private async getPlayerByPhoneNumber(phoneNumber: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({ phoneNumber }).exec();
        if (!playerFound) {
            this.playersServiceError.getNotFoundExceptionError(phoneNumber);
            throw this.playersServiceException.getNotFoundException(phoneNumber);
        }

        this.playersServiceLogger.viewPlayerByAttributeLogger(phoneNumber);
        this.playersServiceVerboser.viewPlayerByAttributeVerboser(phoneNumber);
        return playerFound;
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const playerCreated = new this.playerModel(createPlayerDto);
        this.playersServiceLogger.viewCreatePlayerLogger();
        this.playersServiceVerboser.viewCreateVerboser(playerCreated);
        return await playerCreated.save();
    }

    private async createUpdatePlayerByEmail(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        const playerFound = await this.playerModel.findOne({ email }).exec();
        if (playerFound) {
            this.playersServiceLogger.viewUpdatePlayerByAttributeLogger(email);
            this.playersServiceVerboser.viewUpdateVeboser(email);
            await this.updateByEmail(createPlayerDto); 
        } else {
            this.playersServiceLogger.viewCreatePlayerLogger();
            this.playersServiceVerboser.viewCreateVerboser(playerFound);
            await this.create(createPlayerDto);
        }
    }

    private async createUpdatePlayerByPhoneNumber(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { phoneNumber } = createPlayerDto;
        const playerFound = await this.playerModel.findOne({ phoneNumber }).exec();
        if (playerFound) {
            this.playersServiceLogger.viewUpdatePlayerByAttributeLogger(phoneNumber);
            this.playersServiceVerboser.viewUpdateVeboser(phoneNumber);
            await this.updateByPhoneNumber(createPlayerDto);
        } else {
            this.playersServiceLogger.viewCreatePlayerLogger();
            this.playersServiceVerboser.viewCreateVerboser(playerFound);
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
        this.playersServiceLogger.viewDeleteOneByAttributeLogger(email);
        this.playersServiceVerboser.viewDeleteByAttributeVerboser(email);
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
