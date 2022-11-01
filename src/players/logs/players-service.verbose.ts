import { Logger } from '@nestjs/common';
import { Player } from '../interfaces/player.interface';

export class PlayersServiceVerbose {
  private readonly logger = new Logger('PlayersService.verbose');

  public viewAllPlayersVerboser(): void {
    return this.getAllPlayersVerboser();
  }

  public viewPlayerByAttributeVerboser(attribute: any): void {
    return this.getPlayerByAttributeVerboser(attribute);
  }

  public viewCreateVerboser(playerCreated: Player): void {
    return this.createVerboser(playerCreated);
  }

  public viewUpdateVeboser(attribute: any): void {
    return this.updatePlayerVerboser(attribute);
  }

  public viewDeleteByAttributeVerboser(attribute: any): void {
    return this.deleteOneByAttributeVerboser(attribute);
  }

  private getAllPlayersVerboser(): void {
    return this.logger.verbose('View all players');
  }

  private getPlayerByAttributeVerboser(_id: any): void {
    return this.logger.verbose(`Getting player with id: ${_id}`);
  }

  private createVerboser(playerCreated: Player): void {
    return this.logger.verbose(`Creating player ${playerCreated}`);
  }

  private updatePlayerVerboser(attribute: any): void {
    return this.logger.verbose(`Updating player ${attribute}`);
  }

  private deleteOneByAttributeVerboser(attribute: any): void {
    return this.logger.verbose(`Deleting player with attribute: ${attribute}`);
  }

  private deleteManyByAttributeVerboser(attribute: any): void {
    return;
  }
}
