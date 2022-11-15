import { BadRequestException, NotFoundException } from '@nestjs/common';

export class PlayersServiceException {
  public getNotFoundException(attribute: any): NotFoundException {
    return this.notFoundException(attribute);
  }

  public getBadRequestException(attribute: any): BadRequestException {
    return this.badRequestException(attribute);
  }

  private notFoundException(attribute: any): NotFoundException {
    return new NotFoundException(
      `Player with attribute ${attribute} not found.`,
    );
  }

  private badRequestException(attribute: any): BadRequestException {
    return new BadRequestException(
      `Player with attribute ${attribute} already exists.`,
    );
  }
}
