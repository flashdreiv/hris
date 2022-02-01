import TimeLog from "../models/timelog.js";
import User from "../models/user.js";
import { endOfDay, startOfDay, isEqual } from "date-fns";
import { findExactDate } from "../utils/date.js";

const getTimeLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page } = req.params;
    const total = await TimeLog.countDocuments();
    const PAGE_SIZE = 5;
    const timelogs = await TimeLog.find({ id: userId })
      .populate({
        path: "user",
        select: "name",
      })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (page - 1))
      .sort({ createdAt: -1 });
    return res.json({
      data: timelogs,
      pagination: {
        current: parseInt(page),
        pageSize: PAGE_SIZE,
        total,
      },
    });
  } catch (err) {
    return res.json(err);
  }
};

const getTimeLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timelogId } = req.params;
    const timelog = await TimeLog.findOne({
      "users.id": userId,
      id: timelogId,
    });
    return res.json(timelog);
  } catch (err) {
    return res.json(err);
  }
};

const timeIn = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const timeIn = new Date();
    //find existing timeIn
    const timeInAlreadyExist = await findExactDate(timeIn, TimeLog);
    if (timeInAlreadyExist) {
      return res.status(403).json({
        error: "Timein Already Exist",
      });
    }
    const newTimelog = new TimeLog({ user, timeIn });
    await newTimelog.save();
    return res.status(201).json(newTimelog);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const timeOut = async (req, res) => {
  try {
    const { timeOut } = req.body;
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const timelog = await TimeLog.findOneAndUpdate(
      {
        createdAt: {
          $gte: start,
          $lt: end,
        },
      },
      { timeOut },
      { new: true }
    );
    return res.status(200).json(timelog);
  } catch (err) {
    return res.status(404);
  }
};

const timeCheckStatus = async (req, res) => {
  try {
    const timelog = await findExactDate(undefined, TimeLog);
    if (timelog) {
      if (timelog.timeOut) {
        return res.json("Disabled");
      }
      return res.json("Time-out");
    }
  } catch (err) {
    return res.status(404).json({ error: "Error checking time status" });
  }
  return res.json("Time-in");
};
export { timeIn, getTimeLogs, getTimeLog, timeOut, timeCheckStatus };
