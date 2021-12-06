import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";

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
      { upsert: true }
    );
    req.session.userId = user.id;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error logging in" });
  }
};

const logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
};

export { login, logout };
