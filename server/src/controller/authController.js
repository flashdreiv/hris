import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import RefreshToken from "../models/refreshtoken.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { upsert: true, new: true }
    );
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET
    );
    const dbRefreshToken = new RefreshToken({ user, token: refreshToken });
    await dbRefreshToken.save();
    res.status(201).json({ user, token: { accessToken, refreshToken } });
  } catch (err) {
    res.status(400).json({ message: "Error logging in" });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await RefreshToken.deleteOne({ token: refreshToken });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(400);
  }
};

export { login, logout };
