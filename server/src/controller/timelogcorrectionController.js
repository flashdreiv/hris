import TimelogCorrection from "../models/timelogcorrection.js";
import TimeLog from "../models/timelog.js";
import { endOfDay, startOfDay } from "date-fns";
const getTimelogCorrections = async (req, res) => {
  try {
    //make sure request for correction is his own timelogs
    const userId = req.user.id;
    const timelogCorrections = await TimelogCorrection.find({
      "timelogs.user.id": userId,
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
    const start = startOfDay(new Date(timelog));
    const end = endOfDay(new Date(timelog));
    const timelogObj = await TimeLog.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });
    const timelogId = timelogObj.id;

    const newTimelogCorrection = new TimelogCorrection({
      timelog: timelogId,
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

export { getTimelogCorrections, addTimelogCorrection };
