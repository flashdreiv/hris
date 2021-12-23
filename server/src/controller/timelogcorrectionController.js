import TimelogCorrection from "../models/timelogcorrection.js";
import TimeLog from "../models/timelog.js";
import { findExactDate } from "../utils/date.js";

const getTimelogCorrections = async (req, res) => {
  try {
    const userId = req.user.id;
    const timelogCorrections = await TimelogCorrection.find({
      "timelogs.user.id": userId,
    })
      .populate({
        path: "approver",
        select: "name",
      })
      .populate({
        path: "timelog",
        select: "createdAt",
      });
    return res.json(timelogCorrections);
  } catch (err) {
    return res.json(err);
  }
};

const addTimelogCorrection = async (req, res) => {
  //ADD UNIQUE ADDITION
  try {
    const { timelog, newTimeIn, newTimeOut, approver } = req.body;
    const timelogObj = await findExactDate(timelog, TimeLog);
    const newTimelogCorrection = new TimelogCorrection({
      timelog: timelogObj._id,
      newTimeIn,
      newTimeOut,
      approver,
    });
    await newTimelogCorrection.save();
    return res.status(201).json(newTimelogCorrection);
  } catch (err) {
    return res.json(err);
  }
};

const updateTimelogCorrection = async (req, res) => {
  try {
    const { newTimeIn, newTimeOut, approver } = req.body;
    const updatedTimelogCorrection = await TimelogCorrection.findOneAndUpdate(
      {
        _id: req.params.timelogId,
        "timelogs.user.id": req.user.id,
      },
      { $set: { newTimeIn, newTimeOut, approver } },
      { new: true }
    );
    return res.json(updatedTimelogCorrection);
  } catch (err) {
    return res.json(error);
  }
};

const deleteTimelogCorrection = async (req, res) => {
  try {
    const { timelogId } = req.params;
    await TimelogCorrection.deleteOne({ _id: timelogId });
    return res.json({ success: "Delete successful" });
  } catch (err) {
    return res.json(err);
  }
};

export {
  getTimelogCorrections,
  addTimelogCorrection,
  updateTimelogCorrection,
  deleteTimelogCorrection,
};
