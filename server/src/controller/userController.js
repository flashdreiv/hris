import User from "../models/user.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.json(err);
  }
};

export { getUsers };
