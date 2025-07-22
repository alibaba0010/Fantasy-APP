import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  externalId: string;
  name: string;
  team: string;
  position: string;
  sport: string;
  isActive: boolean;
  stats: Array<{
    week: number;
    season: number;
    gameDate: Date;
    opponent: string;
    fantasyPoints: number;
    actualStats: Record<string, number>;
  }>;
  projectedPoints: number;
  averagePoints: number;
  lastUpdated: Date;
}

const PlayerSchema = new Schema<IPlayer>({
  externalId: { type: String, required: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String, required: true },
  sport: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  stats: [
    {
      week: { type: Number },
      season: { type: Number },
      gameDate: { type: Date },
      opponent: { type: String },
      fantasyPoints: { type: Number },
      actualStats: { type: Schema.Types.Mixed },
    },
  ],
  projectedPoints: { type: Number, default: 0 },
  averagePoints: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);
