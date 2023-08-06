import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './DTOs/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private async verifyIsPlayerExist(_id: string): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id: _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with _id - ${_id} not found`);
    }
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerFound = await this.playerModel.findOne({ email: email }).exec();

    if (playerFound) {
      throw new BadRequestException(
        `Player with e-email ${email} already registred`,
      );
    }

    const playerCreated = new this.playerModel(createPlayerDto);
    return await playerCreated.save();
  }

  async updatePlayer(
    updatePlayerDto: UpdatePlayerDto,
    _id: string,
  ): Promise<void> {
    await this.verifyIsPlayerExist(_id);
    await this.playerModel
      .findOneAndUpdate({ _id: _id }, { $set: updatePlayerDto })
      .exec();
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(_id: string): Promise<Player> {
    await this.verifyIsPlayerExist(_id);
    return await this.playerModel.findOne({ _id: _id }).exec();
  }

  async deletePlayer(_id: string): Promise<any> {
    await this.verifyIsPlayerExist(_id);
    return await this.playerModel.deleteOne({ _id: _id }).exec();
  }
}
