import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshtoken.js";

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Permission denied" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid/Expired token" });
    req.user = user;
    next();
  });
};

//generate refreshToken
const generateRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401);
  try {
    const validRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });
    jwt.verify(
      validRefreshToken.token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return res.status(403);
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ accessToken });
      }
    );
  } catch (err) {
    return res.status(403).json({ error: err });
  }
  return res.status(403);
};

export { authToken, generateRefreshToken };
