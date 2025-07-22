import mongoose, { Document, Schema } from "mongoose";

export interface IDraftRoom extends Document {
  leagueId: mongoose.Types.ObjectId;
  draftOrder: mongoose.Types.ObjectId[];
  currentPick: number;
  timePerPick: number;
  pickDeadline: Date;
  picks: Array<{
    round: number;
    pick: number;
    teamId: mongoose.Types.ObjectId;
    playerId: mongoose.Types.ObjectId;
    timestamp: Date;
    isAutoPick: boolean;
  }>;
  status: "waiting" | "active" | "paused" | "completed";
  settings: {
    allowTrades: boolean;
    autoPickEnabled: boolean;
    pauseOnDisconnect: boolean;
  };
}

const DraftRoomSchema = new Schema<IDraftRoom>({
  leagueId: { type: Schema.Types.ObjectId, ref: "League", required: true },
  draftOrder: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  currentPick: { type: Number, default: 0 },
  timePerPick: { type: Number, default: 60 },
  pickDeadline: { type: Date },
  picks: [
    {
      round: { type: Number },
      pick: { type: Number },
      teamId: { type: Schema.Types.ObjectId, ref: "Team" },
      playerId: { type: Schema.Types.ObjectId, ref: "Player" },
      timestamp: { type: Date },
      isAutoPick: { type: Boolean, default: false },
    },
  ],
  status: {
    type: String,
    enum: ["waiting", "active", "paused", "completed"],
    default: "waiting",
  },
  settings: {
    allowTrades: { type: Boolean, default: false },
    autoPickEnabled: { type: Boolean, default: false },
    pauseOnDisconnect: { type: Boolean, default: false },
  },
});

export default mongoose.model<IDraftRoom>("DraftRoom", DraftRoomSchema);
