import mongoose, { Document, Schema } from "mongoose";

export interface IMatchup extends Document {
  leagueId: mongoose.Types.ObjectId;
  week: number;
  season: number;
  team1Id: mongoose.Types.ObjectId;
  team2Id: mongoose.Types.ObjectId;
  team1Score: number;
  team2Score: number;
  winnerId: mongoose.Types.ObjectId;
  status: "upcoming" | "active" | "completed";
}

const MatchupSchema = new Schema<IMatchup>({
  leagueId: { type: Schema.Types.ObjectId, ref: "League", required: true },
  week: { type: Number, required: true },
  season: { type: Number, required: true },
  team1Id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team2Id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team1Score: { type: Number, default: 0 },
  team2Score: { type: Number, default: 0 },
  winnerId: { type: Schema.Types.ObjectId, ref: "Team" },
  status: {
    type: String,
    enum: ["upcoming", "active", "completed"],
    default: "upcoming",
  },
});

export default mongoose.model<IMatchup>("Matchup", MatchupSchema);
