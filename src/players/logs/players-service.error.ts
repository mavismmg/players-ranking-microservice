import { Logger } from '@nestjs/common';

export class PlayersServiceError {
  private readonly logger = new Logger('PlayersService.error');

  public getNotFoundExceptionError(attribute: any) {
    return this.notFoundExceptionError(attribute);
  }

  private notFoundExceptionError(attribute: any) {
    return this.logger.error(
      `Caught NotFoundException with attribute ${attribute}`,
    );
  }
}
