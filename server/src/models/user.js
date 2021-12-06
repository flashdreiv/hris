import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);
export default User;
