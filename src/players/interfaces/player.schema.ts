import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String, unique: false },
    ranking: { type: String, unique: false },
    rankingPosition: Number,
    photoUrlPlayer: String,
  },
  { timestamps: true, collection: 'player' },
);
