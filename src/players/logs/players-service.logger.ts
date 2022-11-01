import { Logger } from '@nestjs/common';

export class PlayersServiceLogger {
  private readonly logger = new Logger('PlayersService.logger');

  public viewAllPlayersLogger(): void {
    return this.getAllPlayersLogger();
  }

  public viewPlayerByAttributeLogger(attribute: any): void {
    return this.getPlayerByAttributeLogger(attribute);
  }

  public viewCreatePlayerLogger(): void {
    return this.createLogger();
  }

  public viewUpdatePlayerByAttributeLogger(attribute: any): void {
    return this.updatePlayerByAttributeLogger(attribute);
  }

  public viewDeleteOneByAttributeLogger(attribute: any): void {
    return this.viewDeleteByAttributeLogger(attribute);
  }

  private getAllPlayersLogger(): void {
    return this.logger.log('GET getAllPlayers.');
  }

  private getPlayerByAttributeLogger(attribute: any): void {
    return this.logger.log(`GET player with attribute: ${attribute}`);
  }

  private createLogger(): void {
    return this.logger.log('POST create player.');
  }

  private updatePlayerByAttributeLogger(attribute: any): void {
    return this.logger.log(`UPDATE player with attribute ${attribute}`);
  }

  private viewDeleteByAttributeLogger(attribute: any): void {
    return this.logger.log(`DELETE delete one by ${attribute}`);
  }

  private deleteManyByAttributeLogger(): void {
    return;
  }
}
