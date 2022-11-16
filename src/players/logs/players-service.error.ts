import { Logger } from '@nestjs/common';

export class PlayersServiceError {
  private readonly logger = new Logger('PlayersService.error');

  public getNotFoundExceptionError(attribute: any) {
    return this.notFoundExceptionError(attribute);
  }

  public getBadRequestExceptionError(attribute: any) {
    return this.badRequestExceptionError(attribute);
  }

  private notFoundExceptionError(attribute: any) {
    return this.logger.error(
      `Caught NotFoundException with attribute ${attribute}`,
    );
  }

  private badRequestExceptionError(attribute: any) {
    return this.logger.error(
      `Caught BadRequestException with attribute ${attribute}`,
    );
  }
}
