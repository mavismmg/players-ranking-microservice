import { Injectable } from '@nestjs/common';
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

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  public async viewPlayers(): Promise<Player[]> {
    return await this.getAllPlayers();
  }

  public async viewPlayerById(_id: string): Promise<Player> {
    return await this.getPlayerById(_id);
  }

  public async viewPlayerByEmail(email: string): Promise<Player> {
    return await this.getPlayerByEmail(email);
  }

  public async viewPlayerByPhoneNumber(phoneNumber: string): Promise<Player> {
    return await this.getPlayerByPhoneNumber(phoneNumber);
  }

  public async viewPlayerByName(name: string): Promise<Player[]> {
    return await this.getPlayerByName(name);
  }

  public async viewPlayerByRanking(ranking: string): Promise<Player[]> {
    return await this.getPlayerByRanking(ranking);
  }

  public async viewPlayerByRankingPosition(
    rankingPosition: number,
  ): Promise<Player> {
    return await this.getPlayerByRankingPosition(rankingPosition);
  }

  public async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.create(createPlayerDto);
  }

  public async updatePlayerEmail(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.updatePlayerByEmail(createPlayerDto);
  }

  public async updatePlayerPhoneNumber(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.updatePlayerByPhoneNumber(createPlayerDto);
  }

  public async updatePlayerPhoto(
    createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.updatePlayerPhotoUrl(createPlayerDto);
  }

  public async deletePlayerById(_id: string): Promise<void> {
    this.deleteOneById(_id);
  }

  public async deletePlayerByEmail(email: string): Promise<any> {
    return this.deleteOneByEmail(email);
  }

  public async deletePlayerByPhoneNumber(phoneNumber: string): Promise<any> {
    return this.deleteOneByPhoneNumber(phoneNumber);
  }

  public async deletePlayerByName(name: string): Promise<any> {
    return this.deleteManyByName(name);
  }

  public async deletePlayerByRanking(ranking: string): Promise<void> {
    this.deleteManyByRanking(ranking);
  }

  public async deletePlayerByRankingPosition(
    rankingPosition: number,
  ): Promise<void> {
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

  private async getPlayerByName(name: string): Promise<Player[]> {
    // Verify if exists at least one player with this rank.
    const playerFound = await this.playerModel.findOne({ name }).exec();
    // If do not exists throw an exception.
    if (!playerFound) {
      this.playersServiceError.getNotFoundExceptionError(name);
      throw this.playersServiceException.getNotFoundException(name);
    }
    this.playersServiceLogger.viewPlayerByAttributeLogger(name);
    this.playersServiceVerboser.viewPlayerByAttributeVerboser(name);
    return this.playerModel.find({ name }).exec();
  }

  private async getPlayerByRanking(ranking: string): Promise<Player[]> {
    // Verify if exists at least one player with this rank.
    const playerFound = await this.playerModel.findOne({ ranking }).exec();
    // If do not exists throw an exception.
    if (!playerFound) {
      this.playersServiceError.getNotFoundExceptionError(ranking);
      throw this.playersServiceException.getNotFoundException(ranking);
    }
    this.playersServiceLogger.viewPlayerByAttributeLogger(ranking);
    this.playersServiceVerboser.viewPlayerByAttributeVerboser(ranking);
    return this.playerModel.find({ name }).exec();
  }

  private async getPlayerByRankingPosition(
    rankingPosition: number,
  ): Promise<Player> {
    const playerFound = await this.playerModel
      .findOne({ rankingPosition })
      .exec();
    if (!playerFound) {
      this.playersServiceError.getNotFoundExceptionError(rankingPosition);
      throw this.playersServiceException.getNotFoundException(rankingPosition);
    }
    this.playersServiceLogger.viewPlayerByAttributeLogger(rankingPosition);
    this.playersServiceVerboser.viewPlayerByAttributeVerboser(rankingPosition);
    return playerFound;
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);
    this.playersServiceLogger.viewCreatePlayerLogger();
    this.playersServiceVerboser.viewCreateVerboser(playerCreated);
    return await playerCreated.save();
  }

  private async updatePlayerByEmail(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const { email } = createPlayerDto;
    const found = await this.playerModel.findOne({ email }).exec();
    if (found) {
      this.playersServiceVerboser.viewUpdateVeboser(email);
      const updated = await this.playerModel
        .findOneAndUpdate(
          { email: createPlayerDto.email },
          { $set: createPlayerDto },
        )
        .exec();
      if (updated) {
        this.playersServiceLogger.viewUpdatePlayerByAttributeLogger(email);
        return updated;
      } else {
        throw this.playersServiceException.getNotFoundException(updated);
      }
    }
  }

  private async updatePlayerByPhoneNumber(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const { phoneNumber } = createPlayerDto;
    const found = await this.playerModel.findOne({ phoneNumber }).exec();
    if (found) {
      this.playersServiceVerboser.viewUpdateVeboser(phoneNumber);
      const updated = await this.playerModel
        .findOneAndUpdate(
          { phoneNumber: createPlayerDto.phoneNumber },
          { $set: createPlayerDto },
        )
        .exec();
      if (updated) {
        this.playersServiceLogger.viewUpdatePlayerByAttributeLogger(
          phoneNumber,
        );
        return updated;
      } else {
        throw this.playersServiceException.getNotFoundException(updated);
      }
    }
  }

  private async updatePlayerPhotoUrl(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel.findOneAndUpdate({});
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
    this.playersServiceLogger.viewDeleteOneByAttributeLogger(phoneNumber);
    this.playersServiceVerboser.viewDeleteByAttributeVerboser(phoneNumber);
    return await this.playerModel.deleteOne({ phoneNumber }).exec();
  }

  private async deleteManyByName(name: string): Promise<any> {
    this.playersServiceLogger.viewDeleteManyByAttributeLogger(name);
    this.playersServiceVerboser.viewDeleteManyByAttributeVerboser(name);
    return await this.playerModel.deleteMany({ name }).exec();
  }

  private async deleteManyByRanking(ranking: string): Promise<any> {
    return await this.playerModel.deleteMany({ ranking }).exec();
  }

  private async deleteManyByRankingPosition(
    rankingPosition: number,
  ): Promise<any> {
    return await this.playerModel.deleteMany({ rankingPosition }).exec();
  }
}
