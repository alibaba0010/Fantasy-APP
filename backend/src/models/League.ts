import mongoose, { Document, Schema } from "mongoose";

export interface ILeague extends Document {
  name: string;
  commissioner: mongoose.Types.ObjectId;
  sport: "NFL" | "NBA" | "MLB" | "NHL";
  maxTeams: number;
  draftDate: Date;
  draftType: "snake" | "linear";
  scoringType: "standard" | "ppr" | "half-ppr";
  rosterSettings: {
    QB: number;
    RB: number;
    WR: number;
    TE: number;
    FLEX: number;
    K: number;
    DEF: number;
    BENCH: number;
  };
  status: "created" | "drafting" | "active" | "completed";
  inviteCode: string;
  createdAt: Date;
}

const LeagueSchema = new Schema<ILeague>({
  name: { type: String, required: true },
  commissioner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sport: { type: String, enum: ["NFL", "NBA", "MLB", "NHL"], required: true },
  maxTeams: { type: Number, default: 12 },
  draftDate: { type: Date },
  draftType: { type: String, enum: ["snake", "linear"], required: true },
  scoringType: {
    type: String,
    enum: ["standard", "ppr", "half-ppr"],
    required: true,
  },
  rosterSettings: {
    QB: { type: Number, default: 1 },
    RB: { type: Number, default: 2 },
    WR: { type: Number, default: 2 },
    TE: { type: Number, default: 1 },
    FLEX: { type: Number, default: 1 },
    K: { type: Number, default: 1 },
    DEF: { type: Number, default: 1 },
    BENCH: { type: Number, default: 5 },
  },
  status: {
    type: String,
    enum: ["created", "drafting", "active", "completed"],
    default: "created",
  },
  inviteCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILeague>("League", LeagueSchema);
