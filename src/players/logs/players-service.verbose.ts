import { Logger } from "@nestjs/common";

export class PlayersServiceVerbose {
    
    private readonly logger = new Logger('PlayersService.verbose');

    public viewAllPlayersVerboser(): void {
        return this.getAllPlayersVerboser();
    }

    public viewPlayerByIdVerboser(_id: string): void {
        return this.getPlayerByIdVerboser(_id);
    }

    public viewPlayerByEmailVerboser(email: string): void {
        return this.getPlayerByEmailVerboser(email);
    }

    private getAllPlayersVerboser(): void {
        return this.logger.verbose('View all players');
    }

    private getPlayerByIdVerboser(_id: string): void {
        return this.logger.verbose(`Getting player with id: ${ _id }`);
    }

    private getPlayerByEmailVerboser(email: string): void {
        return this.logger.verbose(`Getting player with email: ${ email }`);
    }
}