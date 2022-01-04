import TimeLog from "../models/timelog.js";
import { endOfDay, startOfDay } from "date-fns";
import { getTotalAbsent, getTotalHours, getTotalLate } from "../utils/date.js";

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
    const total_absent = getTotalAbsent(_dateFrom, _dateTo, timelogs.length);
    const total_hours = getTotalHours(timelogs);

    const total_late = getTotalLate(timelogs);

    res.json({ timelogs, total_absent, total_hours, total_late });
  } catch (err) {
    res.json(err);
  }
};

export { getReportSummary };
