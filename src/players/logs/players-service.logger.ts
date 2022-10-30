import { Logger } from "@nestjs/common";

export class PlayersServiceLogger {

    private readonly logger = new Logger('PlayersService.logger');

    public viewAllPlayersLogger(): void {
        return this.getAllPlayersLogger();
    }

    public viewPlayerByIdLogger(): void {
        return this.getPlayerByIdLogger();
    }

    public viewPlayerByEmailLogger(): void {
        return this.getPlayersByEmailLogger();
    }

    private getAllPlayersLogger(): void {
        return this.logger.log('GET getAllPlayers.');
    }

    private getPlayerByIdLogger(): void {
        return this.logger.log('GET getPlayerById with id.');
    }

    private getPlayersByEmailLogger(): void {
        return this.logger.log('GET getPlayerByEmail with email.');
    }
}