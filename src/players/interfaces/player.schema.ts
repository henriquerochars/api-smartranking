import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    name: String,
    ranking: String,
    rankingPos: Number,
    urlPhoto: String,
  },
  {
    timestamps: true,
    collection: 'players',
  },
);
