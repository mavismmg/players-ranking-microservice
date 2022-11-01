import { NotFoundException } from '@nestjs/common';

export class PlayersServiceException {
  public getNotFoundException(attribute: any): NotFoundException {
    return this.notFoundException(attribute);
  }

  private notFoundException(attribute: any): NotFoundException {
    return new NotFoundException(
      `Player with attribute ${attribute} not found.`,
    );
  }
}
