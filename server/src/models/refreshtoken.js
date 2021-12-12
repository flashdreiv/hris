import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RefreshTokenSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

const RefreshToken = mongoose.model("RefreshTokens", RefreshTokenSchema);

export default RefreshToken;
