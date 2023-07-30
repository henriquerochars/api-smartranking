import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import * as uuid from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`createPlayerDto: ${createPlayerDto}`);
    this.create(createPlayerDto);
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;

    const player: Player = {
      _id: uuid.v4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPos: 1,
      urlPhoto: 'www.google.com.br/foto123.jpg',
    };
    this.players.push(player);
  }
}
