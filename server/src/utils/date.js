import { endOfDay, startOfDay, intervalToDuration } from "date-fns";
import sumBy from "lodash/sumBy.js";

const findExactDate = async (date, Schema) => {
  if (date) {
    const start = startOfDay(new Date(date));
    const end = endOfDay(new Date(date));
    const exactDate = await Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });
    return exactDate;
  } else {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const exactDate = Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });

    return exactDate;
  }
};

const getTotalAbsent = (dateFrom, dateTo, numDays) => {
  const dateDifference = intervalToDuration({
    start: dateFrom,
    end: dateTo,
  });

  return dateDifference.days - numDays + 1;
};

const getTotalHours = (timelogs) => {
  const timeDuration = timelogs.map((timelog) => {
    return intervalToDuration({
      start: new Date(timelog.timeIn),
      end: new Date(timelog.timeOut),
    });
  });
  return sumBy(timeDuration, "hours");
};

//Time difference in minutes
const getTimeDifference = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

const getTotalLate = (timelogs) => {
  return timelogs.filter((timelog) => {
    const timelogTime = new Date(timelog.timeIn);
    const startTime = new Date(timelog.timeIn);
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const timeDifference = getTimeDifference(timelogTime, startTime);
    return timeDifference > 0; //Adjust this if you have grace period
  }).length;
};
export {
  findExactDate,
  getTotalAbsent,
  getTotalHours,
  getTimeDifference,
  getTotalLate,
};
