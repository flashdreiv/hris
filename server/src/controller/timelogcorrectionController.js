import TimelogCorrection from "../models/timelogcorrection.js";
import TimeLog from "../models/timelog.js";
import { findExactDate } from "../utils/date.js";
import User from "../models/user.js";
import { MONGOOSE_ERROR_CODES } from "../utils/ErrorCodes.js";

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
  try {
    const { timelog, newTimeIn, newTimeOut, approver, remarks } = req.body;
    const timelogObj = await findExactDate(timelog, TimeLog);
    let newTimelogCorrection = await TimelogCorrection.create({
      timelog: timelogObj._id,
      newTimeIn,
      newTimeOut,
      approver,
      remarks,
    });
    newTimelogCorrection = await newTimelogCorrection.populate(
      "approver timelog"
    );

    return res.status(201).json(newTimelogCorrection);
  } catch (err) {
    if (err.code === MONGOOSE_ERROR_CODES.DUPLICATE_ENTRIES) {
      return res.json({ error: "Timelog correction already exist" });
    }
    return res.json(err.message);
  }
};

const updateTimelogCorrection = async (req, res) => {
  try {
    const { newTimeIn, newTimeOut, approver, remarks } = req.body;
    const _approver = await User.findById(approver);
    const updatedTimelogCorrection = await TimelogCorrection.findOneAndUpdate(
      {
        _id: req.params.timelogId,
        "timelogs.user.id": req.user.id,
      },
      { newTimeIn, newTimeOut, approver: _approver, remarks },
      { new: true }
    )
      .populate({
        path: "approver",
        select: "name",
      })
      .populate({
        path: "timelog",
        select: "createdAt",
      });
    return res.json(updatedTimelogCorrection);
  } catch (err) {
    return res.status(403).json(err);
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
