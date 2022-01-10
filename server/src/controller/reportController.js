import TimeLog from "../models/timelog.js";
import { endOfDay, startOfDay, intervalToDuration } from "date-fns";
import {
  getTimeDifference,
  getTotalAbsent,
  getTotalHours,
  getTotalLate,
} from "../utils/date.js";
import { checkStatus, NTO } from "../utils/status.js";
const getReportSummary = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;
    const _dateFrom = new Date(dateFrom);
    const _dateTo = new Date(dateTo);

    const timelogs = await TimeLog.find({
      user: req.user.id,
      timeIn: {
        $gte: startOfDay(_dateFrom),
        $lte: endOfDay(_dateTo),
      },
    });
    //Check hour duration logic
    const newTimelogs = timelogs.map((timelog) => {
      const timeIn = new Date(timelog.timeIn);
      const timeOut = new Date(timelog.timeOut);

      //Status
      const status = checkStatus(timelog);
      //hour Duration
      const hourDuration =
        status === NTO
          ? "None"
          : Math.abs(getTimeDifference(timeIn, timeOut) / 60).toFixed(2);
      //Overtime/Undertime
      let duration = intervalToDuration({ start: timeIn, end: timeOut });
      duration = duration.hours + "." + duration.minutes;
      const ot_ut = status === NTO ? "None" : (duration - 8).toFixed(2);
      return {
        hours: hourDuration,
        ot_ut,
        status,
        ...timelog.toObject(),
      };
    });
    //Statistics
    const total_absent = getTotalAbsent(_dateFrom, _dateTo, timelogs.length);
    const total_hours = getTotalHours(timelogs);
    const total_late = getTotalLate(timelogs);

    res.json({ timelogs: newTimelogs, total_absent, total_hours, total_late });
  } catch (err) {
    res.json(err);
  }
};

export { getReportSummary };
