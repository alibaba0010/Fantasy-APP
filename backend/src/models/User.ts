import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<IUser>("User", UserSchema);
