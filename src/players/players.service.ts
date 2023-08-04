import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    // const playerFound = this.players.find((player) => player.email === email);
    const playerFound = await this.playerModel.findOne({ email: email }).exec();

    if (playerFound) {
      this.update(playerFound, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    // return this.players;
    return await this.playerModel.find().exec();
  }

  async getPlayersByEmail(email: string): Promise<Player> {
    // const playerFound = this.players.find((player) => player.email === email);
    const playerFound = await this.playerModel.findOne({ email: email }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player with email - ${email} not found`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<any> {
    // const playerFound = this.players.find((player) => player.email === email);
    // if (!playerFound) {
    //   throw new NotFoundException(`Player with email - ${email} not found`);
    // }
    // this.players = this.players.filter(
    //   (player) => player.email !== playerFound.email,
    // );
    return await this.playerModel.deleteOne({ email: email }).exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    // const { name, phoneNumber, email } = createPlayerDto;

    // const player: Player = {
    //   _id: uuid.v4(),
    //   name,
    //   phoneNumber,
    //   email,
    //   ranking: 'A',
    //   rankingPos: 1,
    //   urlPhoto: 'www.google.com.br/foto123.jpg',
    // };
    // this.logger.log(`createPlayerDto: ${JSON.stringify(createPlayerDto)}`);
    // this.players.push(player);

    const playerCreated = new this.playerModel(createPlayerDto);
    await playerCreated.save();
  }

  private async update(
    playerFound: Player,
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    // const { name } = createPlayerDto;
    // playerFound.name = name;

    return await this.playerModel
      .findOneAndUpdate({ email: playerFound.email }, { $set: createPlayerDto })
      .exec();
  }
}
