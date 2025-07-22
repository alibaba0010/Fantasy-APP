import mongoose, { Document, Schema } from "mongoose";

export interface ITeam extends Document {
  leagueId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  teamName: string;
  roster: Array<{
    playerId: mongoose.Types.ObjectId;
    position: string;
    isStarter: boolean;
    acquiredDate: Date;
    draftRound: number;
    draftPick: number;
  }>;
  totalScore: number;
  weeklyScores: Array<{
    week: number;
    score: number;
    opponent: mongoose.Types.ObjectId;
  }>;
}

const TeamSchema = new Schema<ITeam>({
  leagueId: { type: Schema.Types.ObjectId, ref: "League", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  teamName: { type: String, required: true },
  roster: [
    {
      playerId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
      position: { type: String, required: true },
      isStarter: { type: Boolean, default: false },
      acquiredDate: { type: Date, default: Date.now },
      draftRound: { type: Number },
      draftPick: { type: Number },
    },
  ],
  totalScore: { type: Number, default: 0 },
  weeklyScores: [
    {
      week: { type: Number },
      score: { type: Number },
      opponent: { type: Schema.Types.ObjectId, ref: "Team" },
    },
  ],
});

export default mongoose.model<ITeam>("Team", TeamSchema);
